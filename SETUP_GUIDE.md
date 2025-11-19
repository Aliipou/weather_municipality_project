# 📖 Complete Setup Guide

This guide will walk you through setting up the Advanced Weather App from scratch.

## Prerequisites

### Required Software
- **Node.js**: Version 18.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm**: Comes with Node.js
  - Verify installation: `npm --version`
- **Git**: For cloning the repository
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### API Key
You'll need a free OpenWeatherMap API key:
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "API keys" in your account
4. Copy your API key (or generate a new one)

**Note**: Free tier includes:
- Current weather data
- 5-day / 3-hour forecast
- 7-day forecast (One Call API 2.5)
- Air pollution data
- Geocoding

## Step-by-Step Installation

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/Aliipou/weather_municipality_project.git

# Or using SSH
git clone git@github.com:Aliipou/weather_municipality_project.git

# Navigate to the project directory
cd weather_municipality_project
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand
- Axios
- Lucide React
- Recharts
- date-fns

**Expected output**: "added XXX packages" message

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Open `.env` in your text editor and add your API key:

```env
VITE_WEATHER_API_KEY=your_actual_api_key_here
```

**Important**:
- Replace `your_actual_api_key_here` with your real API key
- Don't use quotes around the API key
- Don't commit the `.env` file to version control (it's already in `.gitignore`)

### 4. Start the Development Server

```bash
npm run dev
```

**Expected output**:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 5. Open the App

Open your browser and navigate to:
```
http://localhost:3000
```

## Verification

To verify everything is working:

1. **Search functionality**: Try searching for a city (e.g., "London")
2. **Geolocation**: Click the location button to use your current location
3. **Theme toggle**: Click the theme icon to switch between light/dark modes
4. **Saved locations**: Save a location and verify it persists after refresh
5. **Responsive design**: Resize your browser window to test mobile view

## Building for Production

When you're ready to deploy:

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## Common Issues & Solutions

### Issue: API calls failing

**Solution**:
- Verify your API key is correct in `.env`
- Check that the file is named exactly `.env` (not `.env.txt`)
- Restart the development server after changing `.env`
- Confirm your API key is activated (may take a few minutes after creation)

### Issue: Port 3000 already in use

**Solution**:
- Stop other applications using port 3000
- Or modify `vite.config.ts` to use a different port:
```typescript
server: {
  port: 3001, // Change to any available port
}
```

### Issue: Module not found errors

**Solution**:
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Issue: TypeScript errors

**Solution**:
- Ensure TypeScript is properly installed: `npm install -D typescript`
- Check `tsconfig.json` is present
- Restart your code editor
- Run `npx tsc --noEmit` to check for type errors

### Issue: Geolocation not working

**Solution**:
- Ensure you're using HTTPS or localhost
- Check browser permissions for location access
- Try a different browser

## Development Tips

### Hot Module Replacement (HMR)
Vite provides fast HMR - changes will reflect immediately without full page reload.

### Browser DevTools
- Press `F12` to open DevTools
- Check Console for errors
- Use Network tab to inspect API calls
- Use Application tab to view Local Storage

### Code Editor Setup
Recommended VS Code extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Environment Modes

### Development
```bash
npm run dev
```
- Hot reload enabled
- Source maps included
- Development optimizations

### Production
```bash
npm run build
npm run preview
```
- Minified code
- Tree-shaking applied
- Optimized bundles

## Project Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Next Steps

After successful setup:

1. **Explore the app**: Try all features
2. **Check the code**: Review component structure in `src/`
3. **Customize**: Modify colors in `tailwind.config.js`
4. **Extend**: Add new features or components
5. **Deploy**: Consider deploying to Vercel, Netlify, or similar

## Getting Help

If you encounter issues:

1. Check this guide thoroughly
2. Review the main [README.md](./README.md)
3. Search [existing issues](https://github.com/Aliipou/weather_municipality_project/issues)
4. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Error messages
   - Your environment (OS, Node version, etc.)

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)

---

**Congratulations!** You're all set up and ready to explore the Advanced Weather App! 🎉
