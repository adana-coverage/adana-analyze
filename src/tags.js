/**
 * Generate a tag index from coverage data. This creates an object whose keys
 * are tags and whose values are arrays containing locations.
 * @param {Array} locations Existing coverage data locations.
 * @param {Array} select List of tags to get data for.
 * @returns {Object} Locations grouped by tag.
 */
export default function tags(locations, select) {
  const tagIndex = { };
  if (select) {
    select.forEach(entry => {
      tagIndex[entry] = [];
    });
  }
  locations.forEach(location => {
    location.tags.forEach(tag => {
      if (!(tag in tagIndex)) {
        if (!select) {
          tagIndex[tag] = [];
          tagIndex[tag].push(location);
        }
      } else {
        tagIndex[tag].push(location);
      }
    });
  });
  return tagIndex;
}
