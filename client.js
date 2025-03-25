(() => {
  const WORKER_URL = "https://geo-ip-detector.ops-1df.workers.dev/"; // Update this with your worker URL
  const HEADLINE_SELECTOR = "h1"; // Update this if you want to target a specific h1 with an ID or class

  async function updateHeadline() {
    try {
      const response = await fetch(WORKER_URL);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      // Only update if we have a US state headline
      if (data.headline) {
        const headlines = document.querySelectorAll(HEADLINE_SELECTOR);
        if (headlines.length > 0) {
          headlines[0].textContent = data.headline;
        }
      }
    } catch (error) {
      console.error("Error fetching geo data:", error);
    }
  }

  // Run when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateHeadline);
  } else {
    updateHeadline();
  }
})();
