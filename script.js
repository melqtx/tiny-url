const shortbtn = document.getElementById("shortbtn");
const reloadbtn = document.getElementById("reloadbtn");
const copybtn = document.getElementById("copybtn");
const form = document.getElementById("url-form");
const longUrlInput = document.getElementById("long-url");
const shorturltextarea = document.getElementById("shorturl");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const longurl = longUrlInput.value.trim();

  if (!isValidUrl(longurl)) {
    shorturltextarea.value = "Error: Please enter a valid URL";
    return;
  }

  const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
    longurl
  )}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    shorturltextarea.value = data;
    copybtn.style.display = "inline-block"; // Show copy button
  } catch (error) {
    console.error("Error:", error);
    shorturltextarea.value = "Error: Unable to shorten URL. Please try again.";
    copybtn.style.display = "none"; // Hide copy button
  }
});

reloadbtn.addEventListener("click", () => {
  longUrlInput.value = "";
  shorturltextarea.value = "";
  copybtn.style.display = "none"; // Hide copy button
});

copybtn.addEventListener("click", () => {
  shorturltextarea.select();
  document.execCommand("copy");

  //alert("Shortened URL copied to clipboard!");
});

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
