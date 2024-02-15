let lastJobTitle = '';

function removeLifeFromUrl(url) {
  if (url.endsWith('/life')) {
    return url.slice(0, -5);
  }
  return url;
}

function handleJobData() {
  let currJobTitle = document.querySelector(
    '.job-details-jobs-unified-top-card__job-title-link'
  );
  let companyName = document.querySelector(
    '.job-details-jobs-unified-top-card__primary-description-without-tagline.mb2 a:first-of-type'
  );

  if (currJobTitle && companyName) {
    currJobTitle = currJobTitle.textContent.trim();
    const companyUrl = removeLifeFromUrl(companyName.getAttribute('href'));
    companyName = companyName.textContent.trim();

    if (currJobTitle !== lastJobTitle) {
      lastJobTitle = currJobTitle; // Update the last seen job posting
      const jobData = {
        title: currJobTitle,
        company: companyName,
        companyUrl: companyUrl,
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
