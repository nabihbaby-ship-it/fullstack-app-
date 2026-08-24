console.log("content script läuft")
console.log(window.location.href)
document.querySelectorAll("h1, h2, h3").forEach(e => console.log(e.innerText))


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

  console.log("message erhalten", request)

  console.log("HOST:", host)

  if (request.type !== "GET_JOB") return
  
  if (host.includes("linkedin")) {

    console.log("1 linkedin erkannt")

    const job = getlinkedinjob()

    console.log("2 getlinkedinjob beendet")
    console.log("3 job gefunden:", job)

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



