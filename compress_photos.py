"""
Drop your DSLR JPEGs/RAWs into a folder, run this script, and it outputs:
  - images/photography/thumbs/<name>.webp  (~800px wide, for the grid)
  - images/photography/full/<name>.webp    (~2400px wide, for the lightbox)

Usage:
  python compress_photos.py <input_folder>

Example:
  python compress_photos.py "C:/Users/Victo/Pictures/DSLR/batch1"
"""

import sys
import os
from pathlib import Path
from PIL import Image

SUPPORTED = {".jpg", ".jpeg", ".png", ".tiff", ".tif", ".bmp"}

THUMB_MAX = 800
THUMB_QUALITY = 80

FULL_MAX = 2400
FULL_QUALITY = 85

THUMB_OUT = Path("images/photography/thumbs")
FULL_OUT = Path("images/photography/full")

THUMB_OUT.mkdir(parents=True, exist_ok=True)
FULL_OUT.mkdir(parents=True, exist_ok=True)


def resize_and_save(img, max_px, out_path, quality):
    w, h = img.size
    if w > max_px or h > max_px:
        img = img.copy()
        img.thumbnail((max_px, max_px), Image.LANCZOS)
    img.save(out_path, "WEBP", quality=quality)
    kb = out_path.stat().st_size // 1024
    print(f"  -> {out_path.name}  ({kb} KB)")


def process(input_folder):
    folder = Path(input_folder)
    if not folder.is_dir():
        print(f"Not a directory: {input_folder}")
        sys.exit(1)

    files = [f for f in sorted(folder.iterdir()) if f.suffix.lower() in SUPPORTED]
    if not files:
        print("No supported image files found.")
        sys.exit(0)

    print(f"Processing {len(files)} file(s) from {folder}\n")

    for f in files:
        print(f"{f.name}")
        with Image.open(f) as img:
            img = img.convert("RGB")
            stem = f.stem
            resize_and_save(img, THUMB_MAX, THUMB_OUT / f"{stem}.webp", THUMB_QUALITY)
            resize_and_save(img, FULL_MAX, FULL_OUT / f"{stem}.webp", FULL_QUALITY)
        print()

    print("Done.")
    print("\nAdd these to the photos array in Script/photography.js:")
    for f in files:
        stem = f.stem
        print(
            f'  {{ thumb: "images/photography/thumbs/{stem}.webp", '
            f'full: "images/photography/full/{stem}.webp", alt: "" }},'
        )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    process(sys.argv[1])
