import fullFrontImg from "../../../assets/images/quote/ppf/ppf-full-front.png";
import trackPackageImg from "../../../assets/images/quote/ppf/ppf-track-package.png";
import fullBodyImg from "../../../assets/images/quote/ppf/ppf-full-body.png";
import rearImg from "../../../assets/images/quote/ppf/ppf-rear.png";

const COVERAGE_IMAGES = {
  "full-front": fullFrontImg,
  "track-package": trackPackageImg,
  "full-body": fullBodyImg,
  rear: rearImg,
};

const COVERAGE_LABELS = {
  "full-front": "Full Front Coverage",
  "track-package": "Track Package Coverage",
  "full-body": "Full Body Coverage",
  rear: "Rear Coverage",
};

/**
 * Interactive PPF Coverage Visualizer showing active coverage option artwork.
 * Defaults to "full-front" coverage.
 * @param {{ coverage: string | null }} props
 */
function CoverageVisualizer({ coverage }) {
  const selectedCoverage = coverage || "full-front";
  const activeImage = COVERAGE_IMAGES[selectedCoverage];
  const activeLabel = COVERAGE_LABELS[selectedCoverage];

  return (
    <div className="coverage-visualizer" data-coverage={selectedCoverage}>
      <div className="coverage-visualizer__frame">
        <img
          key={selectedCoverage}
          src={activeImage}
          alt={activeLabel}
          className="coverage-visualizer__img"
          loading="lazy"
        />
      </div>
      <span className="coverage-visualizer__caption">{activeLabel}</span>
    </div>
  );
}

export default CoverageVisualizer;
