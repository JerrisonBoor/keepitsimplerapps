# Keep It Simpler (`keepitsimpler.app`)

A mobile-first, high-performance prelaunch website for **Keep It Simpler**, a family of Android apps that use built-in AI to make everyday tracking simpler and affordable.

Built with [Astro 5](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com), engineered for static deployment on **Cloudflare Pages**.

---

## 📱 Routes & Pages

- **`/` (Homepage)** — “Everyday tracking made simpler with AI.”
  - Overview of the product family
  - Product cards for *The Simpler Budget* and *The Simpler Nutrition Tracker*
  - “AI for the tedious parts.” architectural philosophy section
  - Prelaunch email signup with multi-app selection and optional beta testing interest
- **`/budget` (The Simpler Budget)** — “Know where your money goes.”
  - Purchase logging walkthrough: voice note (`"I spent $12.50 on lunch at Panera"`), review step, and instant digital envelope balance deduction
  - Receipt scan example and introduction to digital envelopes (`Groceries`, `Dining Out`, `Gas`)
  - Free and Plus planned tier comparison
  - Interactive FAQ covering bank connections, manual entry, editing AI drafts, and device compatibility
- **`/nutrition` (The Simpler Nutrition Tracker)** — “Log a meal by saying what you ate.”
  - Voice meal description walkthrough: (`"Three eggs, a New York strip steak, and two slices of sourdough"`)
  - Itemized food breakdown with editable macro estimates (labeled as estimates)
  - Instant review or draft for later queue
  - On-device daily meal history showcase
  - Interactive FAQ covering voice logging, editing estimates, local storage, and device compatibility
- **`/privacy` (Privacy Notice)** — Full transparency on how signup emails are handled separately from on-device local app data.

---

## 🚀 Cloudflare Pages Deployment

### Option 1: Git Integration (Recommended)
1. Push this repository to GitHub or GitLab.
2. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** &gt; **Create application** &gt; **Pages** &gt; **Connect to Git**.
3. Select your repository and configure build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Deploy site.
5. In **Custom domains**, add `keepitsimpler.app` and `www.keepitsimpler.app`.

### Option 2: Wrangler CLI
```bash
npx wrangler pages deploy dist --project-name keepitsimplerapps
```

---

## 📬 Prelaunch Signup Backend (`/api/signup`)

The prelaunch signup form connects to `functions/api/signup.ts` (Cloudflare Pages Function).

### How to configure a backend storage or notifications:

1. **Cloudflare KV (Zero maintenance database):**
   - Run `npx wrangler kv namespace create SIGNUPS_KV`
   - In `wrangler.toml` or Cloudflare Pages Dashboard &gt; Settings &gt; Functions &gt; KV namespace bindings, bind `SIGNUPS_KV`.
   - All submitted emails, selected apps, and beta interest flags are automatically stored with timestamps.

2. **Webhook (Slack, Discord, Zapier, Make, Formspree):**
   - In Cloudflare Pages Dashboard &gt; Settings &gt; Environment Variables, add:
     - `SIGNUP_WEBHOOK_URL` = `https://your-webhook-endpoint`
   - The function forwards every submission directly to your webhook.

3. **Client-side Local Fallback:**
   - When developing locally without Cloudflare Workers KV, submissions are stored gracefully in browser `localStorage` under `kis_signups` and display the confirmation UI.

---

## 🎨 Design System & Customization

- **Typeface**: [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) loaded from Google Fonts with standard system fallbacks.
- **Color Palette**:
  - Warm Canvas: `#FAF8F5`, `#F3EFE8`, `#FFFFFF`
  - Text: `#1C1917` (primary), `#57534E` (secondary)
  - Budget Accent: `#2D6A4F` (muted forest green), `#E8F3ED` (badge), `#B7DAC7` (border)
  - Nutrition Accent: `#D96528` (warm amber/orange), `#FDF0E9` (badge), `#F6CEB9` (border)
- **Adding New Apps**:
  - Open `src/data/apps.ts`.
  - Add an entry to the `APPS` array with `name`, `slug`, `headline`, `supportingCopy`, `accentClass`, `features`, and `faq`.
  - The site architecture automatically scales to support more apps in the family.
- **Replacing Mockups with Production Screenshots**:
  - Replace the component in `src/components/BudgetPreview.astro` or `src/components/NutritionPreview.astro` with an `<img>` tag wrapped in the `<AndroidFrame>` container.

---

## 🛠️ Development Commands

```bash
# Start background development server
astro dev --background

# Check status or stop
astro dev status
astro dev stop

# Build production static bundle and sitemap
npm run build

# Run automated copy, SEO, and route verification
npm run verify
```
