FCIT TEAM / TECHNICAL LEADERSHIP — EDITORIAL ASSET KIT
=======================================================

Purpose
-------
This kit supports a redesign inspired by the supplied editorial/team references:
- monochrome portrait photography
- staggered, slightly rotated editorial photo prints
- warm ivory paper surfaces
- restrained FCIT crimson offsets
- charcoal/black textured negative space
- gold editorial rules and subtle halftone details

IMPORTANT: The reference board is for art direction only. Do NOT use it as a flattened
website screenshot or background. Its example faces and text are generated placeholders.
Use the real member photographs and verified names/designations from the existing FCIT data.

Folder map
----------
textures/
  ivory-paper-grain.webp
  speckled-paper.webp
  charcoal-grain.webp

overlays/
  crimson-ribbon-reference.webp
  gold-dot-grid-reference.webp
  crimson-sweep.svg
  portrait-frame.svg
  gold-editorial-rule.svg
  halftone-grid.svg
  paper-card-shadow.svg

reference/
  editorial-layout-reference.png

How to use
----------
- Use the textures subtly (low opacity / background blend) rather than as large raster panels.
- Use crimson-sweep.svg and halftone-grid.svg as optional decorative layers.
- Use portrait-frame.svg as a lightweight overlay or reproduce its rules in CSS.
- Use paper-card-shadow.svg only as a reference for the offset-paper effect; CSS is preferable for
  responsive card construction.
- Do not use the sample image board as a site asset.
- Keep all headings, labels, captions and controls as HTML/React text.
- Use actual FCIT portraits only. Do not use generated faces from the reference board.
- Keep image source files and original member crops untouched.

Suggested visual tokens
-----------------------
Ivory paper: #F7F3E8
Near-black: #0B0B0D
FCIT crimson: #B10D22
Antique gold: #D4B26A
Muted grey: #9AA0A6
Soft white: #F4F1EA

Recommended page composition
----------------------------
Left side:
  Keep the existing sticky narrative panel and stage progress as currently implemented.

Right side:
  Four guild editorial strips/panels, one per guild, arranged vertically.
  Each guild panel has:
    - a restrained ivory paper surface against the charcoal background
    - real grayscale member portraits arranged as overlapping photo prints
    - slight individual rotations (alternate, low angles; avoid obscured faces)
    - guild name and short domain description as live HTML text
    - one simple "EXPLORE GUILD ->" link to the existing individual guild route
    - thin crimson offset backing / shadow

Interaction:
  - panel enters with a staggered translateY + opacity reveal
  - portrait prints reveal individually with a short stagger
  - hover lifts the selected print and increases its scale slightly
  - panel hover may shift the crimson offset backing by a few pixels
  - all movement reverses cleanly on pointer leave / reverse scroll
  - no permanent blur or opacity state

Accessibility and performance
------------------------------
- Respect prefers-reduced-motion.
- Avoid continuously animating all portraits.
- Use transform and opacity for motion.
- Use IntersectionObserver for reveal triggers; restore styles correctly on reverse scroll.
- Keep names and designations readable and selectable.
- Use semantic links and buttons.
- Ensure mobile layout becomes a single-column editorial sequence with minimal rotations.
- Set image width/height or aspect-ratio to prevent layout shift.
