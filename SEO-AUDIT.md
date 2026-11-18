# Final SEO audit report

Automated checks run with `python3 audit.py .` against the built site, served locally and driven by headless Chromium (mobile viewport 375 px). Result: **135 checks passed, 0 failed.**

## Completed (verified by the audit)
- **Metadata, all 16 public pages:** unique title (20–65 chars) and description (70–160 chars), one H1, no skipped heading levels, canonical equal to og:url, Open Graph and Twitter tags, WebPage and BreadcrumbList JSON-LD (valid JSON), visible breadcrumbs. Homepage also has WebSite and Organization data.
- **Indexing:** all 16 public pages are `index, follow`. Only `404.html` is `noindex`, with no canonical and no sitemap entry. No page contains an accidental noindex.
- **sitemap.xml:** valid XML, 16 unique HTTPS URLs, exactly matching the indexable page set.
- **robots.txt:** no Disallow rules; `OAI-SearchBot` explicitly allowed and kept separate from GPTBot; sitemap URL declared.
- **Links:** all 21 distinct internal links and assets return 200; every page is reachable from the nav, footer and sitemap.
- **HTTPS:** all canonicals, OG URLs, schema and sitemap use https; no http:// resources; HSTS header in `vercel.json`.
- **JavaScript:** syntax check passes; no JS or console errors on any page in a mobile browser.
- **Calculator accuracy:** 11 cases pass, including the 18.5, 24.9, 25.0 and 30.0 boundaries, imperial input, healthy-range output, rejection of blank, negative, zero, oversized and overflow inputs, Reset, and the aria-live result region.
- **Mobile and accessibility:** no horizontal overflow on any page at 375 px; menu and theme toggle work; text, link, button and error contrast is at least 5.2:1 in light and 6.5:1 in dark.
- **Speed (local measurement only):** CLS 0.000 and LCP about 100 ms on an unthrottled local server; CSS, JS and homepage HTML total about 25 KB. No images on pages, no web fonts, no third-party scripts.
- **Integrations prepared:** Google and Bing verification meta tags and GA4 are driven by `GSC_TOKEN`, `BING_TOKEN` and `GA_ID` in `build.py`. They add nothing while empty (checked), inject correctly when set (tested with dummy values in a temp build), and `GA_ID` is rejected unless it looks like `G-XXXXXXXXXX`. The privacy policy adds an Analytics section automatically when GA4 is on.
- **Instructions:** see `SEO-SETUP.md`.

## Pending: needs you
1. Set `SITE` to your real domain, rebuild, deploy. Until then canonicals and the sitemap point to the placeholder `yourdomain.com`.
2. Create the `` mailbox or change `EMAIL` in `build.py`.
3. Replace `assets/img/og-image.png` with a designed 1200×630 image.

## Manual account steps (cannot be done from code)
- Verify the site in **Google Search Console**, submit the sitemap, and use URL Inspection → Request indexing for key pages.
- Verify in **Bing Webmaster Tools** and submit the sitemap.
- Create a **GA4** property, paste the real Measurement ID, then confirm hits in Realtime. Add a consent banner if you serve regions that require one.
- Run **PageSpeed Insights** on the live URL. I could not run it here (no internet access), so the speed figures above are local only and not a PSI score.
- Confirm HTTPS and the www/non-www redirect on your live Vercel domain.
- Not applicable: **Google Business Profile**, because this is an online-only site with no physical premises.

## Caveats
Indexing, rankings and ChatGPT search appearance are not guaranteed by any of this. The audit checks the code, not Google's behaviour.
