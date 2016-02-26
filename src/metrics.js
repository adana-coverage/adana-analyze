/**
 * Compute some useful information about coverage from the given data.
 * @param {Array} locations Existing coverage data locations.
 * @returns {Object} Computed information.
 */
export default function metrics(locations) {
  const total = locations.length;
  const covered = locations.reduce((sum, { count }) => {
    return (count > 0) ? sum + 1 : sum;
  }, 0);
  return {
    value: total ? covered / total : 1,
    passed: covered,
    total,
  };
}
