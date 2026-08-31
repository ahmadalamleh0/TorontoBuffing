import { Link } from "react-router-dom";
import { CheckIcon } from "../../components/QuoteWizard/icons";

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
        <span className="eyebrow service-hero__eyebrow">Services</span>
        <h1 className="service-hero__title">{hero.title}</h1>
        <p className="service-hero__copy">{hero.copy}</p>
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

function PackageTier({ tier }) {
  return (
    <div className={`service-tier${tier.featured ? " service-tier--featured" : ""}`}>
      {tier.badge && <span className="service-tier__badge">{tier.badge}</span>}
      <h3 className="service-tier__name">{tier.name}</h3>
      {tier.price && (
        <div className="service-tier__price">
          {tier.priceNote && <span className="service-tier__price-note">{tier.priceNote}</span>}
          <span className="service-tier__price-value">{tier.price}</span>
          {tier.priceSuffix && <span className="service-tier__price-suffix">{tier.priceSuffix}</span>}
        </div>
      )}
      {tier.duration && <p className="service-tier__duration">{tier.duration}</p>}
      {tier.description && <p className="service-tier__description">{tier.description}</p>}
      {tier.features && (
        <ul className="service-tier__features">
          {tier.features.map((f) => (
            <li key={f}>
              <CheckIcon />
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PackagesSection({ section }) {
  return (
    <section className="service-packages-section section">
      <div className="container">
        <h2 className="service-heading service-heading--center">{section.heading}</h2>

        {section.groups.map((group, gi) => (
          <div className="service-tier-group" key={group.label ?? gi}>
            {group.label && <h3 className="service-tier-group__label">{group.label}</h3>}
            <div
              className="service-tier-grid"
              style={{ "--tier-cols": Math.min(group.tiers.length, 4) }}
            >
              {group.tiers.map((tier) => (
                <PackageTier tier={tier} key={tier.name} />
              ))}
            </div>
          </div>
        ))}

        {section.note && <p className="service-grid-section__note">{section.note}</p>}
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
                <CheckIcon />
                {point}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BannerSection({ section }) {
  return (
    <section className={`service-banner${section.fit === "contain" ? " service-banner--contain" : ""}`}>
      <img
        src={section.image}
        alt={section.alt ?? ""}
        width={section.imageWidth}
        height={section.imageHeight}
        loading="lazy"
      />
    </section>
  );
}

const SECTION_COMPONENTS = {
  intro: IntroSection,
  "checklist-grid": ChecklistGridSection,
  steps: StepsSection,
  packages: PackagesSection,
  brands: BrandsSection,
  trust: TrustSection,
  banner: BannerSection,
};

export function ServiceSection({ section }) {
  const Component = SECTION_COMPONENTS[section.type];
  if (!Component) return null;
  return <Component section={section} />;
}

export function ServiceCta({ cta }) {
  return (
    <section className="service-cta">
      <div className="container service-cta__inner">
        <h2 className="service-cta__heading">{cta.heading}</h2>
        <Link to="/#contact" className="btn btn-primary service-cta__btn">
          {cta.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
