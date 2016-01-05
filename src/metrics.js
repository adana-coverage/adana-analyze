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
