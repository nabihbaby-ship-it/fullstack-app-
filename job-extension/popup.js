
const login = document.getElementById("login");
const job = document.getElementById("job");
const popup = document.getElementById("popupnachricht")

const API = "https://dein-backend.up.railway.app";

chrome.storage.local.get("token", (data) => {if (data.token){ 

  job.style.display = "block";

}

else {

  login.style.display = "block"
}})

const getJobFromLinkedIn = () => {

  chrome.storage.local.get("token", async (search) => {

    if(!token) {
    
    console.log("kein token vorhanden")
    return
    }

    const token = search.token;
 
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

      const tab = tabs[0];
      if (!tab?.id) return;

      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_JOB" },
        async (response) => {

          if (!response) 
          console.log("keine daten von content script erhalten")
          return;

          console.log("response:", response);

          const apiresponse = await fetch(
            `${API}/api/jobs`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(response)
            }
          );

          if(!apiresponse.ok) {
          console.log("fehler beim speichern")
          return
          }

          const data = await apiresponse.json();

          console.log(data);

        }
      );
    });

  });

};

const getin = async () => {

const password = document.getElementById("password").value
const email = document.getElementById("email").value

const response = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

  if(!response.ok) {
  console.error("login fehlgeschlagen")

  return
  }

  const data = await response.json()

  const token = data.token

  if(!token){

  console.error("token nicht verfügbar")
  return
  }

  chrome.storage.local.set({token})

  login.style.display = "none"

  job.style.display = "block"

  console.log("eingeloggt")
}

document.getElementById("savejob").addEventListener("click", getJobFromLinkedIn)

document.getElementById("loginbutton").addEventListener("click", getin)


