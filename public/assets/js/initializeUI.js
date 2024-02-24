// Problem here is that we need different configurations for each site; such as grabbing the job title, company name, etc.
// Solution is to create site configurations so it is flexible; then check host name

const siteConfigs = {
  'www.linkedin.com': {
    jobTitleSelector: '.job-details-jobs-unified-top-card__job-title-link',
    companyNameSelector:
      '.job-details-jobs-unified-top-card__primary-description-without-tagline.mb2 a:first-of-type',
    removeUrlPart: '/life',
  },
  'www.indeed.com': {
    jobTitleSelector: '.jobsearch-JobInfoHeader-title',
    companyNameSelector: '#companyLink',
  },
};

const currentConfig = siteConfigs[window.location.hostname];

console.log(currentConfig);

let lastJobTitle = '';

function removeLifeFromUrl(url) {
  if (url.endsWith('/life')) {
    return url.slice(0, -5);
  }
  return url;
}

// TEST WITH CONFIG
function handleJobData() {
  if (!currentConfig) return;

  let currJobTitle = document.querySelector(currentConfig.jobTitleSelector);
  let companyName = document.querySelector(currentConfig.companyNameSelector);

  if (currJobTitle && companyName) {
    currJobTitle = currJobTitle.textContent.trim();
    companyName = companyName.textContent.trim();
    let companyUrl;

    // Use currentConfig.removeUrlPart if needed, and check if it exists
    if (currentConfig === 'www.linkedin.com') {
      companyUrl = removeLifeFromUrl(companyName.getAttribute('href'));
    } else {
      companyUrl = 'www.google.com';
    }

    if (currJobTitle !== lastJobTitle) {
      lastJobTitle = currJobTitle; // Update the last seen job posting
      const jobData = {
        jobTitle: currJobTitle,
        companyName,
        companyUrl,
      };

      // Add event listener to new save button
      // const saveButton = document.querySelector('.jobs-save-button');

      // if (saveButton) {
      //   saveButton.addEventListener('click', () => {
      //     console.log('Hi');
      //   });
      // } else {
      //   console.log('Jobs save button not found');
      // }

      window.postMessage({ type: 'FROM_EXTENSION', data: jobData }, '*');
    }
  }
}

// PREVIOUS THAT WORKED WITH LINKEDIN
// function handleJobData() {
//   let currJobTitle = document.querySelector(
//     '.job-details-jobs-unified-top-card__job-title-link'
//   );
//   let companyName = document.querySelector(
//     '.job-details-jobs-unified-top-card__primary-description-without-tagline.mb2 a:first-of-type'
//   );

//   if (currJobTitle && companyName) {
//     currJobTitle = currJobTitle.textContent.trim();
//     const companyUrl = removeLifeFromUrl(companyName.getAttribute('href'));
//     companyName = companyName.textContent.trim();

//     if (currJobTitle !== lastJobTitle) {
//       lastJobTitle = currJobTitle; // Update the last seen job posting
//       const jobData = {
//         jobTitle: currJobTitle,
//         companyName,
//         companyUrl,
//       };

//       // Add event listener to new save button
//       // const saveButton = document.querySelector('.jobs-save-button');

//       // if (saveButton) {
//       //   saveButton.addEventListener('click', () => {
//       //     console.log('Hi');
//       //   });
//       // } else {
//       //   console.log('Jobs save button not found');
//       // }

//       window.postMessage({ type: 'FROM_EXTENSION', data: jobData }, '*');
//     }
//   }
// }

// Set up a mutation observer to watch for changes in the job details container
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList' || mutation.type === 'subtree') {
      handleJobData(); // Check for and handle job data if the DOM has changed
    }
  }
});

// Start observing the target node for configured mutations
const targetNode = document; // Replace with a more specific container if possible
observer.observe(targetNode, { childList: true, subtree: true });

// Initial check
handleJobData();

// See if save button clicked

(async () => {
  const app = document.createElement('div');

  app.id = 'root';
  document.body.append(app);

  const src = chrome?.runtime?.getURL('/react/index.js');
  await import(src);
})();
