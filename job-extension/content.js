console.log("content script läuft")
console.log(window.location.href)
console.log("CONTENT SCRIPT START");

const host = window.location.hostname
document.querySelector("a._5ecc2880.e5cee6d8")

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

  console.log("=== GET LINKEDIN JOB ===");

  const jobElement = document.querySelector(
    "a._5ecc2880.e5cee6d8"
  );

  console.log("JOB ELEMENT:", jobElement);

  if (jobElement) {
    console.log("JOB TEXT:", jobElement.innerText);
  }

  return jobElement
    ? {
        title: jobElement.innerText.trim(),
        url: jobElement.href,
        source: window.location.hostname,
        status: "saved"
      }
    : null;
};

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



