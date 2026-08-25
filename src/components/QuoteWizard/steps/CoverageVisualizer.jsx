/**
 * Placeholder for the vehicle coverage visualizer. Once the Porsche
 * PPF asset is supplied, swap the placeholder graphic below for the
 * real vehicle artwork and layer in a panel-highlight overlay keyed
 * off `coverage` (e.g. one absolutely-positioned SVG/PNG layer per
 * package, cross-faded on change). The `data-coverage` attribute on
 * the root is already wired for that — nothing else here needs to
 * change to plug it in.
 *
 * @param {{ coverage: string | null }} props
 */
function CoverageVisualizer({ coverage }) {
  return (
    <div className="coverage-visualizer" data-coverage={coverage ?? "none"}>
      <div className="coverage-visualizer__frame">
        <span className="coverage-visualizer__placeholder">Vehicle visualizer — coming soon</span>
      </div>
    </div>
  );
}

export default CoverageVisualizer;
