/**
 * Compute some useful information about coverage from the given data.
 * @param {Array} locations Existing coverage data locations.
 * @returns {Object} Computed information.
 */
export default function metrics(locations) {
  const covered = locations.reduce((sum, { count }) => {
    return (count > 0) ? sum + 1 : sum;
  }, 0);
  return {
    value: covered / locations.length,
    passed: covered,
    total: locations.length,
  };
}
