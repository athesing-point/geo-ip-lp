(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const WORKER_URL = "https://geo-ip-detector.ops-1df.workers.dev/"; // Update this with your worker URL
    const HEADLINE_SELECTOR = "h1"; // Update this if you want to target a specific h1 with an ID or class

    async function updateHeadline() {
      try {
        const response = await fetch(WORKER_URL);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("Geo data received:", data); // Add logging for debugging
        console.log("Debug info:", data.debug); // Log the debug information

        // Only update if we have a US state headline
        if (data.headline) {
          const headlines = document.querySelectorAll(HEADLINE_SELECTOR);
          console.log("Found headlines:", headlines.length); // Log number of headlines found
          if (headlines.length > 0) {
            headlines[0].innerHTML = data.headline; // Use innerHTML since we're receiving HTML content
            console.log("Updated headline with:", data.headline); // Log the headline content
          } else {
            console.warn("No headlines found with selector:", HEADLINE_SELECTOR);
          }
        } else {
          console.log("No headline available for this location. Debug info:", {
            country: data.country,
            region: data.region,
            stateAbbr: data.stateAbbr,
            hasHeadline: !!data.headline,
          });
        }
      } catch (error) {
        console.error("Error fetching geo data:", error);
      }
    }

    // Run immediately since we're already in DOMContentLoaded
    updateHeadline();
  });
})();
