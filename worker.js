// List of US states with average amounts
const US_STATES = [
  { name: "Arizona", avgAmount: 85000 },
  { name: "California", avgAmount: 143500 },
  { name: "Colorado", avgAmount: 87000 },
  { name: "Connecticut", avgAmount: 96900 },
  { name: "District of Columbia", avgAmount: 156700 },
  { name: "Florida", avgAmount: 87500 },
  { name: "Georgia", avgAmount: 85500 },
  { name: "Hawaii", avgAmount: 147400 },
  { name: "Illinois", avgAmount: 70600 },
  { name: "Indiana", avgAmount: 54600 },
  { name: "Maryland", avgAmount: 90700 },
  { name: "Michigan", avgAmount: 57700 },
  { name: "Minnesota", avgAmount: 59300 },
  { name: "Missouri", avgAmount: 47300 },
  { name: "North Carolina", avgAmount: 69100 },
  { name: "New Jersey", avgAmount: 91800 },
  { name: "Nevada", avgAmount: 89200 },
  { name: "New York", avgAmount: 102800 },
  { name: "Ohio", avgAmount: 55100 },
  { name: "Oregon", avgAmount: 79100 },
  { name: "Pennsylvania", avgAmount: 60600 },
  { name: "South Carolina", avgAmount: 93600 },
  { name: "Tennessee", avgAmount: 75800 },
  { name: "Utah", avgAmount: 93200 },
  { name: "Virginia", avgAmount: 83100 },
  { name: "Washington", avgAmount: 101000 },
];

// Template function for headlines
function generateHeadline(state) {
  return `Get up to $500k from your <br><span class="headline-underline-decoration">home equity</span> in ${state.name}.`;
}

function generateStateSocialProofHeadline(state) {
  return `Qualified homeowners in ${state.name} get an average of $${state.avgAmount.toLocaleString()} from Point's Home Equity Investment`;
}

function addStateAvgFootnote(state) {
  return `Qualified homeowners in ${state.name} get an average of  $${state.avgAmount.toLocaleString()} from Point's Home Equity Investment`;
}

// Generate headlines for all states
const STATE_HEADLINES = US_STATES.reduce((acc, state) => {
  acc[state.name] = generateHeadline(state);
  return acc;
}, {});

// Generate avg homeowner headlines for all states
const STATE_AVG_HEADLINES = US_STATES.reduce((acc, state) => {
  acc[state.name] = generateStateSocialProofHeadline(state);
  return acc;
}, {});

const STATE_AVG_FOOTNOTES = US_STATES.reduce((acc, state) => {
  acc[state.name] = addStateAvgFootnote(state);
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
    // console.log("Debug info:", {
    //   originalRegion: cf?.region,
    //   hasStateHeadline: cf?.region ? !!STATE_HEADLINES[cf.region] : false,
    //   country: cf?.country,
    // });

    const response = {
      // Only return a headline if it's a US state
      headline: cf?.country === "US" && cf?.region ? STATE_HEADLINES[cf.region] || null : null,
      avgHeadline: cf?.country === "US" && cf?.region ? STATE_AVG_HEADLINES[cf.region] || null : null,
      footnote: cf?.country === "US" && cf?.region ? STATE_AVG_FOOTNOTES[cf.region] || null : null,
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
