// Footer Javascripts

const year = document.querySelector("#currentyear");

const today = new Date();

year.innerHTML = today.getFullYear();

const lastModification = document.querySelector(".lastModified");
const lastModif = new Date(document.lastModified);
const formattedDate = lastModif.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});
lastModification.innerHTML = `Last Modification: ${formattedDate}`;