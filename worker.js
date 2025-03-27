// List of US states with average amounts
const US_STATES = [
  { name: "Alabama", avgAmount: 80000 },
  { name: "Alaska", avgAmount: 95000 },
  { name: "Arizona", avgAmount: 110000 },
  { name: "Arkansas", avgAmount: 75000 },
  { name: "California", avgAmount: 175000 },
  { name: "Colorado", avgAmount: 120000 },
  { name: "Connecticut", avgAmount: 130000 },
  { name: "Delaware", avgAmount: 95000 },
  { name: "Florida", avgAmount: 140000 },
  { name: "Georgia", avgAmount: 110000 },
  { name: "Hawaii", avgAmount: 160000 },
  { name: "Idaho", avgAmount: 85000 },
  { name: "Illinois", avgAmount: 120000 },
  { name: "Indiana", avgAmount: 90000 },
  { name: "Iowa", avgAmount: 80000 },
  { name: "Kansas", avgAmount: 85000 },
  { name: "Kentucky", avgAmount: 75000 },
  { name: "Louisiana", avgAmount: 85000 },
  { name: "Maine", avgAmount: 95000 },
  { name: "Maryland", avgAmount: 130000 },
  { name: "Massachusetts", avgAmount: 150000 },
  { name: "Michigan", avgAmount: 100000 },
  { name: "Minnesota", avgAmount: 110000 },
  { name: "Mississippi", avgAmount: 70000 },
  { name: "Missouri", avgAmount: 90000 },
  { name: "Montana", avgAmount: 95000 },
  { name: "Nebraska", avgAmount: 85000 },
  { name: "Nevada", avgAmount: 115000 },
  { name: "New Hampshire", avgAmount: 110000 },
  { name: "New Jersey", avgAmount: 140000 },
  { name: "New Mexico", avgAmount: 90000 },
  { name: "New York", avgAmount: 160000 },
  { name: "North Carolina", avgAmount: 105000 },
  { name: "North Dakota", avgAmount: 80000 },
  { name: "Ohio", avgAmount: 95000 },
  { name: "Oklahoma", avgAmount: 80000 },
  { name: "Oregon", avgAmount: 120000 },
  { name: "Pennsylvania", avgAmount: 110000 },
  { name: "Rhode Island", avgAmount: 120000 },
  { name: "South Carolina", avgAmount: 95000 },
  { name: "South Dakota", avgAmount: 75000 },
  { name: "Tennessee", avgAmount: 100000 },
  { name: "Texas", avgAmount: 130000 },
  { name: "Utah", avgAmount: 110000 },
  { name: "Vermont", avgAmount: 100000 },
  { name: "Virginia", avgAmount: 125000 },
  { name: "Washington", avgAmount: 135000 },
  { name: "West Virginia", avgAmount: 70000 },
  { name: "Wisconsin", avgAmount: 95000 },
  { name: "Wyoming", avgAmount: 85000 },
];

// Template function for headlines
function generateHeadline(state) {
  return `Get up to $500k from your <br><span class="headline-underline-decoration">home equity</span> in ${state.name}.`;
}

function generateStateAvgHeadline(state) {
  return `Homeowners in ${state.name} love getting $${state.avgAmount.toLocaleString()} cash from Point's Home Equity Investment.`;
}

// Generate headlines for all states
const STATE_HEADLINES = US_STATES.reduce((acc, state) => {
  acc[state.name] = generateHeadline(state);
  return acc;
}, {});

// Generate avg homeowner headlines for all states
const STATE_AVG_HEADLINES = US_STATES.reduce((acc, state) => {
  acc[state.name] = generateStateAvgHeadline(state);
  return acc;
}, {});

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Get geo information from the request
    const cf = request.cf;

    // Debug logging
    console.log("Debug info:", {
      originalRegion: cf?.region,
      hasStateHeadline: cf?.region ? !!STATE_HEADLINES[cf.region] : false,
      country: cf?.country,
    });

    const response = {
      // Only return a headline if it's a US state
      headline: cf?.country === "US" && cf?.region ? STATE_HEADLINES[cf.region] || null : null,
      avgHeadline: cf?.country === "US" && cf?.region ? STATE_AVG_HEADLINES[cf.region] || null : null,
      country: cf?.country || "Unknown",
      region: cf?.region || "Unknown",
      city: cf?.city || "Unknown",
      debug: {
        originalRegion: cf?.region,
        hasStateHeadline: cf?.region ? !!STATE_HEADLINES[cf.region] : false,
      },
    };

    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "max-age=3600",
      },
    });
  },
};
