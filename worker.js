// List of US states
const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

// Template function for headlines
function generateHeadline(state) {
  return `Get up to $500k from your <br><span class="headline-underline-decoration">home equity</span> in ${state}.`;
}

function generateStateAvgHeadline(state) {
  return `Homeowners in ${state} love getting cash from Point's Home Equity Investment.`;
}

// Generate headlines for all states
const STATE_HEADLINES = US_STATES.reduce((acc, state) => {
  acc[state] = generateHeadline(state);
  return acc;
}, {});

// Generate avg homeowner headlines for all states
const STATE_AVG_HEADLINES = US_STATES.reduce((acc, state) => {
  acc[state] = generateStateAvgHeadline(state);
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
