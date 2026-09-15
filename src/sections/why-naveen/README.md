# Why Naveen

Appears immediately after What I Offer. All copy is in `content.js`; `introduction` is the regular paragraph text and `emphasis` is the bold text supplied by Naveen.

Replace `images/profile.png` to update only this section's central portrait. A centred portrait works best. The hero and What I Offer keep their own image files.

`WhyNaveen.jsx` links the four cards and portrait to scroll position. The portrait fades and rises into the centre as the section moves into view; scrolling back reverses the reveal. The animation can replay in either direction. Reduced-motion users see a static layout.

`WhyNaveen.css` provides four surrounding cards and a central image on desktop. On smaller screens the image sits between the first two and last two cards, keeping all text readable. Animation uses Framer Motion independently of the existing GSAP scroll triggers.
