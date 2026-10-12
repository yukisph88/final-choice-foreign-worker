# Final Choice: Foreign Worker Landing Page

Static landing page for **Agensi Pekerjaan Final Choice Sdn Bhd** (201201028954 (1013441-H), JTKSM 483 Category C).
It uses plain HTML, CSS and JavaScript. There is no Node.js, npm, build step or database.

- **Repository:** https://github.com/yukisph88/final-choice-foreign-worker
- **Test site (GitHub Pages):** https://yukisph88.github.io/final-choice-foreign-worker/

```
final-choice-foreign-worker/
├── index.html            ← landing page (copy, SEO, structured data)
├── styles.css            ← styling (brand colours in :root)
├── script.js             ← WhatsApp links, form → WhatsApp, call menu, tracking
├── privacy-policy.html   ← DRAFT privacy notice (needs approval)
├── 404.html              ← not-found page
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── favicon/            ← favicon-48.png, icon-192.png, apple-touch-icon.png (mascot face)
│   └── images/
│       ├── logo-final-choice.webp / .png        ← official full logo (footer, hero card, licence card)
│       ├── logo-final-choice-mark.webp / .png   ← mascot + wordmark crop (header)
│       ├── hero-foreign-workers-1200/800.webp   ← hero photo (4:3)
│       ├── sector-*-photo-1280/640.webp (6)     ← sector photos (2:1)
│       └── og-image.jpg                         ← 1200×630 social share image
├── README.md             ← this file (optional in the repo)
└── LAUNCH-CHECKLIST.md   ← status / remaining items (optional in the repo)
```

All page paths are **relative** (`styles.css`, `assets/...`), so the site works at the project URL `/final-choice-foreign-worker/`. The only exception is `404.html`, which uses `/final-choice-foreign-worker/...` because GitHub can serve it from any URL depth.

---

## 1. Contact details used

| Item | Value | Link format |
|---|---|---|
| Main WhatsApp (all enquiry buttons) | 011-1852 3311 | `https://wa.me/601118523311?text=…` |
| Jackie | 011-3855 0000 | `tel:+601138550000` |
| Yuki | +6017-321 1887 | `tel:+60173211887` |
| Email | apfinalchoice@gmail.com | `mailto:` |
| Office | No. 58, Jalan Mutiara Barat 6, Taman Mutiara Barat, 56000 Kuala Lumpur, Malaysia | Google Maps search link |
| Hours | Mon–Fri 9:00 AM–6:00 PM · Sat 9:00 AM–1:00 PM | also in structured data |

- To change the WhatsApp number, edit `CONFIG.whatsappNumber` in `script.js` **and** search index.html / 404.html / privacy-policy.html for `601118523311` and `011-1852 3311`.
- Every "Call" / "Call Us" button opens a small menu with Jackie and Yuki. Without JavaScript, it jumps to the contact section.

## 2. Enquiry form

There is no backend. Pressing **Send Enquiry via WhatsApp**:
1. validates the required fields;
2. builds a message (name, company, mobile, email, location, sector, workers, position, stage, message), leaving out optional fields that are empty;
3. opens `https://wa.me/601118523311?text=<encodeURIComponent(message)>`;
4. tells the visitor to press **Send** in WhatsApp. No "received" message is shown, and the form is not cleared.

Optional, later: if an online form service is connected, set `CONFIG.formEndpoint` in `script.js`. The success message then appears only if that service confirms receipt.

---

## 3. Upload to GitHub and turn on GitHub Pages

### First upload
1. Open https://github.com/yukisph88/final-choice-foreign-worker and sign in as **yukisph88**.
2. Click **Add file → Upload files**. On an empty repository, click the **uploading an existing file** link instead.
3. Open this project folder in Windows Explorer and select **everything inside it**: `index.html`, `styles.css`, `script.js`, `privacy-policy.html`, `404.html`, `robots.txt`, `sitemap.xml`, the **`assets`** folder, and optionally `README.md` and `LAUNCH-CHECKLIST.md`. Drag them onto the GitHub upload area.
   - Drag the files themselves, **not** the outer folder. `index.html` must sit at the top level of the repository.
   - Make sure the `assets` folder uploads with its sub-folders (`favicon/`, `images/`).
4. Under **Commit changes**, type a message such as `Initial upload of landing page`. Keep **Commit directly to the main branch** selected, then click **Commit changes**.
5. Check the repository's main page: `index.html` and the `assets` folder should be listed at the top level.

### Turn on GitHub Pages
6. In the repository, click **Settings** (top tab), then **Pages** (left sidebar).
7. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
8. Under **Branch**, choose **main** and folder **/ (root)**, then click **Save**.
9. Wait 1–3 minutes. To watch progress, open the **Actions** tab and wait for the "pages build and deployment" run to show a green tick.
10. Go back to **Settings → Pages**. The banner shows **"Your site is live at https://yukisph88.github.io/final-choice-foreign-worker/"**. Click **Visit site**.

> GitHub Pages is free for **public** repositories. If the repository is private and Pages won't turn on, either make it public (**Settings → General → Danger Zone → Change visibility**) or use a paid GitHub plan.

### Test the live site
- **Desktop:** open the URL in Chrome or Edge.
  - Click **WhatsApp Our Team**. WhatsApp Web should open a chat with 011-1852 3311 and the prefilled message.
  - Click a sector button (e.g. **Manufacturing Enquiry**) and check that the message mentions that sector.
  - Fill in the enquiry form and press **Send Enquiry via WhatsApp**. Check that all your details appear in the WhatsApp message.
  - Open **Privacy Policy** in the footer.
- **Mobile:** open the same URL on a phone.
  - The bottom bar should show **WhatsApp | Call | Enquire**.
  - **Call** should open the Jackie/Yuki menu, and tapping a name should start a call.
  - The ☰ menu should open and close.
  - The page should not scroll sideways.
- Open an address that doesn't exist, e.g. `https://yukisph88.github.io/final-choice-foreign-worker/test-404`. You should see the custom "Page not found" page.

### Update the site later
1. In the repository, click **Add file → Upload files**.
2. Drag in the changed file(s), using the same names and folders. GitHub replaces the old versions.
3. Write a commit message (e.g. `Update office hours`) and click **Commit changes**.
4. Wait 1–3 minutes, then refresh the live site. If you still see the old version, do a hard refresh (**Ctrl + F5**).

To edit a single file directly instead, open it on GitHub, click the ✏️ pencil icon, make the change, then click **Commit changes**.

---

## 4. Canonical URL: test now, final domain later

While testing, the page uses the GitHub Pages address everywhere a full URL is required, so there are no conflicting canonicals.

| File | Line(s) currently using the test URL |
|---|---|
| `index.html` | `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, all JSON-LD `@id` / `url` / `image` values (search for `yukisph88.github.io`) |
| `sitemap.xml` | `<loc>` |
| `robots.txt` | `Sitemap:` line |
| `404.html` | the 2 lines marked `<!-- change later -->` (`/final-choice-foreign-worker/` → `/`) |

**When the final company domain is ready** (`[CANONICAL_DOMAIN]`):
1. Replace every `https://yukisph88.github.io/final-choice-foreign-worker/` with `https://[CANONICAL_DOMAIN]/` in index.html, sitemap.xml and robots.txt.
2. In 404.html, change `/final-choice-foreign-worker/` to `/`.
3. To keep using GitHub Pages:
   - add the domain under **Settings → Pages → Custom domain**;
   - set up the DNS records GitHub shows you;
   - tick **Enforce HTTPS**.

   GitHub then redirects the old github.io address to the new domain automatically, so the test URL won't compete with the real one.
4. Add the new domain as a **separate** property in Google Search Console (section 5) and submit its sitemap.

Note: `robots.txt` is only read at the root of a host. On `yukisph88.github.io/final-choice-foreign-worker/`, search engines ignore it, which is why you submit the sitemap directly in Search Console. It starts working once the site is on its own domain.

---

## 5. Google Search Console (after the site is live)

1. Go to https://search.google.com/search-console and sign in with the company Google account.
2. Click **Add property** (top-left property menu), then choose **URL prefix**. Enter `https://yukisph88.github.io/final-choice-foreign-worker/` and click **Continue**.
3. **Verify ownership** using the **HTML tag** method:
   - Copy the tag Google shows, e.g. `<meta name="google-site-verification" content="abc123…">`.
   - In `index.html`, find the commented line `<meta name="google-site-verification" content="[GSC_VERIFICATION_CODE]">`. Replace it with Google's tag and remove the `<!--` and `-->` around it.
   - Upload the updated `index.html` to GitHub (section 3, "Update the site later") and wait 1–3 minutes.
   - Back in Search Console, click **Verify**.
4. **Submit the sitemap:** left menu → **Sitemaps** → enter `sitemap.xml` → **Submit**.
5. **Request indexing:** in the top search bar (**URL inspection**), paste `https://yukisph88.github.io/final-choice-foreign-worker/`, then click **Request indexing**.
6. **Later:** when the final company domain is connected, add it as a **new, separate property**. Use a **Domain** property verified by DNS if possible. Then submit `https://[CANONICAL_DOMAIN]/sitemap.xml` and request indexing again.

---

## 6. Google Analytics 4 (optional, later)

1. Create a GA4 property at https://analytics.google.com and copy the **Measurement ID** (`G-…`).
2. In `index.html`, find the block marked **`>>> GOOGLE ANALYTICS 4`**. Replace `G-XXXXXXXXXX` in **both** places, then remove the comment markers around that `<script>` block.
3. Upload the updated `index.html`.

The page already pushes these events (they reach GA4 automatically once it's installed, and nothing breaks without it):

| Event | Fired when | Extra info |
|---|---|---|
| `whatsapp_click` | any WhatsApp button | `label` = which button |
| `phone_click` | a Jackie or Yuki number is tapped | `contact` = `jackie` / `yuki` |
| `call_menu_open` | a "Call" button opens the menu | `label` |
| `form_whatsapp_handoff` | the enquiry form opens WhatsApp | `sector`, `application_stage` |
| `sector_enquiry` | a sector WhatsApp button | `label` = sector |
| `checklist_click` | "Request Document Checklist" | – |
| `email_click`, `maps_click`, `cta_click` | other CTAs | `label` |

In GA4, mark `whatsapp_click`, `phone_click` and `form_whatsapp_handoff` as **key events**. If you add GA4, also update section 10 of the privacy policy.

---

## 7. Editing tips

- **Logo:** the official logo is in `assets/images/`. To update it, replace `logo-final-choice.webp/.png` (full logo, 720×537) and `logo-final-choice-mark.webp/.png` (header crop, 320×196) with files of the same names and proportions.
- **Photos:** the hero and sector photos are licensed stock (see "Image credits" below), cropped, colour-graded toward the brand blues and exported as WebP. To replace one, export the same two sizes with the same file names: hero 1200×900 and 800×600, sectors 1280×640 and 640×320. Then update the `alt` text in index.html. Use only photos you own or have licensed, and avoid anything that suggests government endorsement.
- **Colours:** the palette comes from the logo (navy `#0a1a5c`, brand blue `#0162c7`, sky `#30aced`). Change it only in the `:root` block of `styles.css`.
- **FAQ:** if you change an answer, update the same text in the FAQPage JSON-LD in `<head>`.
- **Future pages** (e.g. `/fwcms-application/`): create a folder with its own `index.html`, use `../styles.css` and `../assets/...` paths, add it to `sitemap.xml`, and uncomment the footer "Guides" block, changing its links to relative paths.

---

## 8. Image credits and licence

All photos are from **Pexels** and used under the [Pexels License](https://www.pexels.com/license/): free for commercial use, attribution not required (credited here as good practice). The licence does not allow implying that the people shown endorse the business, so do not caption them as Final Choice clients or workers.

| File | Source |
|---|---|
| hero-foreign-workers-*.webp | https://www.pexels.com/photo/workers-having-a-break-20541452/ |
| sector-construction-photo-*.webp | https://www.pexels.com/photo/construction-workers-standing-and-sitting-20452662/ |
| sector-manufacturing-photo-*.webp | https://www.pexels.com/photo/female-factory-worker-operating-textile-machinery-31336008/ |
| sector-services-photo-*.webp | https://www.pexels.com/photo/two-women-fixing-a-bed-together-9462745/ |
| sector-plantation-photo-*.webp | https://www.pexels.com/photo/farmers-working-on-green-field-11196885/ |
| sector-agriculture-photo-*.webp | https://www.pexels.com/photo/workers-on-rice-field-5505643/ |
| sector-mining-photo-*.webp | https://www.pexels.com/photo/workers-operating-machinery-in-white-quarry-37923718/ |

The logo, favicon and social share image are Final Choice's own artwork.
