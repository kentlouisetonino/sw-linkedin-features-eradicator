let storiesHidden: boolean = true; // Set default to true (stories hidden)

// Function to toggle stories visibility
function toggleStoriesVisibility(): void {
  storiesHidden = !storiesHidden; // Toggle the state

  // Execute the script to hide/show stories in the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id ?? 0 },
      func: storiesHidden ? hideFacebookStories : showFacebookStories,
    });
  });

  // Update the button text
  updateButtonText();
}

// Function to hide Facebook stories
function hideFacebookStories(): void {
  const stories = document.querySelectorAll(".x193iq5w.xgmub6v.x1ceravr");
  stories.forEach((story) => {
    (story as HTMLElement).style.visibility = "hidden"; // Type assertion
  });
}

// Function to show Facebook stories
function showFacebookStories(): void {
  const stories = document.querySelectorAll(".x193iq5w.xgmub6v.x1ceravr");
  stories.forEach((story) => {
    (story as HTMLElement).style.visibility = "visible"; // Type assertion
  });
}

// Function to update button text based on the current state
function updateButtonText(): void {
  const button = document.getElementById("toggleButton");
  if (button) {
    button.innerText = storiesHidden
      ? "Facebook | Show Stories"
      : "Facebook | Hide Stories";
  }
}

// Load the initial state when the popup opens.
document.addEventListener("DOMContentLoaded", () => {
  updateButtonText(); // Update button text based on the default state

  // Add click event listener to the button
  const button = document.getElementById("toggleButton");
  if (button) {
    button.addEventListener("click", toggleStoriesVisibility);
  }
});
