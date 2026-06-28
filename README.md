# Chirag Vadrali — Portfolio

> A cinematic, high-fidelity portfolio system built with React + GSAP.  
> **Brutalist Signal** aesthetic — pure signal, no decoration.

---

## Overview

Personal portfolio for **Chirag Vadrali**, Hardware System Design Engineer and vibecoder. The site is engineered as a digital instrument — every scroll is intentional, every animation weighted and professional.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (Vite) |
| Styling | Tailwind CSS v3.4.17 |
| Animation | GSAP + ScrollTrigger |
| Icons | Lucide React |
| Fonts | Space Grotesk · DM Serif Display · Space Mono |

---

## Aesthetic — Preset C: Brutalist Signal

| Token | Value |
|---|---|
| Background | Paper `#E8E4DD` |
| Accent | Signal Red `#E63B2E` |
| Off-white | `#F5F3EE` |
| Text / Dark | Black `#111111` |

---

## Sections

| Section | Description |
|---|---|
| **Navbar** | Fixed pill-shaped, morphs on scroll |
| **Hero** | Full-bleed PCB image, GSAP staggered text entry |
| **Projects** | 4 full-screen pinned panels (stacking scroll, Protocol-style) |
| **Philosophy** | Engineering manifesto with word-by-word GSAP reveal + parallax |
| **Protocol** | Pinned stacked cards — Design → Build → Validate |
| **Engage** | 3-card CTA grid — Resume, Hire Me, Connect |
| **Footer** | Dark, rounded-top, system status dot |

---

## Featured Projects

1. **Precision Navigation System** — NavIC-enabled GNSS module (PX4 compatible)
2. **Battery-Powered WiFi Node** — ESP8266 standalone breakout, Li-ion powered
3. **High-Performance IoT Core** — ESP32 4-layer board, signal integrity optimized
4. **Motion-Controlled Interaction** — IMU-based BLE HID mouse gun system

---

## Getting Started

```bash
# go in to the project directory
cd vibe-portfolio

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Dev server runs at **http://localhost:5173**

---

## Project Structure

```
vibe-portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Projects.jsx
│   │   ├── Philosophy.jsx
│   │   ├── Protocol.jsx
│   │   ├── Engage.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── vite.config.js
```

---

© 2026 Chirag Vadrali. Built with precision.
