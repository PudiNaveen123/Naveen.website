# Why Naveen

Appears immediately after What I Offer. All copy is in `content.js`; `introduction` is the regular paragraph text and `emphasis` is the bold text supplied by Naveen.

Replace `images/profile.png` to update only this section's central portrait. A centred portrait works best. The hero and What I Offer keep their own image files.

`WhyNaveen.jsx` links every frame to scroll position. Initially, the four fully visible cards form a tight 2×2 grid and the portrait is hidden. The stage briefly stays near the top of the viewport while scrolling continues. From 15% to 90% of scroll progress, the cards narrow to 70% of their grid columns, opening the centre while their outer edges stay aligned with the content margins. The portrait simultaneously grows from 20% to full size, rises, and fades in between them. It is absolutely positioned, so there is no empty centre column before the reveal. Scrolling back closes the cards and hides the portrait. Reduced-motion users get static cards and a separate visible portrait.

`WhyNaveen.css` keeps the desktop reveal within a 1240px content container and limits the portrait to 26% of that width. On smaller screens the image sits between the first two and last two cards, keeping all text readable. Animation uses Framer Motion independently of the existing GSAP scroll triggers.
