import pool from "./db.js"

pool.query("SELECT NOW()")
.then((result) => {
console.log(result.rows)
})
.catch((err) => {
console.error(err)
})

app.post("/api/jobs", async (req, res) => {

const { company, job, status} = req.body;

const result = await pool.query(`INSERT INTO jobs (job, company, status)
    values($1, $2, $3)`,
[job, company, status]);

res.json(result.rows[0])
})

app.get("/api/jobs", async (req, res) => {

const result = await pool.query("SELECT * FROM jobs")

res.json(result.rows)
})

app.post("/api/register", async (req, res) => {

const {email, password} = req.body

if (!email || !password ) {return res.status(400).json({message: "email oder passwort fehlt"})}

const hashedpassword = await bcrypt.hash(password, 10)

res.json({message: "user erstellt",
    hashedpassword
})
})

app.post("/api/register", async (req, res) => {

const {email, password} = req.body

const hashedpassword = await bcrypt.hash(password, 10)

db.run("insert into users (email, password) values (?, ?)",
[email, hashedpassword],
function(err) {

if (err) {
return res.status(400).json({message: "user existiert bereits"})
}

res.json({message: "user erstellt"})
}
)

})

app.post("/api/login", async (req, res) => {

const {email, password} = req.body

const user = {
id: 1,
email: "test@test.com",
password: "jghhdasujihouigh"
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
token: token
})

})

app.post("/api/jobs", (req, res) => {

res.json({
success: true
})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("server läuft auf port", PORT)
})



