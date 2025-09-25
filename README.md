# Geo IP Landing Page

Geo-location detection service using Cloudflare Workers to dynamically personalize landing page content based on visitor's US state location.

## Usage

### Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start local development (http://localhost:8787)
npm run deploy       # Deploy to Cloudflare Workers
```

### Integration Steps

1. **Deploy Worker**: Run `npm run deploy` to deploy the geo-detection service
2. **Update Client URL**: Edit `WORKER_URL` in `client.js` with your deployed worker URL
3. **Add to Webflow**: Copy `client.js` contents to your site's custom code section
4. **Configure Selectors**: Update DOM selectors in client.js as needed

## Architecture

- **worker.js**: Cloudflare Worker handling geo-detection via `request.cf.region` API
- **client.js**: Browser script (IIFE pattern) that fetches location and updates DOM
- **wrangler.toml**: Worker configuration (name: geo-ip-detector)

## Environment Variables

No environment variables required. Configuration is handled through:
- `WORKER_URL` constant in client.js (must be updated post-deployment)
- DOM selectors in client.js for targeting page elements

## Assumptions & Trade-offs

- **Assumptions**: Cloudflare's geo-detection is accurate; visitor allows cross-origin requests
- **Trade-offs**: Client-side rendering may cause brief flash of default content
- **Limitations**: US states only; requires Cloudflare Workers; 1-hour cache may delay updates

## Monitoring

- **Development**: `npm run dev` provides local logs at http://localhost:8787
- **Production**: `wrangler tail` streams live logs from deployed worker
- **Client Logs**: Errors sent to worker's `/log` endpoint (silent fail on logging errors)

## Customization

- **Headlines**: Edit state content mappings in `worker.js` (lines 45-56)
- **Target Elements**: Update selectors in `client.js` (lines 3-7)
- **Cache Duration**: Modify `max-age` in worker.js response headers (default: 3600s)
