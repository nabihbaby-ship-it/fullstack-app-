console.log("content script läuft")

const host = window.location.hostname

const getjobfromindeed = () => {

const title =
  document.querySelector(".jobsearch-JobInfoHeader-title")?.innerText ||
  document.querySelector("h1")?.innerText ||
  "";

  const company = document.querySelector("") || ""

return{
title,
company: company ,
status: "saved"
}

}

const getlinkedinjob = () => {

const job = document.querySelector("h1")?.innerText || ""

const url = window.location.href

const source = window.location.hostname
    
const company = document.querySelector(".job-details-jobs-unified-top-card__company-name")?.textContent?.trim() || ""  

if(!job) {

console.log("kein jobtitel gefunden")
return null
}

return{
title: job,
url,
source,
company,
status: "saved",
createdat: Date.now()
}
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  console.log("HOST:", host)

  if (request.type !== "GET_JOB") return
  
  if (host.includes("linkedin")) {

    const job = getlinkedinjob()

  sendResponse(job)
  }

  else if (host.includes("indeed")) {

  const job = getjobfromindeed()
  sendResponse(job)
  }

  else {

  console.log("nicht unterstützte seite:", host);
  sendResponse(null)
  }
  
  return true

  });



