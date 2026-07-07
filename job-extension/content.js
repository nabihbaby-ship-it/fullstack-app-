console.log("content script läuft")

const host = window.location.hostname

const getjobfromindeed = () => {

const title =
  document.querySelector(".jobsearch-JobInfoHeader-title")?.innerText ||
  document.querySelector("h1")?.innerText ||
  "";

return{
title
}

}

const getlinkedinjob = () => {

const job = document.querySelector("h1")?.innerText || ""

const url = window.location.href

const source = window.location.hostname
    
const company = document.querySelector(".job-details-jobs-unified-top-card__company-name")?.textContent?.trim() || ""  

return{
job,
url,
source,
company,
status: "saved",
createdad: Date.now()
}
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.type !== "GET_JOB") return
  
  if (host.includes("linkedin")) {

    const job = getlinkedinjob()

  sendResponse(job)
  }

  else if (host.includes("indeed")) {

  const job = getjobfromindeed()
  sendResponse(job)
  }
  
  return true

  });



