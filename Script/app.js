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
function getCardWidth() {
  const card = document.querySelector(".project-card");
  const track = document.querySelector(".carousel-track");
  const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
  return card.offsetWidth + gap;
}

const track = document.querySelector(".carousel-track");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
let index = 0;

function updateCarousel() {
  const cardWidth = getCardWidth();
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
  const cardWidth = getCardWidth();
  const outer = document.querySelector(".carousel-outer");
  const visible = Math.floor(outer.offsetWidth / cardWidth);
  const total = track.children.length;
  index = Math.min(total - visible, index + 1);
  updateCarousel();
}

window.addEventListener("resize", updateCarousel);
updateCarousel();

//Modal
function openModal(index) {
  const project = projects[index];
  const content = document.getElementById("modal-content");

  content.innerHTML = `
  <div class="modal-gallery">
    ${project.images
      .map(
        (img, i) => `
  <img src="${img}" class="modal-thumb" onclick="enlargeImage('${img}'); overlayIndex=${i};" />
`,
      )
      .join("")}
  </div>
  <div class="modal-enlarged" id="modal-enlarged">
    <img src="${project.images[0]}" id="enlarged-img" onclick="openImgOverlay(${index})" />
  </div>
    <h2 class="modal-title">${project.title}</h2>
    <p class="modal-tools"><strong>Tools:</strong> ${project.tools}</p>
    <p class="modal-desc">${project.description}</p>
    <p class="modal-challenges"><strong>Challenges:</strong> ${project.challenges}</p>
    <p class="modal-results"><strong>Results:</strong> ${project.results}</p>
    ${project.video ? `<iframe src="${project.video}" class="modal-video" allowfullscreen></iframe>` : ""}
    <div class="modal-links">
      ${project.github ? `<a href="${project.github}" target="_blank">GitHub</a>` : ""}
      ${project.live ? `<a href="${project.live}" target="_blank">Live Site</a>` : ""}
    </div>
  `;

  document.getElementById("modal-overlay").style.display = "flex";
  document.body.style.overflowY = "hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
  document.body.style.overflowY = "visible";
}

function enlargeImage(src) {
  document.getElementById("enlarged-img").src = src;
  document.querySelectorAll(".modal-thumb").forEach((thumb) => {
    thumb.classList.remove("active");
    if (thumb.src.includes(src.split("/").pop())) {
      thumb.classList.add("active");
    }
  });
}

let overlayImages = [];
let overlayIndex = 0;

function openImgOverlay(projectIndex) {
  overlayImages = projects[projectIndex].images;
  overlayIndex = 0;
  document.getElementById("img-overlay-img").src = overlayImages[overlayIndex];
  document.getElementById("img-overlay").style.display = "flex";
}

function overlayPrev() {
  overlayIndex = Math.max(0, overlayIndex - 1);
  document.getElementById("img-overlay-img").src = overlayImages[overlayIndex];
}

function overlayNext() {
  overlayIndex = Math.min(overlayImages.length - 1, overlayIndex + 1);
  document.getElementById("img-overlay-img").src = overlayImages[overlayIndex];
}

function closeImgOverlay() {
  document.getElementById("img-overlay").style.display = "none";
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById("img-overlay")) {
    closeImgOverlay();
  }
}

document
  .getElementById("modal-overlay")
  .addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

//PROJECTS 4 MODAL
//Project Class Each Object represents 1 project and they must match order in project section container
const projects = [
  {
    title: "MAE 1351 Final Project",
    images: [
      "images/project_Images/MAE-1351.jpeg",
      "images/project_Images/MAE-1351-cad.jpeg",
      "images/project_Images/MAE-1351-build.jpeg",
    ],
    tools: "Arduino, C++, 3D Printing, DC Motors, Buck Converters",
    description:
      "In a team of 4, designed and 3D printed a fully automated, battery-powered ball-transfer mechanism controlled by an Arduino, capable of acquiring and delivering ping pong balls into a target cup from 6 feet away within 30 seconds. Integrated DC motors, drive wheels, and buck converters for power regulation into a self-contained system, with Arduino programming handling motor and servo control",
    challenges: "Write what was hard here.",
    results: "Write the outcome here.",
    video: "", // youtube embed URL or leave empty
    github: "",
    live: "",
  },
  {
    title: "F405 Drone Build",
    images: [
      "images/project_Images/F405-Drone.jpeg",
      "images/project_Images/MAE-1351-cad.jpeg",
      "images/project_Images/MAE-1351-build.jpeg",
    ],
    tools: "Betaflight, Soldering, ESCs, GPS, 3D Printing",
    description:
      "Over winter 2025 break, assembled a fully functional drone from components including ESCs, flight controller, motors, and GPS, performing all wiring and soldering. 3D printed custom housings for the flight controller and GPS module, and configured flight parameters and PID tuning in Betaflight",
    challenges: "Write what was hard here.",
    results: "Write the outcome here.",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    github: "",
    live: "",
  },
  {
    title: "Library Management System",
    images: [
      "images/project_Images/lib_management.png",
      "images/project_Images/MAE-1351-cad.jpeg",
      "images/project_Images/MAE-1351-build.jpeg",
    ],
    tools: "Betaflight, Soldering, ESCs, GPS, 3D Printing",
    description:
      "Developed a console-based library management system in C++ featuring a menu-driven interface for adding and removing books and users, issuing and returning books, and displaying inventory. Implemented object-oriented design across three classes — Book, User, and Library — with file I/O for persistent data storage across sessions.",
    challenges: "Write what was hard here.",
    results: "Write the outcome here.",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    github: "",
    live: "",
  },
  {
    title: "Simple Vector Calculator",
    images: [
      "images/project_Images/vectory_calculator.png",
      "images/project_Images/MAE-1351-cad.jpeg",
      "images/project_Images/MAE-1351-build.jpeg",
    ],
    tools: "Betaflight, Soldering, ESCs, GPS, 3D Printing",
    description:
      "Developed a console-based vector calculator in C++ supporting both 2D and 3D vectors, with operations including addition, subtraction, scalar multiplication, dot product, cross product, magnitude, and angle between vectors. Implemented custom Vector2D and Vector3D classes with overloaded operators, integrated Gnuplot for real-time vector visualization, and extended the application with a Qt-based GUI transitioning from a console interface to a fully graphical desktop application.",
    challenges: "Write what was hard here.",
    results: "Write the outcome here.",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    github: "",
    live: "",
  },
  // add projects
];
