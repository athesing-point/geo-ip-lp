
--- Repository Documentation ---

# Geo IP Landing Page Documentation

## Overview

This repository provides a simple geo-detection system. It uses Cloudflare Workers to dynamically update landing page content based on the visitor's location. The system consists of a Cloudflare Worker for location detection and a client-side JavaScript script for page updates.

## Quick Start

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start development server:**
    ```bash
    npm run dev
    ```
3.  **Deploy the worker:**
    ```bash
    npm run deploy
    ```
4.  **Integrate with your landing page:**
    *   Copy the content of `client.js`.
    *   Paste it into your landing page's custom code section (e.g., in Webflow).
    *   **Important:** Update `WORKER_URL` in `client.js` with your deployed worker URL.

## Configuration

### Cloudflare Worker (`worker.js`)

*   **`US_STATES` Array:**  Defines US states and their corresponding average amounts. Customize this array to modify headlines and data for each state.
*   **`generateHeadline(state)` Function:**  Template for generating the main headline. Edit this function to change the headline structure.
*   **`generateStateAvgHeadline(state)` Function:** Template for generating the average homeowner headline. Edit this function to change the average headline structure.
*   **`STATE_HEADLINES` Constant:**  Generated headlines for each state based on `generateHeadline`.
*   **`STATE_AVG_HEADLINES` Constant:** Generated average homeowner headlines for each state based on `generateStateAvgHeadline`.
*   **`fetch(request)` Function:**
    *   Handles incoming requests to the worker.
    *   Detects visitor location using Cloudflare's `request.cf` object.
    *   Returns a JSON response containing:
        *   `headline`: Location-specific headline (US states only).
        *   `avgHeadline`: Location-specific average homeowner headline (US states only).
        *   `country`: Visitor's country.
        *   `region`: Visitor's region (state in the US).
        *   `city`: Visitor's city.
        *   `debug`: Debugging information.
    *   Sets CORS headers to allow cross-origin requests.
    *   Sets `Cache-Control` header for browser caching.

### Client-side Script (`client.js`)

*   **`WORKER_URL` Variable:**  **Required configuration.**  Update this to the URL of your deployed Cloudflare Worker.
*   **`HEADLINE_SELECTOR` Variable:** CSS selector for the HTML element to be updated with the main headline (default: `h1`).
*   **`AVG_HOMEOWNER_SELECTOR` Variable:** CSS selector for the HTML element to be updated with the average homeowner headline (default: `#avg-homeowner`).
*   **`AVG_HOMEOWNER_FOOTNOTE_SELECTOR` Variable:** CSS selector for the HTML element to be updated with footnote (currently unused in provided code).
*   **`updateHeadline()` Function:**
    *   Fetches geo data from the Cloudflare Worker at `WORKER_URL`.
    *   Updates the HTML content of the elements selected by `HEADLINE_SELECTOR` and `AVG_HOMEOWNER_SELECTOR` with data received from the worker.
    *   Logs debug information and handles potential errors during the fetch process.
*   The script executes `updateHeadline()` when the DOM is fully loaded (`DOMContentLoaded` event).

### Wrangler Configuration (`wrangler.toml`)

*   **`name`:**  Defines the name of your Cloudflare Worker (`geo-ip-detector`).
*   **`main`:** Specifies the main worker script file (`worker.js`).
*   **`compatibility_date`:** Sets the compatibility date for Cloudflare Workers runtime features (`2024-01-01`).

## Dependencies

*   **`wrangler`:** Cloudflare Workers CLI for development and deployment.
*   **`cursor-tools`:** Development dependency, likely used for repository automation and documentation (based on `.cursorrules` file, but not directly required for the core Geo IP functionality).

## Customization

*   **Headlines:** Modify the `generateHeadline` and `generateStateAvgHeadline` functions in `worker.js` to customize the generated headlines.
*   **Target Elements:** Change `HEADLINE_SELECTOR`, `AVG_HOMEOWNER_SELECTOR` in `client.js` to target different HTML elements on your landing page.
*   **State Data:** Update the `US_STATES` array in `worker.js` to adjust average amounts or add/modify states.
*   **Extend Worker Logic:**  Expand the `fetch` function in `worker.js` to include more complex logic or data processing based on location information.

--- End of Documentation ---
