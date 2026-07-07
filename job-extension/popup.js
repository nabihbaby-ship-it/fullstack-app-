
const getJobFromLinkedIn = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    const tab = tabs[0];
    if (!tab?.id) return;

    chrome.tabs.sendMessage(
      tab.id,
      { type: "GET_JOB" },
      async (response) => {

        if(!response) return

           console.log("response:", response)

           const apiresponse = await fetch("/api/jobs", {
          
            method: "POST", 
            headers: {"content-type" : "application/json"},

             body: JSON.stringify(response)
           }),

          const data = await apiresponse.json()
          
        console.log(data)

      }
    );
  });
};

document.getElementById("test").addEventListener("click", getJobFromLinkedIn)


