import { useEffect, useState } from "react"
import "./styles.css"

type Job = {

company: string,
title: string,
status: string,
id: number
}

function App () {

const [company, setcompany] = useState<string>("")
const [job, setjob] = useState<string>("")
const [jobs, setjobs] = useState<Job[]>([])
const [email, setemail] = useState<string>("")
const [password, setpassword] = useState<string>("")
const [error, seterror] = useState<string>("")
const [toggle, settoggle] = useState<boolean>(false)
const [showpassword, setshowpassword] = useState<boolean>(false)

 const token = localStorage.getItem("token")

const API = "https://my-fullstack-app-production-30fe.up.railway.app"

console.log(toggle)

const deletejob = async (id: number) => {
const token = localStorage.getItem("token");

if (!token) return

const response = await fetch(`${API}/api/jobs/${id}`,{

method: "DELETE",
headers: {Authorization: `Bearer ${token}`},

});

if (!response.ok) return;

setjobs((prev) => prev.filter((job) => job.id !== id  ))
}

const updateStatus = async (id: number, status: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/api/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) return;

  setjobs((prev) =>
    prev.map((job) =>
      job.id === id ? { ...job, status } : job
    )
  );
};

const addjob = async () => {

const newjob = {

company: company,
title: job,
status: "pendent"
}

const token = localStorage.getItem("token")

if(!token) {

settoggle(true)

return console.log("bitte melden sie sich an")
}

settoggle(false)

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

setjobs([...jobs, data])

}

useEffect(() => {
  const getJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Kein Token vorhanden");
        return;
      }

      const response = await fetch(`${API}/api/jobs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      console.log(data);
      setjobs(data);
    } catch (error) {
      console.error("Jobs konnten nicht geladen werden:", error);
    }
  };

  getJobs();
}, []);

const register = async () => {

    if (email === "") {return "bitte email eingeben"}

    if (password === "") {return "bitte passwort eingeben"}

    const response = await fetch(`${API}/api/register`, {

    headers: {"Content-type": "application/json"},

    method: "POST",

    body: JSON.stringify({email, password})
    })

    if (!response.ok) {
    console.log("registrieren fehlgeschlagen")
    console.log(response.status)
    console.log(response)
    return
    }

    const data = await response.json()
    
    setemail("")
    setpassword("")

    console.log(data)

}

const login = async () => {
  try {
    seterror("");

    const response = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      seterror(data.message || "Login fehlgeschlagen");
      return;
    }

    localStorage.setItem("token", data.token);

    setemail("");
    setpassword("");
    seterror("");
  } catch (err) {
    console.error(err);
    seterror("Server nicht erreichbar");
  }
};

return (
  <>
    {token ? (
      <div>
        <input
          type="text"
          placeholder="Jobtitel"
          value={job}
          onChange={(e) => setjob(e.target.value)}
        />

        <input
          type="text"
          placeholder="company"
          value={company}
          onChange={(e) => setcompany(e.target.value)}
        />

        <button onClick={addjob}>
          Job hinzufügen
        </button>

        <div className="jobs">
          {jobs.map((job) => (

            <article key={job.id}>
              <h2>{job.title}</h2>
              <p style={{color: "blue"}}>{job.company}</p>

              <select
                value={job.status}
                onChange={(e) =>
                  updateStatus(job.id, e.target.value)
                }
              >
                <option value="pendent">Pendent</option>
                <option value="interview">Interview</option> 
                <option value="absage">Absage</option>
              </select>

              <button onClick={() => deletejob(job.id)}>
                delete
              </button>
            </article>
          ))}
        </div>
      </div>
    ) : (
      <div>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <input
          type={showpassword ? "text" : "password"}
          placeholder="Passwort"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        <button onClick={() => setshowpassword(prev => !prev)}>
          {showpassword ? "verbergen" : "anzeigen"}
        </button>

        <button onClick={register}>
          Registrieren
        </button>

        <button onClick={login}>
          Einloggen
        </button>

        {error && <p>{error}</p>}
      </div>
    )}
  </>
);
}

export default App





