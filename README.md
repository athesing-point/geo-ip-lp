# Geo IP Landing Page

Simple geo-detection system using Cloudflare Workers to update landing page content based on visitor location.

## Files

- `worker.js` - Cloudflare Worker that detects location
- `client.js` - Client-side code to update the page (add to Webflow)

## Development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

## Deployment

1. Deploy the worker:

```bash
npm run deploy
```

2. Copy `client.js` contents into your Webflow site's custom code section
3. Update the `WORKER_URL` in the pasted code to match your deployed worker URL

## Customization

- Edit headlines in `worker.js`
- Change target element in `client.js` by updating `HEADLINE_SELECTOR`
