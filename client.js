(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const WORKER_URL = "https://geo-ip-detector.ops-1df.workers.dev/"; // Update this with your worker URL
    const HEADLINE_SELECTOR = "h1"; // Update this if you want to target a specific h1 with an ID or class
    const SOCIAL_PROOF_HEADLINE_SELECTOR = "#avg-homeowner"; // Selector for the avg-homeowner element
    const AVG_HOMEOWNER_FOOTNOTE_SELECTOR = "#footnote-rtf"; // Selector for the footnote-rtf element to update with avg amount details.
    const AVG_HOMEOWNER_SELECTOR = "#avg-homeowner"; // Added AVG_HOMEOWNER_SELECTOR

    async function updateHeadline() {
      try {
        const response = await fetch(WORKER_URL);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        // console.log("Geo data received:", data); // Add logging for debugging
        // console.log("Debug info:", data.debug); // Log the debug information

        // Only update if we have a US state headline
        if (data.headline) {
          const headlines = document.querySelectorAll(HEADLINE_SELECTOR);
          // console.log("Found headlines:", headlines.length); // Log number of headlines found
          if (headlines.length > 0) {
            headlines[0].innerHTML = data.headline; // Use innerHTML since we're receiving HTML content
            // console.log("Updated headline with:", data.headline); // Log the headline content
          } else {
            // console.warn("No headlines found with selector:", HEADLINE_SELECTOR);
          }
        } else {
          // console.log("No headline available for this location. Debug info:", {
          //   country: data.country,
          //   region: data.region,
          //   stateAbbr: data.stateAbbr,
          //   hasHeadline: !!data.headline,
          // });
        }

        // Update avg-homeowner element if available
        if (data.avgHeadline) {
          const avgHomeowner = document.querySelector(AVG_HOMEOWNER_SELECTOR);
          if (avgHomeowner) {
            avgHomeowner.outerHTML = `<h1 id="avg-homeowner" class="heading-medium text-wrap-balance">${data.avgHeadline}<sup class="headline-superscript">1</sup></h1>`;
            // console.log("Updated avg-homeowner with:", data.avgHeadline);
          } else {
            // console.warn("No element found with selector:", AVG_HOMEOWNER_SELECTOR);
          }
        }

        // Update footnote element if available
        if (data.footnote) {
          const footnoteElement = document.querySelector(AVG_HOMEOWNER_FOOTNOTE_SELECTOR);
          if (footnoteElement) {
            const orderedList = footnoteElement.querySelector("ol");
            if (orderedList) {
              // Store the existing legal text content
              const existingLegalText = orderedList.querySelector("li").textContent;

              // Clear and recreate the list
              orderedList.innerHTML = "";
              orderedList.setAttribute("start", "1");
              orderedList.setAttribute("role", "list");

              // Create single list item containing both pieces of text
              const listItem = document.createElement("li");
              listItem.innerHTML = `${data.footnote}.<br><br>${existingLegalText}`;
              orderedList.appendChild(listItem);

              // console.log("Updated footnote under single number");
            } else {
              // console.warn("No ordered list found in footnote element");
            }
          } else {
            // console.warn("No element found with selector:", AVG_HOMEOWNER_FOOTNOTE_SELECTOR);
          }
        }
      } catch (error) {
        // console.error("Error fetching geo data:", error);
      }
    }

    // Run immediately since we're already in DOMContentLoaded
    updateHeadline();
  });
})();
