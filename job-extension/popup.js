
const login = document.getElementById("login");
const job = document.getElementById("job");
const popup = document.getElementById("popupnachricht");

const API = "https://my-fullstack-app-production-30fe.up.railway.app";


// -------------------------
// UI
// -------------------------

const showLogin = () => {
  login.style.display = "block";
  popup.style.display = "block";
  job.style.display = "none";
};

const showJobButton = () => {
  login.style.display = "none";
  popup.style.display = "none";
  job.style.display = "block";
};


// -------------------------
// Beim Start prüfen
// -------------------------

chrome.storage.local.get("token", (data) => {

  if (!data.token) {
    showLogin();
    return;
  }

  showJobButton();
});


// -------------------------
// Job von LinkedIn holen
// -------------------------

const getJobFromLinkedIn = () => {

  chrome.storage.local.get("token", async (search) => {

    const token = search.token;

    if (!token) {
      console.log("kein token vorhanden");
      showLogin();
      return;
    }

    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {

        const tab = tabs[0];

        if (!tab?.id) return;

        chrome.tabs.sendMessage(
          tab.id,
          { type: "GET_JOB" },
          async (response) => {

            console.log("response vom content script", response)

            if (chrome.runtime.lastError) {
              console.error(
                chrome.runtime.lastError.message
              );
              return;
            }

           

            if (!response) {
              console.log(
                "keine daten von content script erhalten"
              );
              return;
            }

            console.log("response:", response);

            try {

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

              console.log("status:",apiresponse.status);

              const text =await apiresponse.text();

              console.log("server:", text);

              if (apiresponse.status === 401) {

                chrome.storage.local.remove("token");

                showLogin();

                console.log( "Token ungültig");

                return;
              }

            } catch (error) {

              console.error(
                "Fehler beim Speichern:",
                error
              );

            }
          }
        );
      }
    );
  });
};


// -------------------------
// Login
// -------------------------

const getin = async () => {

  console.log("gestartet");

  const password = document.getElementById("password").value;

  const email =  document.getElementById("email").value;

  try {

    const response = await fetch(
      `${API}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    if (!response.ok) {

      console.error(
        "Login fehlgeschlagen"
      );

      return;
    }

    const data =
      await response.json();

    const token = data.token;

    if (!token) {

      console.error(
        "Token nicht verfügbar"
      );

      return;
    }

    chrome.storage.local.set(
      { token },
      () => {

        showJobButton();

        console.log(
          "eingeloggt"
        );

      }
    );

  } catch (error) {

    console.error(
      "Login Fehler:",
      error
    );

  }
};


// -------------------------
// Buttons
// -------------------------

document
  .getElementById("savejob")
  .addEventListener(
    "click",
    getJobFromLinkedIn
  );

document
  .getElementById("loginbutton")
  .addEventListener(
    "click",
    getin
  );

