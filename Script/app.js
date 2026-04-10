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
    if (scrollPos >= maxScroll) {
      scrollPos = maxScroll;
      direction = -1;
    } else if (scrollPos <= 0) {
      scrollPos = 0;
      direction = 1;
    }
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
    challenges:
      "The biggest challenge was meeting all competition constraints simultaneously — the mechanism had to acquire and deliver a ping pong ball from 6 feet away in under 30 seconds while starting atleast 1-foot away from the ball and cup, simulating a horizontal barrier, running entirely on battery, and starting from a single button press with no further human input. Designing the drive system and ball-acquisition geometry in SolidWorks required multiple iteration cycles before we had clearances that worked in simulation and in print. Power management was another hurdle: integrating buck converters to regulate voltage across the DC motors and servos without brownouts took considerable tuning and a fried arduino MEGA. On the software side, coordinating motor timing, servo actuation, and autonomous sequencing in Arduino C++ with no real-time OS meant hand-tuning delays and testing edge cases on the physical robot.",
    results:
      "The team delivered a fully autonomous, battery-powered ball-transfer robot that met all competition requirements. It successfully acquired a ping pong ball and deposited it into the target cup from 6 feet away within the 30-second window, clearing the required horizontal obstacle on every run. The final assembly incorporated multiple 3D-printed structural components designed in SolidWorks and simulated using SolidWorks Simulation, a custom buck-converter power circuit, and an Arduino control system handling all motor and servo sequencing. The project earned a 3 out of 2 for transferring more balls than were required, and it served as a practical introduction to the full mechanical-electrical-software integration cycle.",
    video: "https://www.youtube.com/embed/WOMEKv_0r2U?si=bsQVDOBgL1JcOevD",
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
    challenges: "",
    results: "",
    video: "https://www.youtube.com/embed/vT9Ri4sB41k?si=_ZsVtJL3YgJyN4_I",
    youtube:
      "https://youtube.com/playlist?list=PLJGlvDl50mAk4ceH8hQe5lAylQNXesATw&si=uZkgRPRSHkPaOr4F",
    github: "",
    live: "",
  },
  {
    title: "Library Management System",
    images: ["images/project_Images/lib_management.webp"],
    tools: "C++, File I/O, OOP, Windows API",
    description:
      "A Windows console application that manages a library catalog of books and users. Supports adding and removing books and users, issuing and returning books, and displaying the full inventory with checkout status. All data persists between sessions using semicolon-delimited flat text files (libBook.txt, libUser.txt), loaded into memory at startup across three classes — Book, User, and Library — and written back on every change.",
    challenges:
      "The biggest challenge was implementing reliable file persistence without a database. Since there is no DELETE in a flat file, removing a record requires rewriting the entire file from scratch. I also had to force the OS to flush write buffers mid-session using a refresh() function that closes and reopens the output stream after each add operation, rather than only writing on program exit. Input validation was handled manually with character-by-character digit checks and cin recovery loops since there was no framework to lean on.",
    results:
      "A fully working library system with clean three-class OOP design and persistent storage across sessions. The project ships with 20 sample books and 20 sample users pre-loaded. It demonstrated practical tradeoffs in flat-file architecture versus a proper database, which is listed as the next step in the project roadmap alongside a planned GUI.",
    video: "",
    github: "https://github.com/VictoryUlasi/Library-Management-System",
    live: "",
  },
  {
    title: "Vector Calculator + GUI",
    images: ["images/project_Images/vectory_calculator.webp"],
    tools: "C++17, Qt 6, Gnuplot, Boost, Visual Studio, CMake",
    description:
      "Built in two stages: first a console-based REPL in Visual Studio using custom Vector2D and Vector3D classes with operator overloads, supporting addition, subtraction, scalar multiplication, dot product, cross product, magnitude, angle between vectors, and real-time Gnuplot visualization of vector arrows. Then rebuilt the entire interface as a Qt 6 desktop GUI with form fields, live result display, and progressive UI disclosure — checkboxes dynamically unlock 3D fields, scalar mode, and magnitude mode to prevent invalid operation combinations.",
    challenges:
      "The main technical challenge in the GUI version was handling both 2D and 3D vectors through a single unified interface without duplicating every operation handler. This was solved using C++17 std::variant and std::visit with if constexpr type checks at compile time, so dimension mismatches are caught without runtime branching or inheritance. In the console version, integrating Gnuplot required piping commands through the gnuplot-iostream header-only library and normalizing both vectors to unit length before plotting so the visualization always fits within fixed axes.",
    results:
      "Two fully functional applications sharing the same math kernel (Vector2D/Vector3D classes), demonstrating how a clean separation between math logic and UI layer allows the same core to power both a console tool and a graphical desktop app. The GUI version enforces valid application state at all times through widget enable/disable logic, and the console version produces live 2D and 3D vector plots via Gnuplot.",
    video: "",
    youtube:
      "https://youtube.com/playlist?list=PLJGlvDl50mAmg3OLYDdICzrSzgk8wiWnX&si=phsbpr7kq-MLmVxn",
    github: "https://github.com/VictoryUlasi/Vector-Calculator-GUI-",
    live: "",
  },
  // add more projects here
];
