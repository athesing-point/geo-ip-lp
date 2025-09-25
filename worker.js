// List of US states with average amounts
const US_STATES = [
  { code: "AZ", name: "Arizona", avgAmount: 85000 },
  { code: "CA", name: "California", avgAmount: 143500 },
  { code: "CO", name: "Colorado", avgAmount: 87000 },
  { code: "CT", name: "Connecticut", avgAmount: 96900 },
  { code: "DC", name: "District of Columbia", avgAmount: 156700 },
  { code: "FL", name: "Florida", avgAmount: 87500 },
  { code: "GA", name: "Georgia", avgAmount: 85500 },
  { code: "HI", name: "Hawaii", avgAmount: 147400 },
  { code: "IL", name: "Illinois", avgAmount: 70600 },
  { code: "IN", name: "Indiana", avgAmount: 54600 },
  { code: "MD", name: "Maryland", avgAmount: 90700 },
  { code: "MI", name: "Michigan", avgAmount: 57700 },
  { code: "MN", name: "Minnesota", avgAmount: 59300 },
  { code: "MO", name: "Missouri", avgAmount: 47300 },
  { code: "NC", name: "North Carolina", avgAmount: 69100 },
  { code: "NJ", name: "New Jersey", avgAmount: 91800 },
  { code: "NV", name: "Nevada", avgAmount: 89200 },
  { code: "NY", name: "New York", avgAmount: 102800 },
  { code: "OH", name: "Ohio", avgAmount: 55100 },
  { code: "OR", name: "Oregon", avgAmount: 79100 },
  { code: "PA", name: "Pennsylvania", avgAmount: 60600 },
  { code: "SC", name: "South Carolina", avgAmount: 93600 },
  { code: "TN", name: "Tennessee", avgAmount: 75800 },
  { code: "UT", name: "Utah", avgAmount: 93200 },
  { code: "VA", name: "Virginia", avgAmount: 83100 },
  { code: "WA", name: "Washington", avgAmount: 101000 },
];

// Template function for headlines
function generateHeadline(state) {
  return `Get up to $600k from your <br><span class="headline-underline-decoration">home equity</span> in ${state.name}.`;
}

function generateStateSocialProofHeadline(state) {
  return `Qualified homeowners in ${state.name} get an average of $${state.avgAmount.toLocaleString()} from Point's Home Equity Investment`;
}

function addStateAvgFootnote(state) {
  return `Qualified homeowners in ${state.name} get an average of  $${state.avgAmount.toLocaleString()} from Point's Home Equity Investment`;
}

// Generate headlines for all states
const STATE_CONTENT = US_STATES.reduce((acc, state) => {
  const content = {
    code: state.code,
    name: state.name,
    headline: generateHeadline(state),
    avgHeadline: generateStateSocialProofHeadline(state),
    footnote: addStateAvgFootnote(state),
  };

  acc[state.code] = content;
  acc[state.name.toUpperCase()] = content;

  return acc;
}, {});

function getStateContent(region) {
  if (!region) {
    return null;
  }

  const normalizedRegion = region.trim().toUpperCase();
  return STATE_CONTENT[normalizedRegion] || null;
}

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

    const stateContent = cf?.country === "US" ? getStateContent(cf?.region) : null;

    const response = {
      headline: stateContent?.headline ?? null,
      avgHeadline: stateContent?.avgHeadline ?? null,
      footnote: stateContent?.footnote ?? null,
      country: cf?.country || "Unknown",
      region: cf?.region || "Unknown",
      stateAbbr: stateContent?.code ?? null,
      stateName: stateContent?.name ?? null,
      city: cf?.city || "Unknown",
      debug: {
        originalRegion: cf?.region,
        matchedStateCode: stateContent?.code ?? null,
        hasStateHeadline: !!stateContent,
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
