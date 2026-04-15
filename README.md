# Victory Ulasi — Personal Portfolio

Live at **[victoryulasi.com](https://victoryulasi.com)**

Personal portfolio site for Victory Ulasi, Aerospace Engineering student at UT Arlington, Private Pilot, and Maker/Hobbyist. Built from scratch with vanilla HTML, CSS, and JavaScript — no frameworks.

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, flexbox, grid, `clamp()`, `backdrop-filter`, scroll-reveal animations
- **Vanilla JavaScript** — IntersectionObserver, requestAnimationFrame, drag-to-scroll, lazy YouTube embeds
- **GitHub Pages** — hosting with custom domain via CNAME
- **WebP images** — all images converted for performance

---

## Features

- **Hero section** — full-viewport name display with staggered slide-in taglines
- **About Me** — stacked card photo deck that auto-swipes with alternating left/right transitions
- **Projects carousel** — drag-to-scroll + auto-scroll showcase with dedicated project pages
- **Project pages** — single-template `project.html?id=X` routing, gallery, lazy YouTube embeds
- **Contact section** — icon + link list with scroll-reveal stagger
- **Scroll reveal animations** — fade/slide-in on scroll using IntersectionObserver
- **Responsive** — mobile-first with hamburger sidebar nav, fixed mobile header, wrapping hero text
- **Performance** — WebP images throughout, lazy video embeds, no external JS libraries

---

## Project Sections

| Project | Stack |
|---|---|
| MAE 1351 Final Project | Arduino, C++, 3D Printing, SolidWorks |
| F405 Drone Build | Betaflight, Electronics, 3D Printing |
| Library Management System | C++, OOP, File I/O |
| Vector Calculator + GUI | C++, Qt, Gnuplot |

---

## Structure

```
├── index.html              # Main portfolio page
├── project.html            # Single-template project detail page
├── Script/
│   ├── app.js              # Main JS (carousel, photo stack, scroll reveal)
│   └── project.js          # Project page JS (gallery, routing, lazy embeds)
├── styles/
│   ├── general.css         # Layout, sections, animations
│   ├── header.css          # Nav bar + dropdown
│   ├── sidebar.css         # Mobile sidebar
│   └── project.css         # Project page styles
├── images/                 # WebP images (background, about me, projects, icons)
└── files/                  # Resume PDFs
```

---

## Running Locally

No build step required — just open `index.html` in a browser or serve with any static file server:

```bash
npx serve .
```

---

## Contact

- **Email** — victoryulasi@icloud.com
- **LinkedIn** — [linkedin.com/in/victoryulasi](https://www.linkedin.com/in/victoryulasi/)
- **GitHub** — [github.com/VictoryUlasi](https://github.com/VictoryUlasi)
- **YouTube** — [@VictoryUUlasi](https://www.youtube.com/@VictoryUUlasi)
- **Instagram** — [@uuvictory](https://www.instagram.com/uuvictory/)

---

&copy; 2026 Victory Ulasi. All rights reserved.
