// Show the sidebar (called when hamburger menu icon is clicked)
function showSidebar() {
  const sideBar = document.querySelector(".sideBar");
  sideBar.style.display = "flex";

  if (window.innerWidth <= 600) {
    document.body.style.overflowY = "hidden";
  }
}

// Hide the sidebar (called when close button is clicked)
function hideSidebar() {
  const sideBar = document.querySelector(".sideBar");
  sideBar.style.display = "none";

  document.body.style.overflowY = "visible";
}

// Carousel
const track = document.querySelector(".carousel-track");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const cardWidth = getCardWidth();
let index = 0;

function updateCarousel() {
  const outer = document.querySelector(".carousel-outer");
  const visible = Math.floor(outer.offsetWidth / cardWidth);
  const total = track.children.length;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
  prev.disabled = index === 0;
  next.disabled = index >= total - visible;
}

function prevBtn() {
  index = Math.max(0, index - 1);
  updateCarousel();
}

function nextBtn() {
  const outer = document.querySelector(".carousel-outer");
  const visible = Math.floor(outer.offsetWidth / cardWidth);
  const total = track.children.length;
  index = Math.min(total - visible, index + 1);
  updateCarousel();
}

function getCardWidth() {
  const card = document.querySelector(".project-card");
  return card.offsetWidth + 24; // card width + gap
}

window.addEventListener("resize", updateCarousel);
updateCarousel();
