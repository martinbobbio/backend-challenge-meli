/**
 * Get the top N most repeated elements in an array of strings.
 * @param {string[]} array - Array of strings.
 * @param {number} n - Number of top repeated elements to retrieve.
 * @returns {string[]} Array containing the top N most repeated elements in descending order of frequency.
 */
export default function getTopNRepeatedStrings(
  array: string[],
  n: number
): string[] {
  const countMap: Record<string, number> = array.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});

  const sortedCounts: [string, number][] = Object.entries(countMap).sort(
    (a, b) => b[1] - a[1]
  );

  const topN: string[] = sortedCounts.slice(0, n).map((entry) => entry[0]);

  return topN;
}
