# NouNou V2 - A Romantic Interactive Experience

A beautiful, interactive web experience built with **React**, **Vite**, and **Three.js** featuring particle effects, a memory matching game, photo memories, and a special proposal moment.

## Features

- 🎨 **Stunning Particle Effects** - Three.js powered heart-shaped particles with rotation animations
- 🎮 **Memory Matching Game** - Interactive card matching game to unlock the next chapter
- 📸 **Photo Memories Slider** - Browse through your favorite memories
- 🎵 **Music Player** - Listen to your song with controls
- 💌 **Custom Messages** - Personalized messages throughout the experience
- 🎉 **Celebration Effects** - Heart rain animation and celebration overlay
- 🌈 **Auto-Cycling Themes** - Dynamic color themes that change with each screen
- 📱 **Fully Responsive** - Works beautifully on all devices

## Tech Stack

- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **Three.js** - 3D graphics library (for potential future enhancements)
- **CSS3** - Modern styling with animations and gradients

## Installation

1. Clone or extract the project
2. Navigate to the project directory:
   ```bash
   cd NouNou_V2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```

The app will open automatically at `http://localhost:5173`

## Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
NouNou_V2/
├── src/
│   ├── components/
│   │   ├── ParticleSystem.jsx      # Three.js particle effects
│   │   ├── GameScreen.jsx          # Memory matching game
│   │   ├── MessageScreen.jsx       # Custom message screen
│   │   ├── MemoriesScreen.jsx      # Memories slider
│   │   ├── MusicScreen.jsx         # Music player
│   │   ├── FinalScreen.jsx         # Proposal screen
│   │   ├── SuccessOverlay.jsx      # Celebration overlay
│   │   └── index.js                # Component exports
│   ├── config.js                   # Configuration and data
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # Global styles
│   └── main.jsx                    # Entry point
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
└── package.json                    # Dependencies and scripts
```

## Customization

### Edit Messages and Data

Open `src/config.js` to customize:
- Girlfriend's name
- Memory titles and descriptions
- Custom messages
- Final proposal message
- Celebration message

### Change Colors and Themes

Edit the CSS variables in `src/App.css`:
```css
:root {
    --primary: #ff2e63;
    --secondary: #ffccd5;
    --bg: #0f0205;
    --text: #ffffff;
    --accent: #ff6b9d;
}
```

### Add Music

Replace `love.mp3` in the `public/` directory with your own audio file.

## Notes

- The particle effect uses Canvas 2D for better performance
- Three.js is included for future 3D enhancement possibilities
- All animations are GPU-accelerated for smooth performance
- Theme cycling happens automatically on each screen transition

## License

This project is a personal romantic experience. Feel free to modify it for your own special someone! ❤️

---

Made with 💖
