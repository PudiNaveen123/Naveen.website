# What I Offer

This section appears immediately after Growth Capabilities (Expertise) and before Skills.

## Edit the text

Open `content.js`. Update the heading fields or a service's `title` and `description`. The order in `offers` is the card order. The section currently contains the 11 services supplied by Naveen.

## Replace a photo

Open the `images` folder and replace a service's JPG using the same filename. Suggested size: 720 × 960 pixels or larger, portrait orientation. Keep important details near the centre; the lower portion is covered by the text overlay.

`profile.png` is a copy of Naveen's existing profile portrait and is used on the Growth Consulting card. Replacing it here changes that card only; it does not change the hero portrait in `src/Picture.png`.

To use a different filename or image format, upload it into `images` and update the corresponding `image` value in `content.js`. All image references are bundled with the site and work on GitHub Pages. No external image requests are needed when visitors view the section.

## Animation

`durationSeconds` controls how long one cycle takes. Increase it for slower movement. Two identical groups provide the seamless right-to-left loop. Duplicate cards are hidden from assistive technology. Hovering pauses the strip; the Pause animation button also pauses it. Visitors who request reduced motion get a static horizontally scrollable row.

## Files

- `WhatIOffer.jsx`: section and card rendering.
- `WhatIOffer.css`: isolated styling and animation.
- `content.js`: editable copy, image filenames, icons and speed.
- `images/`: all card images and profile picture.

## Starter photo sources

The starter business images are downloaded from Unsplash and reused across relevant service cards. They are illustrative photos, not client photos or testimonials. Replace each named card image independently whenever ready.

- Planning: image ID photo-1454165804606-c3d57bc86b40
- Team: image ID photo-1522071820081-009f0129c71c
- Workspace: image ID photo-1497366811353-6870744d04b2
- Analytics: image ID photo-1460925895917-afdab827c52f

Source files: `https://images.unsplash.com/{image-ID}?auto=format&fit=crop&w=720&q=80`.
