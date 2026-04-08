// Read project ID from URL query string
const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get("id"));

if (isNaN(projectId) || !projects[projectId]) {
  window.location.href = "index.html#project-sect";
}

const project = projects[projectId];
let currentImages = project.images;
let overlayIndex = 0;

// ─── Populate title ──────────────────────────────────────
document.title = "Victory Ulasi — " + project.title;
document.getElementById("project-title").textContent = project.title;

// ─── Populate links (between title and gallery) ──────────
const linksEl = document.getElementById("project-links");
if (project.github || project.youtube || project.live) {
  if (project.github) linksEl.innerHTML += `<a href="${project.github}" target="_blank">GitHub</a>`;
  if (project.youtube) linksEl.innerHTML += `<a href="${project.youtube}" target="_blank">YouTube</a>`;
  if (project.live)   linksEl.innerHTML += `<a href="${project.live}" target="_blank">Live Site</a>`;
  linksEl.className = "project-links";
}

// ─── Populate gallery ────────────────────────────────────
const gallery = document.getElementById("project-gallery");
const enlargedImg = document.getElementById("enlarged-img");

if (currentImages.length > 1) {
  currentImages.forEach((src, i) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.alt = project.title + " image " + (i + 1);
    thumb.className = "project-thumb" + (i === 0 ? " active" : "");
    thumb.addEventListener("click", () => selectImage(src, thumb));
    gallery.appendChild(thumb);
  });
} else {
  document.querySelector(".project-gallery-section").style.gap = "0";
}

enlargedImg.src = currentImages[0];
enlargedImg.alt = project.title;

function selectImage(src, thumbEl) {
  enlargedImg.src = src;
  document.querySelectorAll(".project-thumb").forEach(t => t.classList.remove("active"));
  if (thumbEl) thumbEl.classList.add("active");
  overlayIndex = currentImages.indexOf(src);
}

// ─── Gallery drag + auto-scroll ──────────────────────────
if (currentImages.length > 1) {
  let galleryAutoTimer = null;
  const GALLERY_SPEED = 0.2;
  let galleryDir = 1;
  let galleryScrollPos = 0;

  function galleryStep() {
    const max = gallery.scrollWidth - gallery.clientWidth;
    if (max <= 0) { galleryAutoTimer = requestAnimationFrame(galleryStep); return; }
    galleryScrollPos += GALLERY_SPEED * galleryDir;
    if (galleryScrollPos >= max) { galleryScrollPos = max; galleryDir = -1; }
    else if (galleryScrollPos <= 0) { galleryScrollPos = 0; galleryDir = 1; }
    gallery.scrollLeft = galleryScrollPos;
    galleryAutoTimer = requestAnimationFrame(galleryStep);
  }

  function startGalleryScroll() {
    galleryScrollPos = gallery.scrollLeft;
    if (!galleryAutoTimer) galleryAutoTimer = requestAnimationFrame(galleryStep);
  }

  function stopGalleryScroll() {
    if (galleryAutoTimer) { cancelAnimationFrame(galleryAutoTimer); galleryAutoTimer = null; }
    galleryScrollPos = gallery.scrollLeft;
  }

  // Drag to scroll
  let isDragging = false;
  let hasDragged = false;
  let startX, startScrollLeft;

  gallery.addEventListener("dragstart", (e) => e.preventDefault());

  gallery.addEventListener("mousedown", (e) => {
    isDragging = true;
    hasDragged = false;
    gallery.classList.add("dragging");
    startX = e.pageX - gallery.offsetLeft;
    startScrollLeft = gallery.scrollLeft;
    stopGalleryScroll();
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    gallery.classList.remove("dragging");
    if (hasDragged) {
      document.addEventListener("click", (e) => e.stopPropagation(), { capture: true, once: true });
    }
    startGalleryScroll();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const diff = x - startX;
    if (Math.abs(diff) > 5) hasDragged = true;
    gallery.scrollLeft = startScrollLeft - diff;
  });

  gallery.addEventListener("mouseenter", stopGalleryScroll);
  gallery.addEventListener("mouseleave", () => { if (!isDragging) startGalleryScroll(); });
  gallery.addEventListener("touchstart", stopGalleryScroll, { passive: true });
  gallery.addEventListener("touchend", () => setTimeout(startGalleryScroll, 1500));

  window.addEventListener("load", startGalleryScroll);
}

// ─── Populate info ───────────────────────────────────────
document.getElementById("project-tools").innerHTML = "<strong>Tools:</strong> " + project.tools;
document.getElementById("project-desc").textContent = project.description;
document.getElementById("project-challenges").innerHTML = "<strong>Challenges:</strong> " + project.challenges;
document.getElementById("project-results").innerHTML = "<strong>Results:</strong> " + project.results;

// ─── Populate media (lazy YouTube embed) ────────────────
const media = document.getElementById("project-media");
if (project.video) {
  // Extract video ID for thumbnail, load iframe only on click
  const videoIdMatch = project.video.match(/embed\/([^?]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  const wrapper = document.createElement("div");
  wrapper.className = "video-wrapper";

  if (videoId) {
    wrapper.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;
    wrapper.innerHTML = `<button class="video-play-btn" aria-label="Play video">&#9654;</button>`;
    wrapper.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = project.video + "&autoplay=1";
      iframe.className = "project-video";
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      wrapper.replaceWith(iframe);
    });
  } else {
    const iframe = document.createElement("iframe");
    iframe.src = project.video;
    iframe.className = "project-video";
    iframe.allowFullscreen = true;
    wrapper.replaceWith(iframe);
  }

  media.appendChild(wrapper);
}

// ─── Fullscreen overlay ──────────────────────────────────
function openImgOverlay() {
  overlayIndex = currentImages.indexOf(enlargedImg.src.replace(location.origin + "/", ""));
  if (overlayIndex === -1) overlayIndex = 0;
  document.getElementById("img-overlay-img").src = currentImages[overlayIndex];
  document.getElementById("img-overlay").style.display = "flex";
}

function closeImgOverlay() {
  document.getElementById("img-overlay").style.display = "none";
}

function overlayPrev() {
  overlayIndex = Math.max(0, overlayIndex - 1);
  document.getElementById("img-overlay-img").src = currentImages[overlayIndex];
}

function overlayNext() {
  overlayIndex = Math.min(currentImages.length - 1, overlayIndex + 1);
  document.getElementById("img-overlay-img").src = currentImages[overlayIndex];
}
