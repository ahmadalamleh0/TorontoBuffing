import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon } from "../../components/QuoteWizard/icons";
import { renderRichText } from "../../lib/richText";
import { BUSINESS_INFO } from "../../data/businessInfo";
import FaqAccordionItem from "../../components/FaqSection/FaqAccordionItem";
import BeforeAfterSlider from "./BeforeAfterSlider";
import processArrow from "../../assets/images/services/process-arrow.png";
// Shared with the homepage/service FAQ so the "faq" block below gets
// the exact same accordion styling for free — imported here (not just
// by FaqSection/ServiceFaqSection) so it's guaranteed loaded wherever
// ServiceSections is, including /service-areas/:slug pages that never
// render the homepage or /services/:slug FAQ components.
import "../../components/FaqSection/FaqSection.css";

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

// Premium editorial 3-up feature grid — photo-led cards with a quiet,
// compact dark card body. No CTA: this is a statement of process/
// craftsmanship, not a conversion point.
function FeatureCardsSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-feature-cards section" ref={ref}>
      <div className="container service-feature-cards__grid">
        {section.cards.map((card, i) => (
          <div className="service-feature-card reveal-up" style={{ transitionDelay: `${i * 100}ms` }} key={card.title}>
            <div className="service-feature-card__media">
              <img src={card.image} alt={card.alt ?? ""} loading="lazy" />
            </div>
            <div className="service-feature-card__body">
              <h3 className="service-feature-card__title">{card.title}</h3>
              <p className="service-feature-card__text">{renderRichText(card.body)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/**
 * `variant="service"` is the opt-in redesigned treatment used only by
 * /services/:slug (ServicePage.jsx) — full bleed image, content
 * anchored low and left-aligned, a static eyebrow + phone row. Every
 * other caller (SeoPage, PreviewGeoPages, InsightArticle) omits
 * `variant` and gets the original centered/no-eyebrow rendering
 * untouched, since this same component backs their heroes too.
 */
export function ServiceHero({ hero, variant }) {
  const isService = variant === "service";
  // Drives the hero's own height from the actual photo's proportions
  // (see .service-hero--service in ServicePage.css) instead of every
  // service being forced into the same fixed viewport-height box
  // regardless of whether its source photo is a tall portrait or a
  // landscape shot — only set for the service variant so every other
  // caller's hero (SeoPage, InsightArticle, PreviewGeoPages) is
  // completely unaffected.
  const heroStyle =
    isService && hero.imageWidth && hero.imageHeight
      ? { aspectRatio: `${hero.imageWidth} / ${hero.imageHeight}` }
      : undefined;

  return (
    <section className={`service-hero${isService ? " service-hero--service" : ""}`} style={heroStyle}>
      {hero.image && (
        <div className="service-hero__media">
          <img
            src={hero.image}
            alt={hero.imageAlt ?? ""}
            width={hero.imageWidth}
            height={hero.imageHeight}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            style={hero.imagePosition ? { objectPosition: hero.imagePosition } : undefined}
          />
          <div className="service-hero__scrim" aria-hidden="true" />
        </div>
      )}
      <div
        className={`container service-hero__inner${hero.centered && !isService ? " service-hero__inner--center" : ""}`}
      >
        {isService && (
          <span className="eyebrow service-hero__eyebrow service-hero__eyebrow--reveal">Rated No. 1 In The GTA</span>
        )}
        <h1
          className={`service-hero__title service-hero__title--reveal${hero.titleNoWrap ? " service-hero__title--nowrap" : ""}`}
        >
          {hero.title}
        </h1>
        <p className="service-hero__copy service-hero__copy--reveal">{renderRichText(hero.copy)}</p>
        {isService && (
          <a href={`tel:${BUSINESS_INFO.telephone}`} className="service-hero__phone service-hero__phone--reveal">
            <PhoneIcon />
            {BUSINESS_INFO.telephoneDisplay}
          </a>
        )}
      </div>
    </section>
  );
}

// Premium scroll-reveal transition directly below the hero — small
// eyebrow, large headline and short supporting copy fading/rising into
// place together as the section enters view.
function RevealIntroSection({ section }) {
  const ref = useRevealOnView();
  const classes = [
    "service-reveal-intro",
    section.compact && "service-reveal-intro--compact",
    section.spacious && "service-reveal-intro--spacious",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} ref={ref}>
      <div className="container service-reveal-intro__inner">
        {section.eyebrow && <span className="eyebrow service-reveal-intro__eyebrow">{section.eyebrow}</span>}
        <h2 className="service-reveal-intro__title">{section.heading}</h2>
        <p className="service-reveal-intro__body">{renderRichText(section.body)}</p>
        {section.list && (
          <ul className="service-checklist service-reveal-intro__list">
            {section.list.map((item, i) => (
              <li
                key={item}
                className="service-checklist__item reveal-up"
                style={{ transitionDelay: `${220 + i * 40}ms` }}
              >
                <span className="service-checklist__icon" aria-hidden="true">
                  <CheckIcon />
                </span>
                {renderRichText(item)}
              </li>
            ))}
          </ul>
        )}
        {section.note && (
          <p className="service-reveal-intro__note reveal-up" style={{ transitionDelay: "340ms" }}>
            {renderRichText(section.note)}
          </p>
        )}
      </div>
    </section>
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

        {section.body && <p className="service-approach__body">{renderRichText(section.body)}</p>}

        <div className="service-approach__list">
          {section.items.map((item, i) => (
            <div className="service-approach__item" style={{ transitionDelay: `${i * 90}ms` }} key={item.text}>
              <span className="service-approach__text">{renderRichText(item.text)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Jump navigation for a long guide (an Insight like Paint Correction
// 101 or Post Service Car Care) — a flat list of in-page anchor links
// to the guide's own major section ids. Plain <a href="#id"> anchors,
// not React Router Link: these are same-page jumps, not navigation.
// section.items are {label, id}, where `id` matches another section's
// own `section.id` (rendered as a real id attribute by that section's
// component — see IntroSection/BenefitsSection/etc. above).
function JumpNavSection({ section }) {
  const ref = useRevealOnView();

  return (
    <nav className="service-jump-nav section" aria-label="Guide sections" ref={ref}>
      <div className="container service-jump-nav__inner">
        {section.heading && <p className="service-jump-nav__label">{section.heading}</p>}
        <ol className="service-jump-nav__list">
          {section.items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="service-jump-nav__link">
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

function IntroSection({ section }) {
  const ref = useRevealOnView();
  const paragraphs = Array.isArray(section.body) ? section.body : [section.body];

  return (
    <section className="service-intro section" id={section.id} ref={ref}>
      <div className="container service-intro__inner">
        <h2 className="service-heading reveal-up">{section.heading}</h2>

        {section.quote && (
          <p className="service-intro__quote reveal-up" style={{ transitionDelay: "120ms" }}>
            {section.quote}
          </p>
        )}

        {paragraphs.map((p, i) => (
          <p className="service-intro__body reveal-up" style={{ transitionDelay: `${140 + i * 60}ms` }} key={i}>
            {renderRichText(p)}
          </p>
        ))}

        {section.list && (
          <ul className="service-checklist">
            {section.list.map((item, i) => (
              <li
                key={item}
                className="service-checklist__item reveal-up"
                style={{ transitionDelay: `${220 + i * 40}ms` }}
              >
                <span className="service-checklist__icon" aria-hidden="true">
                  <CheckIcon />
                </span>
                {renderRichText(item)}
              </li>
            ))}
          </ul>
        )}

        {section.note && (
          <p className="service-intro__note reveal-up" style={{ transitionDelay: "260ms" }}>
            {renderRichText(section.note)}
          </p>
        )}
      </div>
    </section>
  );
}

function ChecklistGridSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-grid-section section" id={section.id} ref={ref}>
      <div className="container">
        <h2 className="service-heading service-heading--center reveal-up">{section.heading}</h2>

        <div className="service-tag-grid">
          {section.items.map((item, i) => (
            <span className="service-tag reveal-up" style={{ transitionDelay: `${120 + i * 40}ms` }} key={item}>
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>

        {section.note && (
          <p className="service-grid-section__note reveal-up" style={{ transitionDelay: "260ms" }}>
            {renderRichText(section.note)}
          </p>
        )}
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
    <section className="service-benefits section" id={section.id} ref={ref}>
      <div className="container service-benefits__inner">
        <h2 className="service-heading service-heading--center">{section.heading}</h2>

        <div className="service-benefits__grid">
          {section.items.map((item, i) => (
            <div className="service-benefits__item" style={{ transitionDelay: `${i * 90}ms` }} key={item.title}>
              <h3 className="service-benefits__item-title">{item.title}</h3>
              <p className="service-benefits__item-body">{renderRichText(item.body)}</p>
            </div>
          ))}
        </div>

        {section.note && <p className="service-benefits__note">{renderRichText(section.note)}</p>}
      </div>
    </section>
  );
}

// Real accordion — question visible, answer collapsed until clicked —
// for a page's own city/service specific FAQ ("Common Questions" on a
// Service Area page). Reuses FaqAccordionItem, the exact same row
// FaqSection (homepage) and ServiceFaqSection (/services/:slug) use,
// so the interaction and styling are identical everywhere on the
// site, not a second implementation. section.items are {title, body}
// (question, answer) — the same shape every other block on this page
// already uses for a labelled list, just rendered as a toggle instead
// of an always-open grid.
function FaqBlockSection({ section }) {
  const ref = useRevealOnView();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="service-faq-block section" id={section.id} ref={ref}>
      <div className="container service-faq-block__inner">
        <h2 className="service-heading service-heading--center reveal-up">{section.heading}</h2>
        <div className="faq-ak__list service-faq-block__list">
          {section.items.map((item, i) => (
            <FaqAccordionItem
              key={item.title}
              item={{ question: item.title, answer: item.body }}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Clean internal-linking grid to nearby /service-areas/:slug pages
// ("Also Serving Nearby") — a name, a one-line purpose, and a clear
// "View Service Area" CTA per city, with the city name itself as the
// primary link. Deliberately not the old {title, body} block: that
// shape invited writing a full sentence of geographic explanation
// into `body`, which is exactly the over-explained "South of Brampton.
// See the Mississauga page." copy this replaces. section.items are
// {name, slug} — nothing to parse or render as markdown, so there's no
// way for raw link syntax to leak into this section either.
function NearbyAreasSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-nearby section" ref={ref}>
      <div className="container service-nearby__inner">
        <h2 className="service-heading service-heading--center reveal-up">{section.heading}</h2>

        <div className="service-nearby__grid">
          {section.items.map((item, i) => (
            <Link
              to={`/service-areas/${item.slug}`}
              className="service-nearby__card reveal-up"
              style={{ transitionDelay: `${120 + i * 60}ms` }}
              key={item.slug}
            >
              <span className="service-nearby__card-name">{item.name}</span>
              <span className="service-nearby__card-sub">Serving customers from {item.name}</span>
              <span className="service-nearby__card-cta">
                View Service Area
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        {section.note && <p className="service-nearby__note reveal-up">{renderRichText(section.note)}</p>}
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
    <section className="service-text-list section" id={section.id} ref={ref}>
      <div className="container service-text-list__inner">
        <h2 className="service-heading service-heading--center">{section.heading}</h2>

        <div className="service-text-list__rows">
          {section.items.map((item, i) => (
            <span className="service-text-list__row" style={{ transitionDelay: `${i * 70}ms` }} key={item}>
              {item}
            </span>
          ))}
        </div>

        {section.note && <p className="service-text-list__note">{renderRichText(section.note)}</p>}
      </div>
    </section>
  );
}

// Stacked stage list — bold condensed "STAGE N — TITLE" heading over
// a short paragraph, divided by hairlines. Used where levels/tiers
// need real explanation, not just a tag grid.
function StageListSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-stage-list section" id={section.id} ref={ref}>
      <div className="container service-stage-list__inner">
        {section.heading && (
          <h2 className="service-heading service-heading--center reveal-up">{section.heading}</h2>
        )}

        <div className="service-stage-list__items">
          {section.stages.map((stage, i) => (
            <div
              className="service-stage-list__item reveal-up"
              style={{ transitionDelay: `${120 + i * 100}ms` }}
              key={stage.title}
            >
              <h3 className="service-stage-list__item-title">
                <span className="service-stage-list__item-num">Stage {i + 1}</span> &mdash; {stage.title}
              </h3>
              <p className="service-stage-list__item-body">{renderRichText(stage.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-steps-section section" id={section.id} ref={ref}>
      <div className="container">
        <h2 className="service-heading service-heading--center reveal-up">{section.heading}</h2>

        <ol className="service-steps">
          {section.steps.map((step, i) => (
            <li className="service-steps__item reveal-up" style={{ transitionDelay: `${120 + i * 90}ms` }} key={i}>
              <span className="service-steps__number">{String(i + 1).padStart(2, "0")}</span>
              <span className="service-steps__text">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
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
                  <span
                    className="service-process__connector-arrow"
                    style={{ WebkitMaskImage: `url(${processArrow})`, maskImage: `url(${processArrow})` }}
                  />
                </span>
              )}
              <div className="service-process__step" style={{ transitionDelay: `${i * 140}ms` }}>
                <span
                  className="service-process__circle"
                  aria-hidden="true"
                  style={{ "--ring-delay": `${i * 140 + 260}ms` }}
                >
                  <span className="service-process__circle-inner">{i + 1}</span>
                </span>
                <span className="service-process__step-index">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="service-process__step-title">{step.title}</h3>
                <p className="service-process__step-body">{renderRichText(step.body)}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandsSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-brands-section section" ref={ref}>
      <div className="container service-brands-section__inner">
        <h2 className="service-heading service-heading--center reveal-up">{section.heading}</h2>
        {section.body && (
          <p className="service-intro__body service-intro__body--center reveal-up" style={{ transitionDelay: "100ms" }}>
            {renderRichText(section.body)}
          </p>
        )}

        <div className="service-brand-strip">
          {section.brands.map((brand, i) => (
            <span className="service-brand reveal-up" style={{ transitionDelay: `${180 + i * 40}ms` }} key={brand.name}>
              {brand.logo ? <img src={brand.logo} alt={brand.name} loading="lazy" /> : brand.name}
            </span>
          ))}
        </div>

        {section.highlight && (
          <p className="service-brands-section__highlight reveal-up" style={{ transitionDelay: "300ms" }}>
            {renderRichText(section.highlight)}
          </p>
        )}
      </div>
    </section>
  );
}

function TrustSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-trust-section section" id={section.id} ref={ref}>
      <div className="container service-trust-section__inner">
        <h2 className="service-heading service-heading--center reveal-up">{section.heading}</h2>
        <p className="service-intro__body service-intro__body--center reveal-up" style={{ transitionDelay: "100ms" }}>
          {renderRichText(section.body)}
        </p>

        {section.points && (
          <div className="service-trust-points">
            {section.points.map((point, i) => (
              <span
                className="service-trust-points__item reveal-up"
                style={{ transitionDelay: `${200 + i * 60}ms` }}
                key={point}
              >
                {renderRichText(point)}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BannerSection({ section }) {
  const ref = useRevealOnView();
  const classes = [
    "service-banner",
    section.fit === "contain" && "service-banner--contain",
    section.fit === "boxed" && "service-banner--boxed",
    section.fit === "tall" && "service-banner--tall",
    section.overlay && "service-banner--has-overlay",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id={section.id} ref={section.overlay ? ref : undefined}>
      <img
        src={section.image}
        alt={section.alt ?? ""}
        width={section.imageWidth}
        height={section.imageHeight}
        loading="lazy"
      />
      {section.overlay && (
        <div className="service-banner__overlay">
          <span className="service-banner__overlay-rule reveal-up" aria-hidden="true" />
          <span className="service-banner__overlay-text reveal-up" style={{ transitionDelay: "100ms" }}>
            {section.overlay}
          </span>
        </div>
      )}
    </section>
  );
}

// The video is the content — full-bleed, edge to edge, cropped to
// fill the screen width like a real automotive showcase reel. No
// container, no card, no overlay, no text. Just a scroll reveal
// fade-in, same as every other section.
function VideoShowcaseSection({ section }) {
  const ref = useRevealOnView();

  return (
    <section className="service-video" ref={ref}>
      <video
        className="service-video__media reveal-up"
        src={section.src}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="metadata"
        aria-hidden="true"
      />
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

// Same seamless-loop technique as the homepage review marquee:
// repeat the row's photos until one copy comfortably exceeds any
// viewport, render that copy twice back-to-back, animate
// translateX(-50%) — no gaps, no snapping, no per-frame JS.
function buildGalleryLoop(images) {
  const repeat = Math.max(1, Math.ceil(8 / images.length));
  return Array.from({ length: repeat }, () => images).flat();
}

function GalleryRow({ images, direction, speedSeconds }) {
  const loop = buildGalleryLoop(images);

  return (
    <div className="service-gallery__row" data-direction={direction}>
      <div className="service-gallery__track" style={{ animationDuration: `${speedSeconds}s` }}>
        {[0, 1].map((copy) =>
          loop.map((img, i) => (
            <div className="service-gallery__item" key={`${copy}-${i}`}>
              <img src={img.src} alt={img.alt ?? ""} loading="lazy" />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

// Premium moving collection showcase — two continuously scrolling
// rows of wide, short, rounded cards (row 1 left, row 2 right),
// rather than a static grid. Reads as a curated reel of the
// restoration journey, not a normal image gallery.
function GallerySection({ section }) {
  const ref = useRevealOnView();
  const images = section.images;
  const mid = Math.ceil(images.length / 2);
  const row1 = images.slice(0, mid);
  const row2 = images.slice(mid).length ? images.slice(mid) : row1;

  return (
    <section className="service-gallery section" ref={ref}>
      <div className="container">
        {section.heading && (
          <h2 className="service-heading service-heading--center reveal-up">{section.heading}</h2>
        )}
      </div>
      <div className="service-gallery__rows">
        <GalleryRow images={row1} direction="left" speedSeconds={38} />
        <GalleryRow images={row2} direction="right" speedSeconds={34} />
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
  const ref = useRevealOnView();

  return (
    <section className="service-before-after section" ref={ref}>
      <div className="container">
        {section.heading && (
          <h2 className="service-heading service-heading--center reveal-up">{section.heading}</h2>
        )}
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
  faq: FaqBlockSection,
  "nearby-areas": NearbyAreasSection,
  "jump-nav": JumpNavSection,
  steps: StepsSection,
  brands: BrandsSection,
  trust: TrustSection,
  banner: BannerSection,
  "video-showcase": VideoShowcaseSection,
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

