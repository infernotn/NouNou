# 🚀 Quick Reference Guide - NouNou V2

## First Time Setup

### Windows Users
1. Double-click `setup.bat` 
2. Browser will open automatically at http://localhost:5173

### Mac/Linux Users
```bash
chmod +x setup.sh
./setup.sh
```

### Manual Setup
```bash
cd NouNou_V2
npm install
npm run dev
```

---

## Project Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (http://localhost:5173) |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview production build locally |

---

## File Locations & Customization

### 📝 Edit Messages
**File:** `src/config.js`

```javascript
export const customMessages = {
    msg1: "Your message here",
    msg2: "Another message"
};

export const finalMessage = `
Your proposal text
`;

export const memories = [
    {
        title: "Memory 1",
        description: "Description here",
        emoji: "💭"
    },
    // ... more memories
];
```

### 🎨 Edit Colors
**File:** `src/App.css` (Top of file, lines 5-10)

```css
:root {
    --primary: #ff2e63;      /* Main color */
    --secondary: #ffccd5;    /* Secondary */
    --bg: #0f0205;          /* Background */
    --text: #ffffff;        /* Text */
    --accent: #ff6b9d;      /* Accent */
}
```

### 🎵 Add Music
Place your audio file in the `public/` folder as `love.mp3`

### 📸 Add Images/Assets
Place files in the `public/` folder and reference them as:
```jsx
<img src="/filename.jpg" alt="description" />
```

---

## Component Overview

| Component | Purpose | Location |
|-----------|---------|----------|
| ParticleSystem | Heart animation & effects | `src/components/ParticleSystem.jsx` |
| GameScreen | Memory matching game | `src/components/GameScreen.jsx` |
| MessageScreen | Text messages between screens | `src/components/MessageScreen.jsx` |
| MemoriesScreen | Photo/memory slider | `src/components/MemoriesScreen.jsx` |
| MusicScreen | Music player | `src/components/MusicScreen.jsx` |
| FinalScreen | Proposal screen | `src/components/FinalScreen.jsx` |
| SuccessOverlay | Celebration overlay | `src/components/SuccessOverlay.jsx` |

---

## Screen Flow

```
GameScreen (Memory Game)
    ↓
MessageScreen1 (Congratulations message)
    ↓
MemoriesScreen (Photo slider)
    ↓
MessageScreen2 (Custom message)
    ↓
MusicScreen (Play your song)
    ↓
FinalScreen (Proposal)
    ↓
SuccessOverlay (Celebration!)
```

---

## Common Tasks

### Change the greeting message at the start
Edit `src/config.js` - look for `customMessages.msg1`

### Change theme colors
Edit `src/App.css` - top section has all color variables

### Add more memories
Edit `src/config.js` - add to `memories` array

### Change music
Replace `public/love.mp3` with your song

### Add background images
- Place image in `public/` folder
- Reference in components as `/imagename.jpg`

---

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Create `dist` folder with `npm run build`
2. Upload `dist` folder to Netlify

### Deploy to GitHub Pages
1. Build project: `npm run build`
2. Upload `dist` folder contents to GitHub

---

## Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### Changes not showing?
- Check console for errors (F12)
- Try hard refresh (Ctrl+Shift+R)
- Restart dev server

### Build errors?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Music not playing?
- Ensure `love.mp3` is in `public/` folder
- Check browser console for errors
- Try different audio format (mp3, wav, ogg)

---

## Performance Tips

1. Optimize images before adding to `public/`
2. Use appropriate audio format (MP3 recommended)
3. Keep particle count reasonable
4. Test on mobile before deployment

---

## Need Help?

Check these files for more info:
- `README.md` - Full documentation
- `CONVERSION_GUIDE.md` - Technical details
- `.gitignore` - What to exclude from git

---

Made with 💖 using React + Vite + Three.js

Happy coding! 🚀
