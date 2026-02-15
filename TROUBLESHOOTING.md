# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 🔴 Issue: "Port 5173 already in use"

**Error Message:**
```
Error: EADDRINUSE: address already in use :::5173
```

**Solutions:**

1. **Use a different port:**
   ```bash
   npm run dev -- --port 3000
   ```

2. **Kill the process using the port (Windows):**
   ```bash
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   ```

3. **Kill the process (Mac/Linux):**
   ```bash
   lsof -i :5173
   kill -9 <PID>
   ```

---

### 🔴 Issue: "npm: command not found"

**Cause:** Node.js/npm not installed

**Solution:**
1. Download from [nodejs.org](https://nodejs.org)
2. Install Node.js (includes npm)
3. Restart terminal
4. Verify: `node --version` and `npm --version`

---

### 🔴 Issue: "Module not found" errors

**Common causes:**
- Missing dependencies
- Wrong import paths
- Typo in filename

**Solutions:**

1. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check import paths are case-sensitive:**
   - `./components/GameScreen` ✅
   - `./Components/gamescreen` ❌

3. **Verify file exists:**
   - Check exact filename and path

---

### 🔴 Issue: "Music not playing"

**Cause:** Missing audio file

**Solutions:**

1. **Create public folder:**
   ```bash
   mkdir public
   ```

2. **Add audio file:**
   - Place `love.mp3` in the `public/` folder

3. **Verify path:**
   - Should be: `public/love.mp3`

4. **Check browser console:**
   - Press F12 → Console
   - Look for error messages

---

### 🔴 Issue: "Changes not showing in browser"

**Cause:** Cache or HMR not working

**Solutions:**

1. **Hard refresh browser:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear browser cache:**
   - Open DevTools (F12)
   - Settings → Network → Disable cache

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

4. **Check console for errors:**
   - Press F12 → Console tab
   - Look for red error messages

---

### 🔴 Issue: "Build fails" with error messages

**Common causes:**
- Syntax errors in code
- Missing dependencies
- Invalid JSON in config

**Solutions:**

1. **Check syntax:**
   - Look for missing semicolons
   - Check bracket matching
   - Verify import statements

2. **Check config.js:**
   - Ensure all commas in place
   - No trailing commas after last item
   - Valid JavaScript syntax

3. **Reinstall everything:**
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

---

### 🔴 Issue: Game cards not clickable

**Cause:** JavaScript error preventing clicks

**Solutions:**

1. **Check console (F12):**
   - Look for error messages

2. **Verify GameScreen component:**
   - Check onClick handlers
   - Verify button elements

3. **Clear and restart:**
   ```bash
   npm run dev
   ```

---

### 🔴 Issue: "Memory slider not working"

**Cause:** Navigation function error

**Solutions:**

1. **Check MemoriesScreen component:**
   - Verify nextMemory function
   - Verify prevMemory function
   - Check useState initialization

2. **Verify memories array:**
   - Open `src/config.js`
   - Ensure memories array has 6 items

3. **Check console for errors**

---

### 🔴 Issue: "Themes not cycling"

**Cause:** Theme state not updating

**Solutions:**

1. **Check App.jsx:**
   - Verify cycleTheme function
   - Verify theme state

2. **Check App.css:**
   - Verify theme class names:
     - `theme-purple`
     - `theme-cyan`
     - `theme-gold`

3. **Verify body class:**
   - Open DevTools
   - Inspect `<body>` element
   - Should show theme class

---

## Installation Issues

### 🔴 "npm install" hangs or fails

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Try different registry:**
   ```bash
   npm install --registry https://registry.npmjs.org/
   ```

3. **Check internet connection:**
   - Verify WiFi is connected
   - Try again later if registry is slow

---

### 🔴 "node_modules" is too large

**Expected size:** ~500 MB

**If larger:**
1. Delete: `rm -rf node_modules`
2. Reinstall: `npm install`

---

## Performance Issues

### Slow build times

**Solutions:**

1. **Close other apps:**
   - Frees up CPU/RAM

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **Check disk space:**
   - Ensure > 5GB free space

---

### Slow particle animation

**Solutions:**

1. **Reduce particle count:**
   - Edit `src/config.js`
   - Change `PARTICLE_COUNT` from 3200 to 1600

2. **Update:**
   ```javascript
   export const PARTICLE_COUNT = 1600; // Instead of 3200
   ```

---

## Development Tips

### 🟢 Debug variables

Add temporary logging:
```javascript
console.log('Variable name:', variableName);
```

View in browser console (F12)

### 🟢 Check component props

```javascript
export const MyComponent = (props) => {
    console.log('Props:', props);
    // ...
};
```

### 🟢 Debug state

```javascript
const [value, setValue] = useState('initial');
useEffect(() => {
    console.log('Value changed:', value);
}, [value]);
```

---

## Testing Checklist

- [ ] npm run dev starts without errors
- [ ] Browser opens to http://localhost:5173
- [ ] Memory game loads
- [ ] Game cards are clickable
- [ ] Cards flip on click
- [ ] Matches are detected
- [ ] Memories slider works
- [ ] Music player shows
- [ ] Music plays (if love.mp3 added)
- [ ] Buttons navigate between screens
- [ ] Particles animate
- [ ] Colors look good
- [ ] Mobile responsive (test on phone)

---

## Contact & Support

### Get Help:

1. **Check the docs:**
   - README.md
   - QUICK_START.md
   - CONVERSION_GUIDE.md

2. **Check console:**
   - Press F12 in browser
   - Look for red errors

3. **Check file paths:**
   - Verify all imports
   - Check case sensitivity

---

## When All Else Fails

### Nuclear Option (Reset Everything)

```bash
# Delete everything
rm -rf node_modules package-lock.json dist .vite

# Reinstall
npm install

# Try again
npm run dev
```

---

## Common Error Messages & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module` | Missing file | Check path and spelling |
| `Unexpected token` | Syntax error | Check for missing brackets |
| `react is not defined` | Missing import | Add: `import React from 'react'` |
| `Port already in use` | Another process using port | Kill process or use different port |
| `ENOENT: no such file` | File doesn't exist | Verify path exists |
| `JSON parse error` | Invalid JSON | Check config.js syntax |

---

## Performance Monitoring

### Check bundle size:

```bash
npm run build
```

Look at the output:
- CSS size should be ~8KB
- JS size should be ~200KB
- Gzipped should be ~65KB total

---

## Safe Customization

✅ Safe to edit:
- `src/config.js` - All data and messages
- `src/App.css` - Colors and styles
- Component styling (className)

❌ Be careful with:
- React hooks logic
- Import statements
- Component structure

---

Made with 💖

If you have specific errors, check the browser console (F12) for detailed error messages!
