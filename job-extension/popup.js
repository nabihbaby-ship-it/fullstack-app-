const login = document.getElementById("login")
const job = document.getElementById("job")


chrome.storage.local.get("token", (data) => {if (data.token){ 

  job.style.display = "block";

}

else {

  login.style.display = "block"
}})



const getJobFromLinkedIn = () => {

  chrome.storage.local.get("token", async (search) => {

    const token = search.token;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

      const tab = tabs[0];
      if (!tab?.id) return;

      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_JOB" },
        async (response) => {

          if (!response) return;

          console.log("response:", response);

          const apiresponse = await fetch(
            "https://dein-backend.up.railway.app/api/jobs",
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

document.getElementById("test").addEventListener("click", getJobFromLinkedIn)


