// Photos array — add filenames here as you add images
// thumbs: shown in grid (lazy loaded, ~800px wide WebP)
// full: shown in lightbox (~2400px wide WebP)
const photos = [
  { thumb: "images/photography/thumbs/IMG_2005.webp", full: "images/photography/full/IMG_2005.webp", alt: "Southwest 737 takeoff", caption: "Southwest B737 rotation off 31R — DAL" },
  { thumb: "images/photography/thumbs/20260611_0022_01.webp", full: "images/photography/full/20260611_0022_01.webp", alt: "Flamingos", caption: "Flamingo flock at the Fort Worth Zoo — June 2026" },
  { thumb: "images/photography/thumbs/IMG_2258.webp", full: "images/photography/full/IMG_2258.webp", alt: "UTA big chair", caption: "The big UTA chair — campus landmark, UT Arlington" },
  { thumb: "images/photography/thumbs/IMG_1643.webp", full: "images/photography/full/IMG_1643.webp", alt: "Horsemint wildflowers", caption: "Horsemint wildflowers with a pollinator — Texas spring" },
  { thumb: "images/photography/thumbs/IMG_2077.webp", full: "images/photography/full/IMG_2077.webp", alt: "JSX Freedom One", caption: "JSX Freedom One — patriotic livery, DAL" },
  { thumb: "images/photography/thumbs/IMG_1855.webp", full: "images/photography/full/IMG_1855.webp", alt: "Blue-nose pitbull", caption: "Happy blue-nose pit at the park" },
  { thumb: "images/photography/thumbs/20260611_0077_01.webp", full: "images/photography/full/20260611_0077_01.webp", alt: "Black jaguar", caption: "Black jaguar — those eyes don't miss anything — June 2026" },
  { thumb: "images/photography/thumbs/IMG_1635.webp", full: "images/photography/full/IMG_1635.webp", alt: "AT&T Stadium FIFA 2026", caption: "AT&T Stadium — FIFA World Cup 2026 — Arlington, TX" },
  { thumb: "images/photography/thumbs/IMG_2129.webp", full: "images/photography/full/IMG_2129.webp", alt: "Embraer Phenom 300", caption: "Embraer Phenom 300 N344FX touchdown — DAL" },
  { thumb: "images/photography/thumbs/IMG_1693.webp", full: "images/photography/full/IMG_1693.webp", alt: "Egret in flight", caption: "Egret taking flight, reflected on still water" },
  { thumb: "images/photography/thumbs/IMG_2322.webp", full: "images/photography/full/IMG_2322.webp", alt: "UTA neon sign", caption: "The Urban University — UTA neon sign" },
  { thumb: "images/photography/thumbs/20260611_0035.webp", full: "images/photography/full/20260611_0035.webp", alt: "Mallard duck", caption: "Mallard duck at the water's edge — June 2026" },
  { thumb: "images/photography/thumbs/IMG_2040.webp", full: "images/photography/full/IMG_2040.webp", alt: "Gulfstream panning shot", caption: "Gulfstream IV panning shot — DAL" },
  { thumb: "images/photography/thumbs/IMG_1769.webp", full: "images/photography/full/IMG_1769.webp", alt: "Guitar headstock", caption: "Orangewood acoustic — the other thing I build things with" },
  { thumb: "images/photography/thumbs/20260611_0069.webp", full: "images/photography/full/20260611_0069.webp", alt: "Waterfall", caption: "Waterfall at the Fort Worth Zoo — June 2026" },
  { thumb: "images/photography/thumbs/IMG_2169.webp", full: "images/photography/full/IMG_2169.webp", alt: "Southwest 737 touchdown", caption: "Southwest 737 MAX touching down — DAL" },
  { thumb: "images/photography/thumbs/IMG_1646.webp", full: "images/photography/full/IMG_1646.webp", alt: "Indian blanket wildflowers", caption: "Indian blanket wildflowers with a honeybee — Texas summer" },
  { thumb: "images/photography/thumbs/IMG_2103.webp", full: "images/photography/full/IMG_2103.webp", alt: "Challenger 350 departure", caption: "Bombardier Challenger 350 N501FX rotating off 31R — DAL" },
  { thumb: "images/photography/thumbs/20260611_0082.webp", full: "images/photography/full/20260611_0082.webp", alt: "Crowned eagle", caption: "Crowned eagle at the aviary — June 2026" },
  { thumb: "images/photography/thumbs/IMG_2314.webp", full: "images/photography/full/IMG_2314.webp", alt: "Water wall fountain", caption: "Campus water wall at golden hour — UT Arlington" },
  { thumb: "images/photography/thumbs/IMG_2167_01.webp", full: "images/photography/full/IMG_2167_01.webp", alt: "King Air nose closeup", caption: "Beechcraft King Air — up close on the nose" },
  { thumb: "images/photography/thumbs/20260528_0031_02.webp", full: "images/photography/full/20260528_0031_02.webp", alt: "Trumpet vine blooming", caption: "Trumpet vine blooming through the canopy — May 2026" },
  { thumb: "images/photography/thumbs/IMG_2029.webp", full: "images/photography/full/IMG_2029.webp", alt: "Navy P-8 Poseidon", caption: "US Navy P-8 Poseidon on the ramp — DAL" },
  { thumb: "images/photography/thumbs/IMG_1860.webp", full: "images/photography/full/IMG_1860.webp", alt: "Pitbull in grass", caption: "Living her best life — River Legacy Park" },
  { thumb: "images/photography/thumbs/20260611_0057.webp", full: "images/photography/full/20260611_0057.webp", alt: "Rhino in water", caption: "Indian one-horned rhino cooling off — June 2026" },
  { thumb: "images/photography/thumbs/IMG_2106.webp", full: "images/photography/full/IMG_2106.webp", alt: "Dassault Falcon 900", caption: "Dassault Falcon 900 rolling past Atlantic FBO — DAL" },
  { thumb: "images/photography/thumbs/IMG_2299.webp", full: "images/photography/full/IMG_2299.webp", alt: "Horse sculpture UTA", caption: "Maverick horse sculpture — UTA campus" },
  { thumb: "images/photography/thumbs/IMG_2184.webp", full: "images/photography/full/IMG_2184.webp", alt: "Bombardier Global", caption: "Bombardier Global taxiing under the tower — DAL" },
  { thumb: "images/photography/thumbs/20260611_0074.webp", full: "images/photography/full/20260611_0074.webp", alt: "African wild dogs", caption: "African wild dogs resting in the shade — June 2026" },
  { thumb: "images/photography/thumbs/IMG_2540_01.webp", full: "images/photography/full/IMG_2540_01.webp", alt: "Bridge at golden hour", caption: "Bridge at golden hour — Johnson Creek, Grand Prairie" },
  { thumb: "images/photography/thumbs/IMG_2111.webp", full: "images/photography/full/IMG_2111.webp", alt: "Gulfstream G450", caption: "Gulfstream G450 N450FX on final — DAL" },
  { thumb: "images/photography/thumbs/20260620_0006.webp", full: "images/photography/full/20260620_0006.webp", alt: "Grand Prairie Police", caption: "Grand Prairie Police outside the station — June 2026" },
  { thumb: "images/photography/thumbs/20260611_0062.webp", full: "images/photography/full/20260611_0062.webp", alt: "Red-crowned crane", caption: "Red-crowned crane through the foliage — June 2026" },
  { thumb: "images/photography/thumbs/IMG_1959.webp", full: "images/photography/full/IMG_1959.webp", alt: "Gulfstream on final", caption: "Gulfstream GIV-SP on short final — DAL" },
  { thumb: "images/photography/thumbs/IMG_2297_01.webp", full: "images/photography/full/IMG_2297_01.webp", alt: "Architect names tile wall", caption: "Architect names etched in tile — UTA Architecture building" },
  { thumb: "images/photography/thumbs/IMG_1674.webp", full: "images/photography/full/IMG_1674.webp", alt: "Snowy egret", caption: "Snowy egret hunting along the stream" },
  { thumb: "images/photography/thumbs/IMG_2114.webp", full: "images/photography/full/IMG_2114.webp", alt: "Cessna Citation CJ", caption: "Cessna Citation CJ on short final — DAL" },
  { thumb: "images/photography/thumbs/20260620_0008.webp", full: "images/photography/full/20260620_0008.webp", alt: "American flag at night", caption: "Stars and stripes at night, Epic Waters Grand Prairie — June 2026" },
  { thumb: "images/photography/thumbs/IMG_2587_02.webp", full: "images/photography/full/IMG_2587_02.webp", alt: "Jacket in a tree", caption: "Left in the tree — someone's hoodie, someone's story" },
  { thumb: "images/photography/thumbs/IMG_2202.webp", full: "images/photography/full/IMG_2202.webp", alt: "Southwest America 250 livery", caption: "Southwest Airlines 'America 250' special livery — DAL" },
  { thumb: "images/photography/thumbs/IMG_1658.webp", full: "images/photography/full/IMG_1658.webp", alt: "Great blue heron", caption: "Great blue heron across the field" },
  { thumb: "images/photography/thumbs/IMG_2155.webp", full: "images/photography/full/IMG_2155.webp", alt: "Falcon taxiing with Dallas skyline", caption: "Dassault Falcon taxiing with the Dallas skyline — DAL" },
  { thumb: "images/photography/thumbs/IMG_1618.webp", full: "images/photography/full/IMG_1618.webp", alt: "PBR Dallas", caption: "PBR Dallas and Blue Moon Tap Room, Globe Life Field district — Arlington" },
  { thumb: "images/photography/thumbs/IMG_2065.webp", full: "images/photography/full/IMG_2065.webp", alt: "Dassault Falcon panning", caption: "Dassault Falcon 50 panning shot — DAL" },
  { thumb: "images/photography/thumbs/IMG_1721.webp", full: "images/photography/full/IMG_1721.webp", alt: "Great-tailed grackle", caption: "Great-tailed grackle — the unofficial bird of Texas" },
  { thumb: "images/photography/thumbs/IMG_2160.webp", full: "images/photography/full/IMG_2160.webp", alt: "Beechcraft King Air 350", caption: "Beechcraft King Air 350 taxiing — DAL" },
  { thumb: "images/photography/thumbs/IMG_1633.webp", full: "images/photography/full/IMG_1633.webp", alt: "AT&T Stadium through flowers", caption: "AT&T Stadium through the crepe myrtles — FIFA World Cup 2026 branding already up" },
  { thumb: "images/photography/thumbs/IMG_2089.webp", full: "images/photography/full/IMG_2089.webp", alt: "Challenger 350 taxiing", caption: "Bombardier Challenger 350 taxiing past the tower — DAL" },
  { thumb: "images/photography/thumbs/IMG_1776_01.webp", full: "images/photography/full/IMG_1776_01.webp", alt: "Turtle on a log", caption: "Pond slider basking on a log — River Legacy Park" },
  { thumb: "images/photography/thumbs/IMG_2001.webp", full: "images/photography/full/IMG_2001.webp", alt: "Jet climbing out", caption: "N738N climbing out over Love Field" },
  { thumb: "images/photography/thumbs/IMG_1917_01.webp", full: "images/photography/full/IMG_1917_01.webp", alt: "Runway approach lights", caption: "Runway approach lighting system — Corsicana Municipal Airport" },
  { thumb: "images/photography/thumbs/IMG_2000.webp", full: "images/photography/full/IMG_2000.webp", alt: "Citation departing", caption: "N738N departing off 31R — DAL" },
  { thumb: "images/photography/thumbs/20260528_0081_02.webp", full: "images/photography/full/20260528_0081_02.webp", alt: "Desert hillside town", caption: "Rooftops and desert hillside — May 2026" },
  { thumb: "images/photography/thumbs/IMG_1626.webp", full: "images/photography/full/IMG_1626.webp", alt: "Crepe myrtle in bloom", caption: "Crepe myrtle in bloom outside the Engineering building — UTA" },
  { thumb: "images/photography/thumbs/IMG_2145.webp", full: "images/photography/full/IMG_2145.webp", alt: "Gulfstream G500", caption: "Gulfstream G500 N963U touching down — DAL" },
  { thumb: "images/photography/thumbs/IMG_2168.webp", full: "images/photography/full/IMG_2168.webp", alt: "King Air 200", caption: "King Air 200 — different angle, same aircraft" },
  { thumb: "images/photography/thumbs/IMG_2223.webp", full: "images/photography/full/IMG_2223.webp", alt: "Embraer Praetor 600", caption: "Embraer Praetor 600 in custom gold livery N1Y — DAL" },
];

// ─── Build Grid ───────────────────────────────────────────
const grid = document.getElementById("photo-grid");

if (photos.length === 0) {
  grid.innerHTML = `<p style="color:rgba(255,255,255,0.5);text-align:center;grid-column:1/-1;padding:4rem 0">Photos coming soon.</p>`;
} else {
  photos.forEach((photo, i) => {
    const item = document.createElement("div");
    item.className = "photo-grid-item";
    item.innerHTML = `
      <img src="${photo.thumb}" alt="${photo.alt}" loading="lazy" />
      ${photo.caption ? `<div class="photo-caption">${photo.caption}</div>` : ""}
    `;
    item.addEventListener("click", () => openLightbox(i));
    grid.appendChild(item);
  });
}

// ─── Lightbox ─────────────────────────────────────────────
let currentIndex = 0;
const lightbox = document.getElementById("photo-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxCaptionText = document.getElementById("lightbox-caption-text");

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const photo = photos[currentIndex];
  lightboxImg.src = photo.full;
  lightboxImg.alt = photo.alt;
  lightboxCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
  lightboxCaptionText.textContent = photo.caption || "";
}

function lightboxPrev() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  updateLightbox();
}

function lightboxNext() {
  currentIndex = (currentIndex + 1) % photos.length;
  updateLightbox();
}

// ─── Keyboard navigation ──────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "ArrowLeft") lightboxPrev();
  if (e.key === "ArrowRight") lightboxNext();
  if (e.key === "Escape") closeLightbox();
});
