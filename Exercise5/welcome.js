/**
 * Function to store the user's name in a cookie
 * It captures the name from input, calculates the end of the year date,
 * and sets the cookie with the user's name.
 */
function storeName () {
  const name = document.getElementById('userNameInput').value
  if (name) {
    const currentDate = new Date()
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31) // December 31st
    document.cookie = `UserName=${encodeURIComponent(name)}; expires=${endOfYear.toUTCString()}; path=/`
    displayGreeting() // Update greeting immediately
  }
}

/**
 * Function to display a greeting message.
 * It retrieves the user's name from the cookie (if it exists)
 * and updates the greeting text accordingly.
 */
function displayGreeting () {
  const userName = getCookie('UserName')
  const greetingElement = document.getElementById('greeting')
  if (userName) {
    greetingElement.textContent = `Hello ${userName}`
  } else {
    greetingElement.textContent = 'Hello Guest' // Default greeting if cookie is not set
  }
}

/**
 * Retrieves the value of a specified cookie by its name.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} The value of the cookie if found, otherwise null.
 *
 * How it works:
 * 1. The function first prepares a string that starts with a semicolon followed by the current document.cookie content.
 *    This makes it easier to split the string by "; name=".
 * 2. It then splits this string by the cookie name prefixed with '; ' to isolate the cookie pair (name=value).
 *    The inclusion of the semicolon ensures that only complete matches of the cookie name are considered,
 *    avoiding partial matches (e.g., avoiding 'myName' when searching for 'Name').
 * 3. If the split operation results in an array of length 2, it means the cookie was found (the first part will
 *    be the text before the cookie, and the second part starts with the cookie value).
 * 4. It pops the last element (the actual cookie value segment) from the array, splits it at the next semicolon
 *    (if there is one), and takes the first element, which is the cookie's value.
 * 5. Finally, it decodes the cookie value using decodeURIComponent to handle any URL-encoded characters correctly.
 * 6. If the cookie is not found, the function returns null.
 */
function getCookie (name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift())
  return null
}

// Event listener for DOMContentLoaded to run the displayGreeting function
// once the HTML document has been fully loaded.
document.addEventListener('DOMContentLoaded', function () {
  displayGreeting()
})
