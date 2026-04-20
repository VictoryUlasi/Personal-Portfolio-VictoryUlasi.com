// About Me — stacked card auto-swipe every 1.5s
const photoCards = document.querySelectorAll(".photo-card");
if (photoCards.length) {
  let active = 0;
  const total = photoCards.length;

  function updatePositions() {
    photoCards.forEach((card, i) => {
      card.dataset.pos = (i - active + total) % total;
    });
  }

  let swipeRight = true;

  function swipeNext() {
    const dir = swipeRight ? "swipe-right" : "swipe-left";
    photoCards[active].classList.add(dir);
    setTimeout(() => {
      photoCards[active].classList.remove(dir);
      active = (active + 1) % total;
      updatePositions();
    }, 450);
    swipeRight = !swipeRight;
  }

  updatePositions();
  setInterval(swipeNext, 3500);
}

// Scroll reveal — trigger animations when sections enter the viewport
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
if (revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach((el) => observer.observe(el));
}

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
  const SPEED = 0.28;
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

  window.addEventListener("load", () => setTimeout(startAutoScroll, 2500));
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
    description: "TODO :(",
    challenges: "TODO :)",
    results: "TODO :/",
    video: "https://www.youtube.com/embed/vT9Ri4sB41k?si=_ZsVtJL3YgJyN4_I",
    youtube:
      "https://youtube.com/playlist?list=PLJGlvDl50mAk4ceH8hQe5lAylQNXesATw&si=uZkgRPRSHkPaOr4F",
    github: "",
    live: "",
  },
  {
    title: "Engineering Statics Beam Solver",
    images: [
      "images/project_Images/Beam-Solver/plot1.webp",
      "images/project_Images/Beam-Solver/output_img.webp",
    ],
    tools: "MATLAB, Engineering Statics",
    description:
      "Designed and built a MATLAB-based structural beam solver for statically determinate pin-roller beams. Takes user-defined point loads and distributed loads as input, solves for support reactions using matrix equilibrium equations, and outputs shear force and bending moment diagrams with real-time value queries at any position along the beam.",
    challenges:
      "The biggest challenge was bridging the gap between solving beam problems by hand and automating them correctly in code. Setting up the equilibrium system as Ax = b required translating three scalar equations into matrix form and understanding what each coefficient represented, a conceptual leap from plug-and-chug statics. Handling distributed loads added another layer: the equivalent point load works for reactions but breaks down for the shear diagram, where load intensity has to be evaluated continuously at every point. Getting sign conventions consistent across point loads, distributed loads, and reactions without introducing subtle errors required careful thought about what positive and negative actually mean physically. Indexing the linspace array accurately for arbitrary user-entered positions was a smaller but real debugging challenge that exposed how discretization introduces numerical error.",
    results:
      "Delivered a working MATLAB beam solver that accepts user-defined point loads and distributed loads for a pin-roller beam of any length. The solver correctly computes support reactions by assembling and solving a 3x3 equilibrium matrix, converts trapezoidal distributed loads to equivalent point loads using the centroid integral formula, and builds shear and bending moment diagrams across 1000 discrete points along the beam. Shear is computed by accumulating forces left to right and moment by numerically integrating shear using cumulative summation, directly applying the dM/dx = V relationship from statics. Results are visualized in a clean two-panel MATLAB figure with labeled axes and a zero reference line, and shear and moment values can be queried at any position along the beam. Distributed load shear contribution, additional support types, and a beam visualization panel are planned as next extensions.",
    video: "",
    youtube: "",
    github: "https://github.com/VictoryUlasi/Engineering-Statics-BeamSolver",
    live: "",
  },
  {
    title: "Library Management System",
    images: ["images/project_Images/lib_management.webp"],
    tools: "C++, File I/O, OOP, Windows API",
    description:
      "A Windows console application that manages a library catalog of books and users. Supports adding and removing books and users, issuing and returning books, and displaying the full inventory with checkout status. All data persists between sessions using semicolon-delimited flat text files (libBook.txt, libUser.txt), loaded into memory at startup across three classes — Book, User, and Library, and written back on every change.",
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

// Contact form — Formspree AJAX submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("form-submit-btn");
    const status = document.getElementById("form-status");

    btn.disabled = true;
    btn.textContent = "Sending…";
    status.textContent = "";
    status.className = "form-status";

    try {
      const res = await fetch("https://formspree.io/f/xdaydgwn", {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        status.textContent = "Message sent! I'll get back to you soon.";
        status.className = "form-status success";
        contactForm.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        status.textContent =
          data?.errors?.[0]?.message ||
          "Something went wrong. Please try again.";
        status.className = "form-status error";
      }
    } catch {
      status.textContent = "Network error. Please try again.";
      status.className = "form-status error";
    } finally {
      btn.disabled = false;
      btn.textContent = "Send Message";
    }
  });
}
