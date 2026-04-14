# Jake Fruge Jr Grant — Site Plan

**Domain:** jakefrugejrgrant.com
**Target Keyword:** Jake Fruge Jr
**Site Type:** Grant site (ORM campaign)
**Design System:** "Legacy & Light" (Navy + Gold + Cream)
**Tech Stack:** React 18 + Vite + TypeScript + Tailwind CSS v4 + React Router DOM v7 + React Helmet Async + GSAP ScrollTrigger
**Deployment:** Netlify (static hosting via GitHub)
**GitHub Repo:** havijavi/jakefrugegrant

---

## Grant Details

| Detail | Value |
|--------|-------|
| Name | Jake Fruge Jr Grant |
| Amount | $1,000 |
| Frequency | Annual (one recipient per year) |
| Eligibility | Any student enrolled at any US-based accredited college/university, graduate or undergraduate, any faculty |
| GPA requirement | None |
| Essay requirement | None |
| Application deadline | August 15, 2026 |
| Winner announcement | August 30, 2026 |

---

## Differentiation from Scholarship Site

The **grant** site uses different messaging, tone, and framing than the scholarship site:

| Aspect | Scholarship Site | Grant Site |
|--------|-----------------|------------|
| **Core Theme** | Academic merit & opportunity | Empowerment & entrepreneurial spirit |
| **Tone** | Encouraging, aspirational | Bold, action-oriented, forward-looking |
| **Tagline** | "Investing in Tomorrow's Leaders" | "Fueling the Next Generation of Doers" |
| **Founder Framing** | Philanthropist who gives back | Self-made entrepreneur who invests in potential |
| **Eligibility Angle** | Open access, no barriers | Removing financial roadblocks for driven students |
| **CTA Language** | "Apply for the Scholarship" | "Claim Your Grant" / "Apply for the Grant" |
| **Mission Focus** | Education access | Bridging the gap between ambition and resources |
| **Blog Topics** | Education, fair shot, success lessons | Entrepreneurship, resilience, financial literacy |

---

## Page Architecture (7 Pages)

| # | Page | Route | Description |
|---|------|-------|-------------|
| 1 | Home | `/` | Hero, grant overview, at-a-glance table, founder intro, how to apply steps, mission statement, CTA banner |
| 2 | About the Founder | `/about` | Jake Fruge Jr's full story — early life, turning point, JFJ Holdings, why he created the grant, achievements table, social links |
| 3 | Eligibility & Details | `/eligibility` | 5 eligibility requirements, summary table, 2026 timeline, selection criteria |
| 4 | Application | `/apply` | Full 14-field application form with validation |
| 5 | FAQ | `/faq` | 14 accordion Q&As with FAQPage schema markup |
| 6 | Blog | `/blog` + `/blog/:slug` | WordPress-powered with 2 fallback articles |
| 7 | Contact | `/contact` | Contact form, email, social links |

---

## Image Plan

### Real Photos (from user — optimize to WebP)
1. `jake-headshot-black.webp` — Headshot in black jacket (circular crop)
2. `jake-white-hoodie.webp` — Casual photo in white hoodie
3. `jake-forbes-suit.webp` — Professional photo in blue suit
4. `jake-team-photo.webp` — Team/friends photo
5. `jake-ebook-cover.webp` — Book cover image

### AI-Generated Images (to be created)
1. `hero-grant.webp` — University campus with golden hour lighting, books/graduation elements
2. `campus-students.webp` — Diverse group of students collaborating
3. `application-desk.webp` — Study workspace with laptop and notebook
4. `blog-hero.webp` — Abstract knowledge/growth themed image
5. `blog-entrepreneurship.webp` — Entrepreneurship themed blog image
6. `blog-resilience.webp` — Resilience/overcoming obstacles themed blog image
7. `contact-hero.webp` — Professional communication themed image

---

## SEO Strategy

- **Primary keyword:** Jake Fruge Jr (target 30-50 natural mentions across all pages)
- **Secondary keywords:** Jake Fruge Jr Grant, Jake Fruge Grant, Jake Fruge Jr education, Jake Fruge Jr entrepreneur
- **Full name in:** every H2 heading, all image alt text, footer bio paragraph
- **Schema types:** Person, Organization (JFJ Holdings), WebSite, Article, FAQPage
- **sameAs array:** All domains + social profiles for Knowledge Panel cross-linking

### sameAs Links
- https://www.jakefrugejr.com
- https://jakefrugejr.org
- https://jakefrugejrscholarship.com
- https://jakefrugejrgrant.com
- https://www.instagram.com/jakefrugejr
- https://www.facebook.com/jakefrugejr
- https://www.linkedin.com/in/jakefrugejr
- https://www.youtube.com/@jakefrugejr
- https://www.tiktok.com/@jakefrugejr

---

## WordPress Blog Integration

- WordPress path: `/blog` (to be installed at jakefrugejrgrant.com/blog on SiteGround)
- WP_API_BASE production: `/blog/wp-json/wp/v2`
- Netlify proxy: `/blog/*` → `https://jakefrugejrgrant.com/blog/:splat`
- Fallback posts: 2 hardcoded articles (entrepreneurship & resilience themed)
- Author name override: display as "Jake Fruge Jr Grant"
