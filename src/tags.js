/**
 * Generate a tag index from coverage data. This creates an object whose keys
 * are tags and whose values are arrays containing locations.
 * @param {Object} locations Existing coverage data locations.
 * @returns {Object} Locations grouped by tag.
 */
export default function tags(locations) {
  const tags = { };
  locations.forEach(location => {
    location.tags.forEach(tag => {
      if (!(tag in tags)) {
        tags[tag] = [];
      }
      tags[tag].push(location);
    });
  });
  return tags;
}
