/**
 * Compute information about line coverage given a list of instrumented
 * locations.
 * @param {Array} locations Existing coverage data locations.
 * @returns {Array} Array of line data.
 */
export default function lines(locations) {
  const index = { };
  const tags = { };
  locations.forEach(entry => {
    if (entry.tags.indexOf('line') !== -1) {
      for (let i = entry.loc.start.line; i <= entry.loc.end.line; ++i) {
        if (!tags[i]) {
          tags[i] = {};
        }
        /* eslint-disable no-loop-func */
        entry.tags.forEach((t) => tags[i][t] = true);
        index[i] = Math.max(index[i] || 0, entry.count);
      }
    }
  });
  let passed = 0;
  const result = Object.keys(index).map(line => {
    if (index[line] > 0) {
      ++passed;
    }
    return {
      line: line,
      passed: index[line] > 0,
      count: index[line],
    };
  });

  result.total = result.length;
  result.passed = passed;

  return result;
}
