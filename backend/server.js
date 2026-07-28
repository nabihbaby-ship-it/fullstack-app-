import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:4173",
    "https://fullstack-app-pi-eight.vercel.app"
  ]
}));

app.use(express.json());

function verifytoken (req, res, next) {

const authheader = req.headers.authorization;

if(!authheader) {
return res.status(401).json({
message: "kein token vorhanden"
});
}

const token = authheader.split(" ")[1];

try{

const decoded = jwt.verifytoken(token, "secret key"); 

req.user = decoded

next();
}

catch(err) {return res.status(401).json({message: "ungültiger token"})}
}

app.post("/api/jobs", verifytoken, async (req, res) => {

const { company, job, status } = req.body;
const result = await pool.query(
`
INSERT INTO jobs (job, company, status)
VALUES ($1, $2, $3)
RETURNING *;
`,
[job, company, status]
);

res.json(result.rows[0]);
})

app.get("/api/jobs", verifytoken, async (req, res) => {

const result = await pool.query("SELECT * FROM jobs WHERE user_id = $1")

res.json(result.rows)
})

app.post("/api/register", async (req, res) => {

const {email, password} = req.body

if(!email  || !password) {

return res.status(400).json({message: "email oder passwort fehlt"})
}

const hashedpassword = await bcrypt.hash(password, 10);
 
try {
  await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, hashedpassword]
  );

  res.json({ message: "User erstellt" });

} 

catch (err) {

  if (err.code === "23505") {
    return res.status(409).json({
      message: "E-Mail wird bereits verwendet"
    });
  }

  res.status(500).json({
    message: "Serverfehler"
  });
}

})

app.post("/api/login", async (req, res) => {

const {email, password} = req.body

const result = await pool.query("SELECT * FROM users WHERE email = $1",
[email]
)

if(!result) {

return res.status(401).json({
message: "User nicht gefunden"
});
}

if (user.email !== email) {

return res.status(401).json({message: "user nicht gefunden"})
}

const isvalid = await bcrypt.compare(password, user.password)

console.log(isvalid)

if(!isvalid) {

return res.status(401).json({message: "falsches passwort"})
}

const token = jwt.sign(
{id: user.id, email: user.email},
"secret key",
{expiresIn: "1h"}
)

res.json({message: "login erreicht",
token: token,
user: user
})

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("server läuft auf port", PORT)
})



