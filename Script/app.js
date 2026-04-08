// Auto-update copyright year
const yearEl = document.getElementById("footer-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

// Carousel — drag to scroll + auto-scroll
const outer = document.querySelector(".carousel-outer");

if (outer) {
  // --- Auto-scroll (defined first so event listeners can reference them) ---
  let autoTimer = null;
  const SPEED = 0.4;
  let direction = 1;
  let scrollPos = 0;

  function autoScrollStep() {
    const maxScroll = outer.scrollWidth - outer.clientWidth;
    if (maxScroll <= 0) {
      autoTimer = requestAnimationFrame(autoScrollStep);
      return;
    }
    scrollPos += SPEED * direction;
    if (scrollPos >= maxScroll) { scrollPos = maxScroll; direction = -1; }
    else if (scrollPos <= 0) { scrollPos = 0; direction = 1; }
    outer.scrollLeft = scrollPos;
    autoTimer = requestAnimationFrame(autoScrollStep);
  }

  function startAutoScroll() {
    scrollPos = outer.scrollLeft;
    if (!autoTimer) autoTimer = requestAnimationFrame(autoScrollStep);
  }

  function stopAutoScroll() {
    if (autoTimer) {
      cancelAnimationFrame(autoTimer);
      autoTimer = null;
    }
    scrollPos = outer.scrollLeft;
  }

  // --- Drag to scroll (desktop) ---
  let isDragging = false;
  let hasDragged = false;
  let startX, startScrollLeft;

  outer.addEventListener("dragstart", (e) => e.preventDefault());

  outer.addEventListener("mousedown", (e) => {
    isDragging = true;
    hasDragged = false;
    outer.classList.add("dragging");
    startX = e.pageX - outer.offsetLeft;
    startScrollLeft = outer.scrollLeft;
    stopAutoScroll();
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    outer.classList.remove("dragging");
    if (hasDragged) {
      document.addEventListener("click", (e) => e.stopPropagation(), {
        capture: true,
        once: true,
      });
    }
    startAutoScroll();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - outer.offsetLeft;
    const diff = x - startX;
    if (Math.abs(diff) > 5) hasDragged = true;
    outer.scrollLeft = startScrollLeft - diff;
  });

  // Pause on hover, resume on leave
  outer.addEventListener("mouseenter", stopAutoScroll);
  outer.addEventListener("mouseleave", () => {
    if (!isDragging) startAutoScroll();
  });

  // Pause on touch, resume 2s after letting go
  outer.addEventListener("touchstart", stopAutoScroll, { passive: true });
  outer.addEventListener("touchend", () => setTimeout(startAutoScroll, 2000));

  window.addEventListener("load", startAutoScroll);
}

// Projects data — each object matches the order of cards in index.html
// project.html reads this to render the detail page
const projects = [
  {
    title: "MAE 1351 Final Project",
    images: [
      "images/project_Images/1351/MAE-1351.webp",
      "images/project_Images/1351/Picture3.webp",
      "images/project_Images/1351/Picture4.webp",
      "images/project_Images/1351/Picture5.webp",
      "images/project_Images/1351/Picture1.webp",
      "images/project_Images/1351/Picture2.webp",
      "images/project_Images/1351/Picture7.webp",
      "images/project_Images/1351/Picture8.webp",
      "images/project_Images/1351/Picture9.webp",
      "images/project_Images/1351/Picture10.webp",
      "images/project_Images/1351/Picture11.webp",
      "images/project_Images/1351/Picture12.webp",
      "images/project_Images/1351/Picture13.webp",
    ],
    tools: "Arduino, C++, 3D Printing, SolidWorks, SolidWorks Simulation",
    description:
      "In a team of 4, designed and 3D printed a fully automated, battery-powered ball-transfer mechanism controlled by an Arduino, capable of acquiring and delivering ping pong balls into a target cup from 6 feet away within 30 seconds. Integrated DC motors, drive wheels, and buck converters for power regulation into a self-contained system, with Arduino programming handling motor and servo control",
    challenges: "Write what was hard here.",
    results: "Write the outcome here.",
    video: "",
    github: "",
    live: "",
  },
  {
    title: "F405 Drone Build",
    images: [
      "images/project_Images/F405-Drone/F405-Drone.webp",
      "images/project_Images/F405-Drone/IMG_0411.webp",
      "images/project_Images/F405-Drone/IMG_0624.webp",
      "images/project_Images/F405-Drone/IMG_0433.webp",
      "images/project_Images/F405-Drone/IMG_0572.webp",
      "images/project_Images/F405-Drone/IMG_0626.webp",
      "images/project_Images/F405-Drone/IMG_5397.webp",
    ],
    tools: "Betaflight, Soldering, ESCs, GPS, 3D Printing",
    description:
      "Over winter 2025 break, assembled a fully functional drone from components including ESCs, flight controller, motors, and GPS, performing all wiring and soldering. 3D printed custom housings for the flight controller and GPS module, and configured flight parameters and PID tuning in Betaflight",
    challenges: "Write what was hard here.",
    results: "Write the outcome here.",
    video: "https://www.youtube.com/embed/vT9Ri4sB41k?si=_ZsVtJL3YgJyN4_I",
    youtube: "https://youtube.com/playlist?list=PLJGlvDl50mAk4ceH8hQe5lAylQNXesATw&si=uZkgRPRSHkPaOr4F",
    github: "",
    live: "",
  },
  {
    title: "Library Management System",
    images: [
      "images/project_Images/lib_management.webp",
    ],
    tools: "C++, File I/O, OOP",
    description:
      "Developed a console-based library management system in C++ featuring a menu-driven interface for adding and removing books and users, issuing and returning books, and displaying inventory. Implemented object-oriented design across three classes — Book, User, and Library — with file I/O for persistent data storage across sessions.",
    challenges: "Write what was hard here.",
    results: "Write the outcome here.",
    video: "",
    github: "https://github.com/VictoryUlasi/Library-Management-System",
    live: "",
  },
  {
    title: "Vector Calculator + GUI",
    images: [
      "images/project_Images/vectory_calculator.webp",
    ],
    tools: "C++, Qt, Gnuplot, OOP",
    description:
      "Developed a console-based vector calculator in C++ supporting both 2D and 3D vectors, with operations including addition, subtraction, scalar multiplication, dot product, cross product, magnitude, and angle between vectors. Implemented custom Vector2D and Vector3D classes with overloaded operators, integrated Gnuplot for real-time vector visualization, and extended the application with a Qt-based GUI transitioning from a console interface to a fully graphical desktop application.",
    challenges: "Write what was hard here.",
    results: "Write the outcome here.",
    video: "",
    youtube: "https://youtube.com/playlist?list=PLJGlvDl50mAmg3OLYDdICzrSzgk8wiWnX&si=phsbpr7kq-MLmVxn",
    github: "https://github.com/VictoryUlasi/Vector-Calculator-GUI-",
    live: "",
  },
  // add more projects here
];
