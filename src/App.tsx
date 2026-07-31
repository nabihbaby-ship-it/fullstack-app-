import { useEffect, useState } from "react"

type Job = {

company: string,
job: string,
status: string
}

function App () {

const [company, setcompany] = useState<string>("")
const [job, setjob] = useState<string>("")
const [jobs, setjobs] = useState<Job[]>([])
const [email, setemail] = useState<string>("")
const [password, setpassword] = useState<string>("")

const API = "https://my-fullstack-app-production-30fe.up.railway.app"

const addjob = async () => {

const newjob = {

company: company,
job: job,
status: "pendent"
}

const token = localStorage.getItem("token")

const response = await fetch(`${API}/api/jobs`, {

method: "POST",
headers: {
"content-type" : "application/json",
Authorization: `Bearer ${token}`
},

body: JSON.stringify(newjob)

})


const data = await response.json()

console.log(data)

setjobs([...jobs, newjob])

}

useEffect(()=> {

const getjobs = async () => {

const response = await fetch(`${API}/api/jobs`, {

method: "get",
headers: {
"content-type" : "application/json"
},
})

const data = await response.json()

console.log(data)

setjobs(data)
}

getjobs()

},[]);

const beruf = async () => {

const response = await fetch(`${API}/api/jobs`, {
method: "POST",
headers: {
"content-type" : "application/json"
},

body: JSON.stringify(job)
})

console.log(response)

}

const register = async () => {

    if (email === "") {return "bitte email eingeben"}

    if (password === "") {return "bitte passwort eingeben"}

    const response = await fetch(`${API}/api/register`, {

    headers: {"Content-type": "application/json"},

    method: "POST",

    body: JSON.stringify({email, password})
    })

    if (!response.ok) {
    console.log("reg istrieren fehlgeschlagen")
    return
    }

    const data = await response.json()
    
    setemail("")
    setpassword("")

    console.log(data)

}

const login = async () => {

try{

const response = await fetch("${API}/api/login", {

headers: {"Content-type": "application/json"},

method: "POST",

body: JSON.stringify({email, password})

})

console.log(response)

if (!response.ok) {

    console.log("login fehlgeschlagen")
    return
}

const data = await response.json()

setemail("")
setpassword("")

console.log(data)

if (data.token) {

localStorage.setItem("token", data.token)
}
}

catch(err) {

if (err) {console.error(err)}
}
}

return(
<> 

<input type="text"
placeholder="job"
value={job}
onChange={(e) => setjob(e.target.value)} 
/>

<input type="text"
placeholder="company"
value={company}
onChange={(e) => setcompany(e.target.value)}/>

{jobs.map(job => job.job)}

<button onClick={addjob}>hinzufügen</button>

<button onClick={register}>registrieren</button>

<button onClick={login}>login</button>

<button onClick={addjob}>addjob</button>

<button onClick={beruf}>beruf</button>

</>
  
)
}

export default App


