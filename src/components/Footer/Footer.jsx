import "./Footer.css";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Toronto Buffing</span>
          <p className="footer__location">Toronto, ON</p>
        </div>

        <div className="footer__group">
          <span className="eyebrow">Contact</span>
          <a href="mailto:info@torontobuffing.com">
            info@torontobuffing.com
          </a>
          <a href="tel:+10000000000">(000) 000-0000</a>
        </div>

        <div className="footer__group">
          <span className="eyebrow">Follow</span>
          <ul className="footer__social">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {new Date().getFullYear()} Toronto Buffing. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
