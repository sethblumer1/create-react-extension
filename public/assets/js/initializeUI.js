// Problem here is that we need different configurations for each site; such as grabbing the job title, company name, etc.
// Solution is to create site configurations so it is flexible; then check host name

const siteConfigs = {
  "www.linkedin.com": {
    jobTitleSelector: ".job-details-jobs-unified-top-card__job-title-link",
    companyNameSelector:
      ".job-details-jobs-unified-top-card__primary-description-without-tagline.mb2 a:first-of-type",
    removeUrlPart: "/life",
  },
  "www.indeed.com": {
    jobTitleSelector: ".jobsearch-JobInfoHeader-title",
    companyNameSelector: "#companyLink",
  },
};

const currentConfig = siteConfigs[window.location.hostname];

console.log(currentConfig);

let lastJobTitle = "";

function removeLifeFromUrl(url) {
  if (url.endsWith("/life")) {
    return url.slice(0, -5);
  }
  return url;
}

function attachEventListenerToSaveButton() {
  const saveButton = document.querySelector(".jobs-save-button");
  if (saveButton && !saveButton.dataset.listenerAttached) {
    saveButton.addEventListener("click", () => {
      console.log("Save button clicked");
      // Handle the click event
    });
    saveButton.dataset.listenerAttached = "true";
    console.log("Event listener attached to save button");
  }
}

// TEST WITH CONFIG
// function handleJobData() {
//   if (!currentConfig) return;

//   let currJobTitle = document.querySelector(currentConfig.jobTitleSelector);
//   let companyName = document.querySelector(currentConfig.companyNameSelector);

//   console.log(currJobTitle);
//   // console.log(companyName);

//   if (currJobTitle) {
//     if (window.location.hostname === "www.indeed.com") {
//       currJobTitle = currJobTitle.children[0].textContent;
//       // console.log(currJobTitle.children);
//     } else {
//       currJobTitle = currJobTitle.textContent.trim();
//     }

//     if (window.location.hostname === "www.indeed.com") {
//       companyName = "Indeed sucks";
//     } else {
//       companyName = companyName.textContent.trim();
//     }

//     let companyUrl;

//     // Use currentConfig.removeUrlPart if needed, and check if it exists
//     if (currentConfig === "www.linkedin.com") {
//       companyUrl = removeLifeFromUrl(companyName.getAttribute("href"));
//     } else {
//       companyUrl = "www.google.com";
//     }

//     if (currJobTitle !== lastJobTitle) {
//       lastJobTitle = currJobTitle; // Update the last seen job posting
//       const jobData = {
//         jobTitle: currJobTitle,
//         companyName,
//         companyUrl,
//       };

//       window.postMessage({ type: "FROM_EXTENSION", data: jobData }, "*");
//     }
//   }
// }

function handleJobData(retryCount = 0) {
  if (!currentConfig) return;

  const currJobTitleElement = document.querySelector(
    currentConfig.jobTitleSelector
  );
  const companyNameElement = document.querySelector(
    currentConfig.companyNameSelector
  );

  if (!currJobTitleElement && retryCount < 3) {
    // If job title element is not found, retry up to 3 times.
    console.log(
      `Job title element not found. Retrying... Attempt ${retryCount + 1}`
    );
    setTimeout(() => handleJobData(retryCount + 1), 500); // Wait 1 second before retrying.
    return;
  }

  // If the element is found or retries have been exhausted, proceed to process the data.
  let currJobTitle = currJobTitleElement
    ? currJobTitleElement.textContent.trim()
    : "";
  let companyName = companyNameElement
    ? companyNameElement.textContent.trim()
    : "Company Name Not Found";

  // Special handling for Indeed to ensure we have the correct data format.
  if (window.location.hostname === "www.indeed.com") {
    currJobTitle =
      currJobTitleElement && currJobTitleElement.children.length > 0
        ? currJobTitleElement.children[0].textContent.trim()
        : "Job Title Not Found";
    companyName = "Indeed Company"; // Example, adjust according to your needs.
  }

  // Further processing (e.g., forming the company URL) remains unchanged.
  let companyUrl =
    currentConfig === "www.linkedin.com"
      ? removeLifeFromUrl(companyNameElement.getAttribute("href"))
      : "www.google.com";

  // Check if we have a new job title compared to the last one processed.
  if (currJobTitle && currJobTitle !== lastJobTitle) {
    lastJobTitle = currJobTitle; // Update the last seen job posting.
    const jobData = {
      jobTitle: currJobTitle,
      companyName,
      companyUrl,
    };

    // Perform your action with the job data, e.g., posting a message.
    window.postMessage({ type: "FROM_EXTENSION", data: jobData }, "*");
    console.log("Job data processed:", jobData);
  } else if (!currJobTitle) {
    console.log("Failed to fetch job title after retries.");
  }
}

function waitForElementAndObserve(selector, observeCallback) {
  const intervalId = setInterval(() => {
    const targetNode = document.querySelector(selector);
    console.log(`Checking for ${selector}`);
    if (targetNode) {
      console.log(`Found ${selector}, setting up observer.`);
      clearInterval(intervalId); // Stop the interval
      observeCallback(targetNode); // Call the callback function with the found node
    }
  }, 1000); // Check every 1000 milliseconds (1 second)
}

function setupObserver(targetNode) {
  const observer = new MutationObserver((mutations) => {
    // console.log(mutations.length);
    for (let mutation of mutations) {
      if (mutation.type === "childList" || mutation.type === "subtree") {
        if (window.location.hostname === "www.indeed.com") {
          // console.log(mutation);
          if (mutation.target.id === "js-match-insights-provider-job-details") {
            // console.log("hi");

            handleJobData();
            attachEventListenerToSaveButton();

            // handleJobData();
            // attachEventListenerToSaveButton();
          }
        } else {
          handleJobData(); // Check for and handle job data if the DOM has changed
          attachEventListenerToSaveButton();
        }
      }
    }
  });

  observer.observe(targetNode, { childList: true, subtree: true });
  // Perform an initial check in case the content is already present
  handleJobData();
  attachEventListenerToSaveButton();
}

// Use the modified function to wait for the element before observing
if (window.location.hostname === "www.linkedin.com") {
  waitForElementAndObserve(
    ".jobs-search__job-details--container",
    setupObserver
  );
}

if (window.location.hostname === "www.indeed.com") {
  waitForElementAndObserve(".jobsearch-RightPane", setupObserver);
}

// // Set up a mutation observer to watch for changes in the job details container
// const observer = new MutationObserver((mutations) => {
//   for (let mutation of mutations) {
//     if (mutation.type === "childList" || mutation.type === "subtree") {
//       handleJobData(); // Check for and handle job data if the DOM has changed
//     }
//   }
// });

// // Start observing the target node for configured mutations
// const targetNode = document.querySelector(
//   ".jobs-search__job-details--container"
// ); // This is null initially, so we have to wait
// console.log(targetNode);
// observer.observe(targetNode, { childList: true, subtree: true });

// // Initial check
// handleJobData();

// See if save button clicked

(async () => {
  const app = document.createElement("div");

  app.id = "root";
  document.body.append(app);

  const src = chrome?.runtime?.getURL("/react/index.js");
  await import(src);
})();
