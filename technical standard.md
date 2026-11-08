# WEBSITE ENGINEERING STANDARD
## SEO, GEO & AI-READY DEVELOPMENT

**Document Type:** Technical Requirements & SDLC Standard  
**Version:** 1.0  
**Status:** Proposed Standard  
**Applicable:** All Website Development Projects

---

# 1. PURPOSE & OBJECTIVES

## 1.1. Purpose

Establish a reusable technical and engineering standard to ensure that every website developed by the organization is optimized for:

- Search Engine Optimization (SEO).
- Generative Engine Optimization (GEO).
- Answer Engine Optimization (AEO).
- AI crawler accessibility and content discoverability.
- Website performance and Core Web Vitals.
- Accessibility and usability.
- Security, maintainability and scalability.

These requirements MUST be considered from the initial requirement analysis through architecture, development, testing, deployment and maintenance.

SEO/GEO MUST NOT be treated as post-development activities.

## 1.2. Primary Objectives

| Objective | Expected Result |
|---|---|
| Search discoverability | Search engines can discover and index relevant pages |
| AI discoverability | Supported AI crawlers can access permitted content |
| Content extractability | AI systems can understand and extract meaningful information |
| Entity recognition | Search engines can identify organizations, products and services |
| Performance | Website meets defined Core Web Vitals targets |
| Accessibility | Website follows WCAG 2.2 AA |
| Security | Website follows OWASP security recommendations |
| Maintainability | SEO/GEO capabilities are testable and maintainable |

## 1.3. Guiding Principles

1. Content MUST be accessible without requiring unnecessary client-side JavaScript execution.
2. Every indexable page MUST have a clear purpose and unique primary topic.
3. Structured data MUST accurately represent visible page content.
4. Website content MUST be organized around topics, entities and user search intent.
5. AI visibility MUST be measured independently from traditional SEO performance.
6. Automated SEO/GEO activities MUST NOT generate deceptive content, fake engagement or artificial backlinks.
7. All technical requirements MUST have measurable acceptance criteria.

---

# 2. SCOPE AND APPLICABILITY

## 2.1. Website Categories

The standard applies to:

- Corporate websites.
- Product and SaaS websites.
- E-commerce websites.
- Service-provider websites.
- News, blog and publishing websites.
- Landing pages.
- Knowledge bases and documentation websites.

## 2.2. Requirement Classification

Requirements are classified into three levels:

| Level | Definition |
|---|---|
| MUST | Mandatory requirement for production release |
| SHOULD | Strong recommendation; exceptions require documented approval |
| MAY | Optional capability depending on business requirements |

## 2.3. Implementation Profiles

| Profile | Required capabilities |
|---|---|
| Basic | Technical SEO, metadata, sitemap, performance, security |
| Standard | Basic + Structured Data, semantic content, internal linking, accessibility |
| Advanced | Standard + GEO, entity architecture, AI visibility measurement, multilingual optimization |

The project MUST select an implementation profile during requirement analysis.

---

# 3. TECHNICAL ARCHITECTURE REQUIREMENTS

## 3.1. Rendering Strategy

The architecture MUST ensure that search engines and supported crawlers can access meaningful page content.

Supported rendering strategies:

- Server-Side Rendering (SSR).
- Static Site Generation (SSG).
- Incremental Static Regeneration (ISR).
- Pre-rendered HTML.

Client-Side Rendering (CSR) MAY be used for interactive components but MUST NOT prevent discovery of primary content.

Requirements:

- Primary page content MUST be present in the initial HTML response or reliably pre-rendered.
- Page title, meta description and canonical URL MUST be available without requiring user interaction.
- Navigation links MUST use crawlable HTML anchors.
- Critical content MUST NOT depend on inaccessible JavaScript interactions.
- Hydration MUST NOT replace meaningful server-rendered content with incomplete content.

## 3.2. URL Architecture

URLs MUST:

- Be human-readable.
- Use lowercase characters.
- Use hyphens instead of spaces.
- Avoid unnecessary query parameters.
- Have a consistent trailing-slash policy.
- Represent the website information architecture.

Example:

/services/
/services/seo-consulting/
/blog/technical-seo-guide/
/products/product-name/

Every indexable URL MUST resolve to one canonical version.

## 3.3. Technical SEO Infrastructure

The following files and mechanisms MUST be implemented where applicable:

| Component | Requirement |
|---|---|
| robots.txt | Define crawler access policies |
| sitemap.xml | Expose canonical, indexable URLs |
| XML Sitemap Index | Required for large websites with multiple sitemap files |
| Canonical | Define preferred URL versions |
| HTTP status | Correct 200, 301, 404 and 410 responses |
| HTTPS | Mandatory |
| Hreflang | Required for applicable multilingual websites |
| Pagination | Crawlable and logically structured |
| Redirects | Avoid unnecessary redirect chains |
| Breadcrumbs | Recommended for hierarchical websites |

Sitemap entries MUST NOT include URLs that are intentionally blocked, non-canonical, redirected or marked noindex.

## 3.4. Robots and AI Crawlers

The project MUST define crawler access policies.

Relevant crawler identities include:

- Googlebot.
- Bingbot.
- GPTBot.
- OAI-SearchBot.
- ChatGPT-User.
- ClaudeBot.
- PerplexityBot.
- Google-Extended.

The project MUST distinguish between:

- Search indexing crawlers.
- AI model training crawlers.
- AI search and retrieval crawlers.
- User-triggered fetchers.

Crawler access MUST be configured according to business, legal and privacy requirements.

Blocking a crawler MUST NOT be assumed to improve SEO or GEO.

## 3.5. llms.txt

The project SHOULD evaluate the implementation of `/llms.txt`.

When implemented, it SHOULD contain:

- Website and organization identity.
- Description of business activities.
- Main product and service URLs.
- Important documentation URLs.
- Relevant knowledge resources.
- Content usage guidance.
- Links to authoritative website resources.

`llms.txt` MUST NOT be considered a replacement for robots.txt, sitemap.xml, semantic HTML or structured data.

Its presence does not guarantee indexing, ranking or AI citation.

---

# 4. SEMANTIC HTML AND ACCESSIBILITY

## 4.1. Semantic HTML

The website MUST use appropriate HTML5 semantic elements.

Examples:

- `<header>`
- `<nav>`
- `<main>`
- `<article>`
- `<section>`
- `<aside>`
- `<footer>`

Requirements:

- Each page MUST have one clear primary H1.
- Heading levels MUST follow a logical hierarchy.
- Headings MUST describe the actual section content.
- Images MUST have meaningful alt attributes where appropriate.
- Interactive elements MUST have accessible labels.
- Links MUST have meaningful anchor text.

## 4.2. Accessibility

The website SHOULD comply with WCAG 2.2 Level AA.

Mandatory testing areas:

- Keyboard navigation.
- Focus visibility.
- Color contrast.
- Form labels.
- Accessible error messages.
- Screen reader compatibility.
- Alternative text.
- Responsive layouts.
- Accessible menus and dialogs.

---

# 5. STRUCTURED DATA AND ENTITY ARCHITECTURE

## 5.1. Structured Data

JSON-LD SHOULD be the preferred structured data implementation format.

Relevant Schema.org types:

| Website Type | Recommended Schema |
|---|---|
| Corporate | Organization |
| Local Business | LocalBusiness |
| SaaS | SoftwareApplication |
| E-commerce | Product, Offer |
| Blog | Article, BlogPosting |
| Documentation | TechArticle |
| Service Provider | Service |
| Author | Person |
| Website | WebSite |
| Navigation | BreadcrumbList |
| FAQ content | FAQPage, where applicable |
| Video | VideoObject |
| Event | Event |

Schema MUST:

- Match the visible page content.
- Use accurate information.
- Avoid fabricated ratings or reviews.
- Avoid unsupported claims.
- Use stable entity identifiers through `@id` where appropriate.
- Be validated before production deployment.

FAQPage markup MUST NOT be implemented with the expectation of guaranteed Google FAQ rich results.

## 5.2. Entity Architecture

The website MUST define relevant business entities.

Examples:

- Organization.
- Brand.
- Product.
- Service.
- Person.
- Location.
- Industry.
- Technology.
- Customer case study.

Relationships SHOULD be represented consistently.

Example:

Organization → Brand → Product → Feature

Organization → Service → Industry → Case Study

Organization → Person → Author → Article

Entity references SHOULD remain consistent across:

- Website pages.
- Structured data.
- Social profiles.
- Business directories.
- External publications.

## 5.3. Entity Consistency

The following information SHOULD be consistent:

- Organization name.
- Official website.
- Logo.
- Business address.
- Contact information.
- Official social profiles.
- Product and service names.
- Author identity.

Conflicting business information MUST be investigated and corrected.

---

# 6. CONTENT ARCHITECTURE AND GEO REQUIREMENTS

## 6.1. Content Strategy

Content MUST be organized around user search intent and business objectives.

Each content page MUST define:

- Primary topic.
- Target audience.
- Search intent.
- Primary question.
- Supporting questions.
- Relevant entities.
- Conversion objective.
- Internal linking destinations.

## 6.2. Topic Cluster Architecture

The website SHOULD use a Pillar and Cluster architecture.

Example:

Pillar Page: Technical SEO

Supporting Pages:
- What is Technical SEO?
- Technical SEO Checklist.
- Website Crawlability.
- Structured Data.
- Core Web Vitals.
- JavaScript SEO.
- Technical SEO Tools.

Supporting pages SHOULD link to relevant pillar pages.

Internal links MUST be contextual and useful.

## 6.3. AI-Friendly Content Structure

Important content SHOULD follow an answer-first structure.

Recommended page structure:

1. Direct answer or definition.
2. Supporting explanation.
3. Detailed technical information.
4. Examples and use cases.
5. Comparison tables where useful.
6. Frequently asked questions.
7. References and sources.
8. Author and publication information.

Content SHOULD:

- Use clear and specific language.
- Provide factual information.
- Include measurable data when available.
- Cite reliable sources.
- Explain technical concepts.
- Distinguish facts, opinions and recommendations.
- Avoid unnecessary repetition.
- Include unique insights and first-party evidence.

## 6.4. Citation-Friendly Content

Important statements SHOULD be independently understandable.

Examples:

- Definitions.
- Technical specifications.
- Step-by-step procedures.
- Statistical findings.
- Product comparisons.
- Research findings.
- Expert explanations.

Claims MUST be supported by reliable evidence.

The website SHOULD identify:

- Author.
- Reviewer, when applicable.
- Original publication date.
- Last modified date.
- References.
- Relevant expertise.

## 6.5. Content Quality

Content MUST NOT be generated solely to manipulate search engines or AI systems.

AI-generated content MUST undergo editorial and factual review.

The project SHOULD prioritize:

- Original research.
- First-party experience.
- Case studies.
- Expert interviews.
- Unique datasets.
- Practical implementation guides.

---

# 7. EXTERNAL AUTHORITY AND BRAND VISIBILITY

## 7.1. External Authority

The marketing and SEO strategy SHOULD identify relevant external sources.

Examples:

- Industry publications.
- Professional communities.
- Reputable directories.
- Independent reviews.
- Educational resources.
- Relevant news publications.
- Industry associations.

## 7.2. Brand Mentions

Brand visibility SHOULD be monitored across:

- Search results.
- Industry websites.
- Community platforms.
- Review platforms.
- Social media.
- AI-generated answers.

The project MUST NOT use fake reviews, fabricated testimonials or deceptive backlinks.

## 7.3. Authority Measurement

Recommended metrics:

- Referring domains.
- Relevant backlinks.
- Brand mentions.
- Publisher citations.
- Review quality.
- Branded search volume.
- Competitor share of voice.

---

# 8. PERFORMANCE REQUIREMENTS

## 8.1. Core Web Vitals

The website SHOULD meet Google's Core Web Vitals thresholds at the 75th percentile of real-user visits.

| Metric | Target |
|---|---|
| LCP | ≤ 2.5 seconds |
| INP | ≤ 200 milliseconds |
| CLS | ≤ 0.1 |

## 8.2. Additional Performance Requirements

- Images SHOULD use modern formats such as WebP or AVIF.
- Images MUST define dimensions to reduce layout shifts.
- Lazy loading SHOULD be used for below-the-fold images.
- Critical resources SHOULD be prioritized.
- JavaScript bundles SHOULD be optimized.
- Unused CSS and JavaScript SHOULD be removed.
- CDN SHOULD be considered for global delivery.
- Caching policies MUST be defined.
- Third-party scripts MUST be monitored.

Performance MUST be measured on representative mobile and desktop pages.

---

# 9. SECURITY REQUIREMENTS

The project MUST follow OWASP security recommendations.

Required areas:

- HTTPS.
- Secure authentication.
- Authorization.
- Input validation.
- Output encoding.
- CSRF protection where applicable.
- XSS prevention.
- SQL injection prevention.
- Secure session management.
- Security headers.
- Dependency vulnerability scanning.
- Secrets management.
- Logging and monitoring.
- Backup and recovery.

Security testing SHOULD follow OWASP ASVS and the OWASP Top 10.

Security MUST NOT be weakened to improve crawler access.

---

# 10. AI VISIBILITY AND MEASUREMENT

## 10.1. AI Platforms

The project SHOULD monitor relevant AI platforms:

- ChatGPT Search.
- Google AI Overviews.
- Google AI Mode.
- Perplexity.
- Microsoft Copilot.
- Gemini.

Platform capabilities and citation availability MUST be verified before implementation.

## 10.2. Prompt Dataset

The project MUST maintain a representative set of business-related prompts.

Prompt categories:

| Category | Example |
|---|---|
| Informational | What is technical SEO? |
| Commercial | Best SEO agencies in Vietnam |
| Comparison | Compare SEO tools A and B |
| Transactional | Where can I purchase product X? |
| Brand | What does company X offer? |
| Local | Best service providers near location X |

Prompts SHOULD be maintained in Vietnamese and English when applicable.

## 10.3. AI Visibility KPIs

| KPI | Measurement |
|---|---|
| Brand Mention Rate | Percentage of prompts mentioning the brand |
| Citation Rate | Percentage of prompts citing the website |
| Share of Voice | Brand visibility relative to competitors |
| Citation URL Coverage | Number of unique website URLs cited |
| Answer Accuracy | Accuracy of brand and product information |
| AI Referral Traffic | Traffic from AI platforms |
| AI Conversion | Leads or transactions attributed to AI referrals |

AI results MUST be measured over time with consistent prompts, locations, languages and evaluation conditions.

AI citations MUST NOT be treated as guaranteed outcomes.

---

# 11. SDLC COMPLIANCE REQUIREMENTS

SEO/GEO requirements MUST be incorporated into every SDLC phase.

## Phase 1 – Requirement Analysis

Required activities:

- Define website category.
- Define target audience.
- Define search intent.
- Identify business entities.
- Define target keywords and topics.
- Define multilingual requirements.
- Define AI crawler policies.
- Define performance targets.
- Define accessibility requirements.
- Define SEO/GEO KPIs.

Deliverables:

- Business Requirements Document.
- SEO/GEO Requirements Specification.
- Keyword and Topic Map.
- Entity Inventory.
- Initial Acceptance Criteria.

## Phase 2 – Architecture and Design

Required activities:

- Design URL architecture.
- Define navigation and information architecture.
- Select rendering strategy.
- Define metadata architecture.
- Define structured data architecture.
- Design internal linking.
- Define sitemap generation.
- Define robots.txt policies.
- Define caching and CDN.
- Define security architecture.

Deliverables:

- Solution Architecture Document.
- URL Structure Specification.
- Wireframes.
- Schema Mapping.
- Technical SEO Design.
- Performance Design.

## Phase 3 – Development

Required activities:

- Implement semantic HTML.
- Implement SSR/SSG where appropriate.
- Implement metadata generation.
- Implement canonical URLs.
- Implement structured data.
- Implement sitemap generation.
- Implement robots.txt.
- Implement internal links.
- Implement responsive design.
- Implement security controls.

Development MUST follow approved technical specifications.

Deliverables:

- Source Code.
- Technical Documentation.
- Schema Implementation.
- Unit Tests.
- Build Artifacts.

## Phase 4 – Quality Assurance

Required testing:

- Functional testing.
- SEO testing.
- GEO content structure testing.
- Schema validation.
- Accessibility testing.
- Performance testing.
- Security testing.
- Responsive testing.
- Crawlability testing.

Deliverables:

- Test Cases.
- Test Execution Report.
- SEO/GEO Audit Report.
- Performance Report.
- Security Report.
- Defect List.

## Phase 5 – Deployment

Before production release:

- Verify HTTPS.
- Verify robots.txt.
- Verify sitemap.xml.
- Verify canonical URLs.
- Verify redirects.
- Verify metadata.
- Verify structured data.
- Verify indexing policies.
- Verify analytics.
- Verify production rendering.
- Verify AI crawler policies.

Deliverables:

- Deployment Checklist.
- Production Smoke Test.
- Release Approval.

## Phase 6 – Monitoring and Continuous Improvement

Required activities:

- Monitor Google Search Console.
- Monitor Bing Webmaster Tools.
- Monitor Core Web Vitals.
- Monitor indexing coverage.
- Monitor crawl errors.
- Monitor AI visibility.
- Monitor content freshness.
- Monitor security vulnerabilities.
- Review technical debt.

Deliverables:

- Monthly SEO/GEO Report.
- Performance Dashboard.
- AI Visibility Report.
- Optimization Backlog.

---

# 12. DEFINITION OF DONE (DoD)

A website MUST NOT be considered production-ready until all applicable mandatory requirements are satisfied.

## Technical SEO

- [ ] Every intended indexable page returns an appropriate HTTP status.
- [ ] Canonical URLs are correct.
- [ ] XML sitemap is valid.
- [ ] Robots policies are correct.
- [ ] Metadata is implemented.
- [ ] Internal links are crawlable.
- [ ] No unintended noindex directives exist.
- [ ] No critical orphan pages exist.

## Semantic and Structured Data

- [ ] Semantic HTML is implemented.
- [ ] Heading hierarchy is valid.
- [ ] JSON-LD is valid.
- [ ] Structured data matches visible content.
- [ ] Entity information is consistent.
- [ ] Breadcrumbs are implemented where applicable.

## GEO and Content

- [ ] Important pages have clear answers and descriptions.
- [ ] Content reflects actual user search intent.
- [ ] Relevant internal links exist.
- [ ] Authors and references are identified where applicable.
- [ ] No fabricated claims or statistics exist.
- [ ] AI crawler policies are approved.

## Performance

- [ ] Core Web Vitals have been evaluated.
- [ ] Mobile performance has been tested.
- [ ] Images are optimized.
- [ ] No critical layout shifts exist.
- [ ] JavaScript performance is acceptable.

## Accessibility and Security

- [ ] Keyboard navigation is tested.
- [ ] WCAG 2.2 AA requirements are evaluated.
- [ ] Security scans are completed.
- [ ] No unresolved critical or high security vulnerabilities remain without formally approved risk acceptance.

## Monitoring

- [ ] Google Search Console is configured.
- [ ] Bing Webmaster Tools is configured.
- [ ] Analytics is configured.
- [ ] Sitemap submission is completed where applicable.
- [ ] Monitoring and alerting are configured.

---

# 13. AUTOMATED QUALITY GATES

The CI/CD pipeline SHOULD enforce automated quality gates.

| Quality Gate | Tool | Expected Result |
|---|---|---|
| Build | Project build system | Pass |
| Unit tests | Jest / Vitest / pytest | Pass |
| HTML validation | HTML Validator | No critical errors |
| SEO metadata | Custom automated tests | Pass |
| Schema validation | Schema validator | No blocking errors |
| Link validation | Crawler | No critical broken links |
| Lighthouse | Lighthouse CI | Meets project thresholds |
| Accessibility | axe-core | No critical violations |
| Security | OWASP ZAP / SAST / SCA | No unaccepted critical findings |
| E2E | Playwright | Pass |
| Sitemap | Custom validator | Valid and consistent |

Suggested initial Lighthouse targets:

| Category | Target |
|---|---:|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

These are project engineering targets, not universal Google ranking requirements. Thresholds MUST be validated against representative production pages and environments.

CI/CD MUST block release for failed mandatory quality gates unless an authorized exception is documented.

---

# 14. ROLES AND RESPONSIBILITIES

| Role | Responsibility |
|---|---|
| Product Owner | Business objectives and acceptance |
| Project Manager | SDLC compliance and delivery governance |
| Solution Architect | Architecture and technical compliance |
| UI/UX Designer | Accessibility and usability |
| Developer | Implementation |
| SEO Specialist | SEO and content requirements |
| GEO Specialist | AI visibility and citation strategy |
| QA Engineer | Functional and non-functional validation |
| DevOps Engineer | CI/CD, infrastructure and monitoring |
| Security Engineer | Security validation |

SEO/GEO ownership MUST be explicitly assigned, even when one person performs multiple roles.

---

# 15. PROJECT GOVERNANCE AND EXCEPTIONS

All mandatory requirements MUST be tracked in the project backlog.

Each requirement MUST have:

- Unique Requirement ID.
- Description.
- Priority.
- Owner.
- Implementation status.
- Test case.
- Acceptance criteria.
- Evidence.
- Exception status, where applicable.

Exceptions MUST include:

- Reason.
- Business impact.
- Technical impact.
- Risk assessment.
- Approver.
- Expiration or review date.

No mandatory requirement SHOULD be silently skipped.

---

# 16. REFERENCES AND OFFICIAL STANDARDS

The project SHOULD use the latest applicable official guidance:

1. Google Search Central – SEO Fundamentals:
   https://developers.google.com/search/docs

2. Google Search Central – AI Features:
   https://developers.google.com/search/docs/appearance/ai-features

3. Google Search Central – Structured Data:
   https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

4. Bing Webmaster Guidelines:
   https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a

5. Schema.org:
   https://schema.org/

6. W3C WCAG 2.2:
   https://www.w3.org/TR/WCAG22/

7. OWASP Top 10:
   https://owasp.org/www-project-top-ten/

8. OWASP ASVS:
   https://owasp.org/www-project-application-security-verification-standard/

9. Core Web Vitals:
   https://web.dev/articles/vitals

10. Playwright:
    https://playwright.dev/docs/intro

11. Lighthouse CI:
    https://github.com/GoogleChrome/lighthouse-ci

12. llms.txt:
    https://llmstxt.org/

---

# 17. FINAL ENGINEERING POLICY

SEO, GEO, AEO, performance, accessibility and security MUST be considered part of the website's core engineering requirements.

The organization MUST adopt a shift-left approach:

- Define requirements before design.
- Validate architecture before development.
- Implement SEO/GEO during development.
- Test automatically during CI/CD.
- Validate production before release.
- Monitor continuously after deployment.

The final goal is not to guarantee search rankings or AI citations, which cannot be controlled by website developers.

The goal is to build websites that are technically accessible, semantically understandable, factually reliable, performant, secure and easy for search engines and AI systems to discover, interpret and reference.

**END OF DOCUMENT**
