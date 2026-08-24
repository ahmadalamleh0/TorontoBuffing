const LOGO_SRC = "/images/logo/tb-logo.png";

// variant is kept for a future white-monochrome-on-dark asset if one
// is supplied — both currently render the same file.
function Logo({ variant = "blue", className }) {
  return (
    <img src={LOGO_SRC} alt="Toronto Buffing" className={className} data-logo-variant={variant} />
  );
}

export default Logo;
