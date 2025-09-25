// List of US states with average amounts
const US_STATES = [
  { code: "AZ", name: "Arizona", avgAmount: 88000 },
  { code: "CA", name: "California", avgAmount: 145000 },
  { code: "CO", name: "Colorado", avgAmount: 100000 },
  { code: "CT", name: "Connecticut", avgAmount: 90000 },
  { code: "DC", name: "District of Columbia", avgAmount: 139000 },
  { code: "FL", name: "Florida", avgAmount: 89000 },
  { code: "GA", name: "Georgia", avgAmount: 74000 },
  { code: "HI", name: "Hawaii", avgAmount: 152000 },
  { code: "IL", name: "Illinois", avgAmount: 75000 },
  { code: "IN", name: "Indiana", avgAmount: 60000 },
  { code: "MA", name: "Massachusetts", avgAmount: 121000 },
  { code: "MD", name: "Maryland", avgAmount: 89000 },
  { code: "MI", name: "Michigan", avgAmount: 65000 },
  { code: "MN", name: "Minnesota", avgAmount: 67000 },
  { code: "MO", name: "Missouri", avgAmount: 54000 },
  { code: "NC", name: "North Carolina", avgAmount: 78000 },
  { code: "NJ", name: "New Jersey", avgAmount: 97000 },
  { code: "NV", name: "Nevada", avgAmount: 90000 },
  { code: "NY", name: "New York", avgAmount: 107000 },
  { code: "OH", name: "Ohio", avgAmount: 57000 },
  { code: "OR", name: "Oregon", avgAmount: 85000 },
  { code: "PA", name: "Pennsylvania", avgAmount: 63000 },
  { code: "SC", name: "South Carolina", avgAmount: 84000 },
  { code: "TN", name: "Tennessee", avgAmount: 81000 },
  { code: "UT", name: "Utah", avgAmount: 104000 },
  { code: "VA", name: "Virginia", avgAmount: 80000 },
  { code: "WA", name: "Washington", avgAmount: 104000 },
  { code: "WI", name: "Wisconsin", avgAmount: 61000 },
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

// Add debugging to getStateContent function
function getStateContent(region) {
  if (!region) {
    return null;
  }

  const normalizedRegion = region.trim().toUpperCase();

//   // Debug: log what we're trying to match
//   console.log(`[DEBUG] getStateContent:`, {
//     original: region,
//     normalized: normalizedRegion,
//     availableKeys: Object.keys(STATE_CONTENT).filter((key) => key.includes("MASS") || key === "MA"),
//   });

//   return STATE_CONTENT[normalizedRegion] || null;
// }

export default {
  async fetch(request, env, ctx) {
    const startTime = Date.now();
    const requestId = crypto.randomUUID();

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Handle error reporting endpoint
    if (request.url.includes("/log-error") && request.method === "POST") {
      try {
        const errorData = await request.json();
        console.error(`[CLIENT_ERROR] ${requestId}`, {
          timestamp: new Date().toISOString(),
          requestId,
          error: errorData.error,
          stack: errorData.stack,
          userAgent: request.headers.get("user-agent"),
          url: errorData.url,
          geo: {
            country: request.cf?.country,
            region: request.cf?.region,
            city: request.cf?.city,
          },
        });

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (e) {
        console.error(`[ERROR_ENDPOINT_FAIL] ${requestId}`, e);
        return new Response(JSON.stringify({ success: false }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }

    // Handle client logging endpoint
    if (request.url.includes("/log") && request.method === "POST") {
      try {
        const logData = await request.json();
        const logLevel = logData.level || "info";
        const logType = `[CLIENT_${logLevel.toUpperCase()}]`;

        console.log(`${logType} ${requestId}`, {
          timestamp: new Date().toISOString(),
          requestId,
          message: logData.message,
          data: logData.data,
          userAgent: request.headers.get("user-agent"),
          url: logData.url,
          geo: {
            country: request.cf?.country,
            region: request.cf?.region,
            city: request.cf?.city,
          },
        });

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (e) {
        console.error(`[LOG_ENDPOINT_FAIL] ${requestId}`, e);
        return new Response(JSON.stringify({ success: false }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }

    // Get geo information from the request
    const cf = request.cf;

    // Log incoming request details
    console.log(`[REQUEST] ${requestId}`, {
      timestamp: new Date().toISOString(),
      requestId,
      method: request.method,
      url: request.url,
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
      ip: request.headers.get("cf-connecting-ip"),
      country: cf?.country,
      region: cf?.region,
      city: cf?.city,
      postalCode: cf?.postalCode,
      timezone: cf?.timezone,
      continent: cf?.continent,
      asn: cf?.asn,
      colo: cf?.colo,
    });

    const stateContent = cf?.country === "US" ? getStateContent(cf?.region) : null;

    // Log state matching results
    console.log(`[STATE_MATCH] ${requestId}`, {
      timestamp: new Date().toISOString(),
      requestId,
      country: cf?.country,
      originalRegion: cf?.region,
      matchedState: stateContent?.name ?? "None",
      matchedCode: stateContent?.code ?? "None",
      hasCustomContent: !!stateContent,
      processingTimeMs: Date.now() - startTime,
    });

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

    // Log response details
    console.log(`[RESPONSE] ${requestId}`, {
      timestamp: new Date().toISOString(),
      requestId,
      hasHeadline: !!response.headline,
      hasAvgHeadline: !!response.avgHeadline,
      hasFootnote: !!response.footnote,
      stateServed: response.stateName ?? "Default",
      totalTimeMs: Date.now() - startTime,
    });

    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "max-age=3600",
        "X-Request-Id": requestId,
      },
    });
  },
};
