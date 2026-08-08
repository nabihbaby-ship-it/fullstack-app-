console.log("server gestartet bitte")

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import pool from "./db.js";
import bcrypt from "bcryptjs"

const app = express();

const allowedOrigins = [
  "http://localhost:4173",
  "http://localhost:5173",
  "https://fullstack-app-pi-eight.vercel.app",
  "https://fullstack-ni2clfq4d-youssoufs-projects-007b61b2.vercel.app",
  "chrome-extension://hmjgfpffocinegcaamapdpapobadijpa"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
   
app.use(express.json());

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Kein gültiger Token vorhanden"
    });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Ungültiger oder abgelaufener Token"
    });
  }
}

app.delete("/api/jobs/:id", verifyToken, async (req, res) => {

const {id} = req.params;

await pool.query(`
  
DELETE FROM jobs WHERE id = $1 AND user_id = $2`, 
[id, req.user.id]);

res.json({message: "job gelöscht"})
});

app.patch("/api/jobs/:id", verifyToken, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const result = await pool.query(
    `
    UPDATE jobs
    SET status = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *
    `,
    [status, id, req.user.id]
  );

  res.json(result.rows[0]);
});

app.post("/api/jobs", verifyToken, async (req, res) => {
  try {
    const { company, title, status } = req.body;

    if (!company || !title || !status) {
      return res.status(400).json({
        message: "Firma, Job und Status werden benötigt"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO jobs (user_id, title, company, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [req.user.id, title, company, status]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Job konnte nicht erstellt werden"
    });
  }
});

app.get("/api/jobs", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM jobs
      WHERE user_id = $1
      ORDER BY id DESC
      `,
      [req.user.id]
    );

    return res.json(result.rows);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Jobs konnten nicht geladen werden"
    });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "E-Mail oder Passwort fehlt"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Das Passwort muss mindestens 8 Zeichen haben"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email
      `,
      [normalizedEmail, hashedPassword]
    );

    const user = result.rows[0]

    const token = jwt.sign({

    id: user.id,
    email: user.email
    },
    process.env.JWT_SECRET,
    {
    expiresIn: "7d"
    }
  )

    return res.status(201).json({
      message: "User erstellt",
      token
    });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        message: "E-Mail wird bereits verwendet"
      });
    }

    return res.status(500).json({
      message: "Serverfehler"
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "E-Mail oder Passwort fehlt"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `
      SELECT id, email, password
      FROM users
      WHERE email = $1
      `,
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "E-Mail oder Passwort ist falsch"
      });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        message: "E-Mail oder Passwort ist falsch"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return res.json({
      message: "Login erfolgreich",
      token,
      user: {
        id: user.id,
        email: user.email,
      }
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Serverfehler"
    });
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Interner Serverfehler"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server läuft auf Port", PORT);
});

