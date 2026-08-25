console.log("content script läuft")
console.log(window.location.href)
console.log("CONTENT SCRIPT START");

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

setTimeout(() => {
  console.log(document.querySelector("h1"));
}, 3000);

console.log("URL:", window.location.href);
console.log("Body vorhanden:", !!document.body);
console.log("H1:", document.querySelector("h1"));

const job = document.querySelector("a._5ecc2880.e5cee6d8")?.innerText?.trim() || "";

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

    console.log("job vor sendresponse", job)

  sendResponse(job)

  console.log("response gesendet")
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



