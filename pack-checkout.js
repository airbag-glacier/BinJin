// URL of your PHP file
const apiUrl =
  "http://localhost/BinJinCookies/includes/cookies/read_unordered_cookies.php";

// Function to fetch cookies from the PHP API
function fetchCookies() {
  fetch(apiUrl, {
    method: "GET",
    credentials: "include", // Ensures cookies and credentials are included in the request
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      console.log("Raw Data:", data);
      // Process and display the data
      const flavorCounts = countCookiesByFlavor(data);
      const formattedString = formatFlavorCounts(flavorCounts);
      document.getElementById("remainingCookiesContent").textContent =
        formattedString;
    })
    .catch((error) => {
      console.error("Error fetching cookies:", error);
      document.getElementById("remainingCookiesContent").textContent =
        "Error fetching data!";
    });
}

function countCookiesByFlavor(cookies) {
  const flavorCounts = {};

  cookies.forEach((cookie) => {
    const flavor = cookie.flavor_name;

    if (flavorCounts[flavor]) {
      flavorCounts[flavor]++;
    } else {
      flavorCounts[flavor] = 1;
    }
  });

  return flavorCounts;
}

function formatFlavorCounts(flavorCounts) {
  return Object.entries(flavorCounts)
    .map(([flavor, count]) => `${count} ${capitalize(flavor)}`)
    .join(", ");
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Fetch and display the cookies on page load
fetchCookies();
