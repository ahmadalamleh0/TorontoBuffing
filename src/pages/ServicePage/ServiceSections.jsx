import { Fragment, useEffect, useRef } from "react";
import { CheckIcon } from "../../components/QuoteWizard/icons";
import BeforeAfterSlider from "./BeforeAfterSlider";

const REVEAL_THRESHOLD = 0.3;

// Same technique as TextReveal's cinematic section: reveal once the
// section crosses the threshold, then leave it alone — no re-hiding
// on scroll back up.
function useRevealOnView() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// Premium editorial 3-up feature grid — photo-led cards with a slim
// brand-blue rule as the one signature accent in an otherwise dark,
// quiet card body. No CTA: this is a statement of process/
// craftsmanship, not a conversion point.
function FeatureCardsSection({ section }) {
  return (
    <section className="service-feature-cards section">
      <div className="container service-feature-cards__grid">
        {section.cards.map((card) => (
          <div className="service-feature-card" key={card.title}>
            <div className="service-feature-card__media">
              <img src={card.image} alt={card.alt ?? ""} loading="lazy" />
            </div>
            <div className="service-feature-card__body">
              <span className="service-feature-card__rule" aria-hidden="true" />
              <h3 className="service-feature-card__title">{card.title}</h3>
              <p className="service-feature-card__text">{card.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServiceHero({ hero }) {
  return (
    <section className="service-hero">
      <div className="service-hero__media">
        <img
          src={hero.image}
          alt={hero.imageAlt ?? ""}
          width={hero.imageWidth}
          height={hero.imageHeight}
          loading="eager"
          fetchPriority="high"
        />
        <div className="service-hero__scrim" aria-hidden="true" />
      </div>
      <div className="container service-hero__inner">
        <h1 className={`service-hero__title${hero.titleNoWrap ? " service-hero__title--nowrap" : ""}`}>
          {hero.title}
        </h1>
        <p className="service-hero__copy">{hero.copy}</p>
      </div>
    </section>
  );
}

// Premium scroll-reveal transition directly below the hero — small
// eyebrow, large headline and short supporting copy fading/rising into
// place together as the section enters view.
function RevealIntroSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-reveal-intro" ref={ref}>
      <div className="container service-reveal-intro__inner">
        <span className="eyebrow service-reveal-intro__eyebrow">{section.eyebrow}</span>
        <h2 className="service-reveal-intro__title">{section.heading}</h2>
        <p className="service-reveal-intro__body">{section.body}</p>
      </div>
    </section>
  );
}

// Renders "plain text **bold text** more plain text" as a fragment
// with the marked segments wrapped in <strong> — lets approach-row
// copy call out the key phrase anywhere in the sentence, not just a
// fixed leading word.
function renderBoldedText(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}

// Premium "why we're different" moment — bold two-line headline, a
// short intentional description, then a stack of numbered rows
// divided by hairlines (not icon chips or a plain bulleted
// checklist) — reads like an installation-standard spec sheet.
function ApproachSection({ section }) {
  const ref = useRevealOnView();
  const headingLines = Array.isArray(section.heading) ? section.heading : [section.heading];

  return (
    <section className="service-approach section" ref={ref}>
      <div className="container service-approach__inner">
        {section.eyebrow && <span className="eyebrow service-approach__eyebrow">{section.eyebrow}</span>}

        <h2 className="service-approach__title">
          {headingLines.map((line, i) => (
            <span className="service-approach__title-line" key={i}>
              {line}
            </span>
          ))}
        </h2>

        <span className="service-approach__rule" aria-hidden="true" />

        {section.body && <p className="service-approach__body">{section.body}</p>}

        <div className="service-approach__list">
          {section.items.map((item, i) => (
            <div className="service-approach__item" style={{ transitionDelay: `${i * 90}ms` }} key={item.text}>
              <span className="service-approach__text">{renderBoldedText(item.text)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntroSection({ section }) {
  const paragraphs = Array.isArray(section.body) ? section.body : [section.body];

  return (
    <section className="service-intro section">
      <div className="container service-intro__inner">
        <h2 className="service-heading">{section.heading}</h2>

        {section.quote && <p className="service-intro__quote">{section.quote}</p>}

        {paragraphs.map((p, i) => (
          <p className="service-intro__body" key={i}>
            {p}
          </p>
        ))}

        {section.list && (
          <ul className="service-checklist">
            {section.list.map((item) => (
              <li key={item} className="service-checklist__item">
                <span className="service-checklist__icon" aria-hidden="true">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {section.note && <p className="service-intro__note">{section.note}</p>}
      </div>
    </section>
  );
}

function ChecklistGridSection({ section }) {
  return (
    <section className="service-grid-section section">
      <div className="container">
        <h2 className="service-heading service-heading--center">{section.heading}</h2>

        <div className="service-tag-grid">
          {section.items.map((item) => (
            <span className="service-tag" key={item}>
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>

        {section.note && <p className="service-grid-section__note">{section.note}</p>}
      </div>
    </section>
  );
}

// Luxury "why this service" statement — a handful of strong,
// named benefits (bold title + one-line payoff) laid out as a
// quiet, airy grid. No icons, no tag chips, no dividers — spacing
// alone does the separating, so it reads as a benefit statement
// rather than a spec sheet or feature checklist.
function BenefitsSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-benefits section" ref={ref}>
      <div className="container service-benefits__inner">
        <h2 className="service-heading service-heading--center">{section.heading}</h2>

        <div className="service-benefits__grid">
          {section.items.map((item, i) => (
            <div className="service-benefits__item" style={{ transitionDelay: `${i * 90}ms` }} key={item.title}>
              <h3 className="service-benefits__item-title">{item.title}</h3>
              <p className="service-benefits__item-body">{item.body}</p>
            </div>
          ))}
        </div>

        {section.note && <p className="service-benefits__note">{section.note}</p>}
      </div>
    </section>
  );
}

// Professional assessment list — a bold centered title over plain
// text rows divided by hairlines, no checkmarks or pill chips. Reads
// like a short, confident capability statement rather than a
// checklist of features.
function TextListSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-text-list section" ref={ref}>
      <div className="container service-text-list__inner">
        <h2 className="service-heading service-heading--center">{section.heading}</h2>

        <div className="service-text-list__rows">
          {section.items.map((item, i) => (
            <span className="service-text-list__row" style={{ transitionDelay: `${i * 70}ms` }} key={item}>
              {item}
            </span>
          ))}
        </div>

        {section.note && <p className="service-text-list__note">{section.note}</p>}
      </div>
    </section>
  );
}

// Stacked stage list — bold condensed "STAGE N — TITLE" heading over
// a short paragraph, divided by hairlines. Used where levels/tiers
// need real explanation, not just a tag grid.
function StageListSection({ section }) {
  return (
    <section className="service-stage-list section">
      <div className="container service-stage-list__inner">
        {section.heading && <h2 className="service-heading service-heading--center">{section.heading}</h2>}

        <div className="service-stage-list__items">
          {section.stages.map((stage, i) => (
            <div className="service-stage-list__item" key={stage.title}>
              <h3 className="service-stage-list__item-title">
                <span className="service-stage-list__item-num">Stage {i + 1}</span> &mdash; {stage.title}
              </h3>
              <p className="service-stage-list__item-body">{stage.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection({ section }) {
  return (
    <section className="service-steps-section section">
      <div className="container">
        <h2 className="service-heading service-heading--center">{section.heading}</h2>

        <ol className="service-steps">
          {section.steps.map((step, i) => (
            <li className="service-steps__item" key={i}>
              <span className="service-steps__number">{String(i + 1).padStart(2, "0")}</span>
              <span className="service-steps__text">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Gentle curved arrow linking one process step to the next — a
// symmetric arc (level start/end, centered peak) with an unambiguous
// chevron right at the tip, so it sits naturally on the circles' own
// centerline and clearly points into the next node.
function ProcessArrowIcon() {
  return (
    <svg width="48" height="20" viewBox="0 0 48 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 11c14-6 30-6 40 0" />
      <path d="M34 5.5c3 1.5 5.5 3 8 5.5-2.5 2.5-5 4-8 5.5" />
    </svg>
  );
}

// Premium 3-step process — large centered title, then numbered
// gauge-style circle nodes (dashed outer ring, solid inner disc —
// closer to an instrument dial than a plain outlined circle) linked
// by connecting arrows, with the step title/copy left-aligned
// beneath each. Deliberately not a card grid or checklist: a dark,
// quiet stage for walking through the craft step by step.
function ProcessSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-process section" ref={ref}>
      <div className="container service-process__inner">
        <h2 className="service-process__title">{section.heading}</h2>

        <div className="service-process__row">
          {section.steps.map((step, i) => (
            <Fragment key={step.title}>
              {i > 0 && (
                <span className="service-process__connector" aria-hidden="true" style={{ transitionDelay: `${i * 140 + 60}ms` }}>
                  <ProcessArrowIcon />
                </span>
              )}
              <div className="service-process__step" style={{ transitionDelay: `${i * 140}ms` }}>
                <span
                  className="service-process__circle"
                  aria-hidden="true"
                  style={{ "--ring-delay": `${i * 140 + 260}ms` }}
                >
                  <span className="service-process__circle-inner">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <h3 className="service-process__step-title">
                  <span className="service-process__step-index">{String(i + 1).padStart(2, "0")} &mdash;</span> {step.title}
                </h3>
                <p className="service-process__step-body">{step.body}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandsSection({ section }) {
  return (
    <section className="service-brands-section section">
      <div className="container service-brands-section__inner">
        <h2 className="service-heading service-heading--center">{section.heading}</h2>
        {section.body && <p className="service-intro__body service-intro__body--center">{section.body}</p>}

        <div className="service-brand-strip">
          {section.brands.map((brand) => (
            <span className="service-brand" key={brand.name}>
              {brand.logo ? <img src={brand.logo} alt={brand.name} loading="lazy" /> : brand.name}
            </span>
          ))}
        </div>

        {section.highlight && <p className="service-brands-section__highlight">{section.highlight}</p>}
      </div>
    </section>
  );
}

function TrustSection({ section }) {
  return (
    <section className="service-trust-section section">
      <div className="container service-trust-section__inner">
        <h2 className="service-heading service-heading--center">{section.heading}</h2>
        <p className="service-intro__body service-intro__body--center">{section.body}</p>

        {section.points && (
          <div className="service-trust-points">
            {section.points.map((point) => (
              <span className="service-trust-points__item" key={point}>
                {renderBoldedText(point)}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BannerSection({ section }) {
  const classes = [
    "service-banner",
    section.fit === "contain" && "service-banner--contain",
    section.fit === "boxed" && "service-banner--boxed",
    section.overlay && "service-banner--has-overlay",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      <img
        src={section.image}
        alt={section.alt ?? ""}
        width={section.imageWidth}
        height={section.imageHeight}
        loading="lazy"
      />
      {section.overlay && (
        <div className="service-banner__overlay">
          <span className="service-banner__overlay-rule" aria-hidden="true" />
          <span className="service-banner__overlay-text">{section.overlay}</span>
        </div>
      )}
    </section>
  );
}

// Two images side by side (desktop) / stacked (mobile) — an editorial
// pairing rather than a card grid, for pages with enough project
// photography to alternate with the full-width banner breaks.
function TwoImageSection({ section }) {
  return (
    <section className="service-two-image section">
      <div className="container service-two-image__grid">
        {section.images.map((img, i) => (
          <div className="service-two-image__item" key={i}>
            <img src={img.src} alt={img.alt ?? ""} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Editorial gallery — an asymmetric, staggered collage (fixed
// large/small/wide/offset positions per nth-child, up to 5 photos)
// rather than a basic even grid. Reads as a curated showcase of a
// restoration's journey, each photo fading/rising into place as it's
// scrolled into view.
function GallerySection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-gallery section" ref={ref}>
      <div className="container">
        {section.heading && <h2 className="service-heading service-heading--center">{section.heading}</h2>}
        <div className="service-gallery__grid">
          {section.images.map((img, i) => (
            <div className="service-gallery__item" style={{ transitionDelay: `${i * 110}ms` }} key={img.alt}>
              <img src={img.src} alt={img.alt ?? ""} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Dedicated before/after proof moment — 50/50 side by side on
// desktop, stacked on mobile (no slider: none exists in this project
// yet, and a two-image comparison doesn't need one). Labels mirror
// SelectedWorkSection's vehicle-tag treatment: small, uppercase,
// text-shadow only, no background chip.
function BeforeAfterSection({ section }) {
  return (
    <section className="service-before-after section">
      <div className="container">
        {section.heading && <h2 className="service-heading service-heading--center">{section.heading}</h2>}
        <BeforeAfterSlider before={section.before} after={section.after} />
      </div>
    </section>
  );
}

// Continuous product marquee — same seamless-loop technique as
// BrandLogoStrip (duplicate the set once, animate translateX(-50%)):
// no per-frame JS, smooth and lightweight either way.
function ProductMarqueeSection({ section }) {
  const loop = [...section.products, ...section.products];

  return (
    <section className="service-product-marquee section">
      <div className="service-product-marquee__strip">
        <div className="service-product-marquee__track">
          {loop.map((product, i) => (
            <span className="service-product-marquee__item" key={i}>
              {/* Eager, not lazy: every copy (including the duplicated
                  second half) has to be ready immediately for the
                  seamless loop — lazy-loading them caused images to
                  pop in/out or go blank mid-scroll on mobile. */}
              <img src={product.src} alt={product.alt ?? ""} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const SECTION_COMPONENTS = {
  "reveal-intro": RevealIntroSection,
  "feature-cards": FeatureCardsSection,
  process: ProcessSection,
  intro: IntroSection,
  approach: ApproachSection,
  "checklist-grid": ChecklistGridSection,
  benefits: BenefitsSection,
  "text-list": TextListSection,
  "stage-list": StageListSection,
  steps: StepsSection,
  brands: BrandsSection,
  trust: TrustSection,
  banner: BannerSection,
  "two-image": TwoImageSection,
  gallery: GallerySection,
  "before-after": BeforeAfterSection,
  "product-marquee": ProductMarqueeSection,
};

export function ServiceSection({ section }) {
  const Component = SECTION_COMPONENTS[section.type];
  if (!Component) return null;
  return <Component section={section} />;
}

