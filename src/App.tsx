import { useEffect, useState } from "react"

type Job = {

company: string,
job: string,
status: string
}

function App () {

const [company, setcompany] = useState<string>("")
const [job, setjob] = useState<string>("")
const [status, setstatus] = useState<string>("")
const [jobs, setjobs] = useState<Job[]>([])
const [email, setemail] = useState<string>("")
const [password, setpassword] = useState<string>("")


const addjob = async () => {

const newjob = {

company: company,
job: job,
status: "pendent"
}

const response = await fetch("/api/jobs", {

method: "POST",
headers: {
"content-type" : "application/json"
},

body: JSON.stringify(newjob)

})

const data = await response.json()

setjobs(data)

}

useEffect(()=> {

const getjobs = async () => {

const response = await fetch("/api/jobs", {

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

const response = await fetch("/api/jobs", {
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

    const response = await fetch("/api/register", {

    headers: {"Content-type": "application/json"},

    method: "POST",

    body: JSON.stringify({email, password})
    })

    if (!response.ok) {
    console.log("registrieren fehlgeschlagen")
    return
    }

    const data = await response.json()
    
    setemail("")
    setpassword("")

    console.log(data)

}

const login = async () => {

try{

const response = await fetch("/api/login", {

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

const hinzufügen = () => {

const newjob = {

company: company,
job: job, 
status: ""
}

setjobs([...jobs, newjob])
}

return(
<> 

<input type="text"
placeholder="status"
value={status}
onChange={(e) => setstatus(e.target.value)} />

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

<button onClick={hinzufügen}>hinzufügen</button>

<button onClick={register}>registrieren</button>

<button onClick={login}>login</button>

<button onClick={addjob}>addjob</button>

<button onClick={beruf}>beruf</button>

</>
  
)
}

export default App


