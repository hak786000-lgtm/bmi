# SEO and search-visibility setup

All settings live at the top of `build.py`. After changing anything, run `python3 build.py project` (or your output folder) and redeploy. Nothing below guarantees indexing, rankings or AI-search appearance.

## 0. Settings
- `SITE`: your final HTTPS domain, e.g. `https://example.com`. Pick **www or non-www** and use it everywhere. In Vercel, set the other one to redirect to it.
- `GSC_TOKEN`, `BING_TOKEN`, `GA_ID`: leave empty until you have real values. Empty values add nothing to the pages.

## 1. Indexing directives
Every public page has `index, follow, max-image-preview:large`. Only `404.html` is `noindex`, and it is not in the sitemap. `robots.txt` blocks nothing.

## 2. Google Search Console (verification)
1. Open search.google.com/search-console and click Add property → **URL prefix**, enter `https://yourdomain.com/`.
2. Choose the **HTML tag** method. Copy only the `content` value from `<meta name="google-site-verification" content="...">`.
3. Paste it into `GSC_TOKEN` in `build.py`, rebuild, deploy, then click Verify. Keep the tag in place permanently.
(A Domain property instead verifies with a DNS TXT record at your registrar and needs no tag.)

## 3. Sitemap
`sitemap.xml` is generated from the page list, so it only contains canonical, indexable URLs. To add a page: add a `page(...)` entry in `build.py`, link it from the nav or related links, rebuild, redeploy, and resubmit the sitemap if needed. In Search Console: Sitemaps → enter `sitemap.xml` → Submit.

## 4. Requesting indexing (Google)
Search Console → URL Inspection → paste a page URL → if it says "URL is not on Google", click **Request indexing**. Start with the homepage and the calculator. Daily quotas apply, and indexing can take days or weeks and is never guaranteed. Check Pages → Indexing to see why any page is excluded.

## 5. Bing Webmaster Tools
1. At bing.com/webmasters, add your site. You can import it from Search Console, or verify with the meta tag: copy the `content` value of `msvalidate.01` into `BING_TOKEN`, rebuild, deploy and verify.
2. Sitemaps → Submit sitemap → `https://yourdomain.com/sitemap.xml`.
3. Optionally use URL Submission for key pages.

## 6. Google Analytics 4
1. At analytics.google.com create a property and a **Web data stream** for your domain.
2. Copy the Measurement ID (format `G-XXXXXXXXXX`) into `GA_ID`, rebuild and deploy. The standard gtag snippet is then added to every page, and the privacy policy gains an Analytics section automatically.
3. Check Reports → Realtime while visiting your site. Link GA4 to Search Console under Admin → Product links.
4. If you serve visitors in regions that require cookie consent (EU, UK and others), add a consent banner before enabling analytics. Take legal advice on this.

## 7. Google Business Profile
Not applicable. This is an online information site with no physical premises or in-person customer service, so it is not eligible. Do not create a profile with invented address details.

## 8. HTTPS
Vercel issues certificates and redirects HTTP to HTTPS automatically. All canonicals, Open Graph URLs, schema and the sitemap use `https://`. No resource is loaded over HTTP. `vercel.json` also sends an HSTS header.

## 9. Page speed
Test the live URL at pagespeed.web.dev for mobile and desktop and review the Core Web Vitals report in Search Console after a few weeks. The site has no images on pages, no web fonts, minified CSS and about 5 KB of deferred JavaScript (plus GA4 only if you enable it).

## 10. ChatGPT search
`robots.txt` explicitly allows **OAI-SearchBot**, the crawler for ChatGPT search results. It is separate from **GPTBot** (model training), and this file makes no rule about GPTBot. Allowing the crawler does not guarantee your pages will appear in ChatGPT search. Robots changes can take time to be picked up.
