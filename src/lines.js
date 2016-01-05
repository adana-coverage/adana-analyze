/**
 * [lines description]
 * @param   {[type]} statements [description]
 * @returns {[type]}            [description]
 */
export default function lines(statements) {
  const index = { };
  statements.forEach(entry => {
    for (let i = entry.loc.start.line; i <= entry.loc.end.line; ++i) {
      // If a statement hasn't been covered ensure the line is marked as
      // not covered.
      if (i in index) {
        index[i] = Math.min(index[i], entry.count);
      } else {
        index[i] = entry.count;
      }
    }
  });
  return Object.keys(index).map(line => {
    return {
      line: line,
      passed: index[line] > 0,
      count: index[line],
    };
  });
}
