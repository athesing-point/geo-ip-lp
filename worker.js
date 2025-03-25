// US State Headlines
const STATE_HEADLINES = {
  AL: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Alabama home equity.</span>',
  AK: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Alaska home equity.</span>',
  AZ: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Arizona home equity.</span>',
  AR: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Arkansas home equity.</span>',
  CA: 'Get up to $500k<br>from your <span class="headline-underline-decoration">California home equity.</span>',
  CO: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Colorado home equity.</span>',
  CT: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Connecticut home equity.</span>',
  DE: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Delaware home equity.</span>',
  FL: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Florida home equity.</span>',
  GA: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Georgia home equity.</span>',
  HI: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Hawaii home equity.</span>',
  ID: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Idaho home equity.</span>',
  IL: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Illinois home equity.</span>',
  IN: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Indiana home equity.</span>',
  IA: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Iowa home equity.</span>',
  KS: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Kansas home equity.</span>',
  KY: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Kentucky home equity.</span>',
  LA: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Louisiana home equity.</span>',
  ME: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Maine home equity.</span>',
  MD: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Maryland home equity.</span>',
  MA: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Massachusetts home equity.</span>',
  MI: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Michigan home equity.</span>',
  MN: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Minnesota home equity.</span>',
  MS: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Mississippi home equity.</span>',
  MO: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Missouri home equity.</span>',
  MT: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Montana home equity.</span>',
  NE: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Nebraska home equity.</span>',
  NV: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Nevada home equity.</span>',
  NH: 'Get up to $500k<br>from your <span class="headline-underline-decoration">New Hampshire home equity.</span>',
  NJ: 'Get up to $500k<br>from your <span class="headline-underline-decoration">New Jersey home equity.</span>',
  NM: 'Get up to $500k<br>from your <span class="headline-underline-decoration">New Mexico home equity.</span>',
  NY: 'Get up to $500k<br>from your <span class="headline-underline-decoration">New York home equity.</span>',
  NC: 'Get up to $500k<br>from your <span class="headline-underline-decoration">North Carolina home equity.</span>',
  ND: 'Get up to $500k<br>from your <span class="headline-underline-decoration">North Dakota home equity.</span>',
  OH: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Ohio home equity.</span>',
  OK: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Oklahoma home equity.</span>',
  OR: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Oregon home equity.</span>',
  PA: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Pennsylvania home equity.</span>',
  RI: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Rhode Island home equity.</span>',
  SC: 'Get up to $500k<br>from your <span class="headline-underline-decoration">South Carolina home equity.</span>',
  SD: 'Get up to $500k<br>from your <span class="headline-underline-decoration">South Dakota home equity.</span>',
  TN: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Tennessee home equity.</span>',
  TX: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Texas home equity.</span>',
  UT: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Utah home equity.</span>',
  VT: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Vermont home equity.</span>',
  VA: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Virginia home equity.</span>',
  WA: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Washington home equity.</span>',
  WV: 'Get up to $500k<br>from your <span class="headline-underline-decoration">West Virginia home equity.</span>',
  WI: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Wisconsin home equity.</span>',
  WY: 'Get up to $500k<br>from your <span class="headline-underline-decoration">Wyoming home equity.</span>',
};

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

    const response = {
      // Only return a headline if it's a US state
      headline: cf?.country === "US" && cf?.region ? STATE_HEADLINES[cf.region] || null : null,
      country: cf?.country || "Unknown",
      region: cf?.region || "Unknown",
      city: cf?.city || "Unknown",
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
