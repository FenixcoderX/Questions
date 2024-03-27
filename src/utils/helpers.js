/**
 * Formats a timestamp into a readable date and time string
 * @param {number} timestamp - The timestamp in milliseconds
 * @returns {string} The formatted date and time string
 */
export function formatDate(timestamp) {
  const d = new Date(timestamp);                            // create a new date object
  const time = d.toLocaleTimeString('en-GB');               // en-GB to get time in 24-hour format 
  return `${time.slice(0, 5)} | ${d.toLocaleDateString()}`; // slice to remove seconds from time string. LocaleDateString to get date in format dd.mm.yyyy
}
