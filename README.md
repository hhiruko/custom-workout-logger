# Custom Workout Logger

A lightweight, static **PWA** for logging, tracking, and analyzing my fitness progress.

### 💪 App Features
- Add, edit, and delete exercise sessions
- Record weight, sets, reps, and workout duration
- Visualize progression over time

### 🚀 Core Features
- Offline support via caching
- Build-time manifest & icon generation (just provide one `.svg`)
- Light/Dark/System theme preference support
- `localStorage` wrapper classes: `Storage`, `CollectionStorage`
- `Transfer` class for exporting/importing all localStorage data as JSON
- GitHub Actions workflow for Pages deployment
- Icon system based on `lucide-preact`

---

### ⚡ Tech Stack / Dependencies
- [Vite](https://vitejs.dev/)
- [Preact](https://preactjs.com/)
- [Glob](https://github.com/isaacs/node-glob)
- [Favicons](https://github.com/itgalaxy/favicons)
- [Lucide-preact](https://lucide.dev/guide/packages/lucide-preact)
- [Water.css](https://github.com/hhiruko/water.css)
- [Chart.js](https://www.chartjs.org/)

---

### 🔧 Getting Started

1. Install dependencies:
    ```bash
    npm install
    ```
2. Update your `.env` file as needed.
3. (Optional) Place your `icon.svg` inside `public/favicons/` and reference its name in `.env`.
4. Start dev server:
    ```bash
    npm run dev
    ```
5. Build production-ready static site:
    ```bash
    npm run build
    ```

### 📦 Deployment

This project includes a **GitHub Actions** workflow that automatically deploys your production build to **GitHub Pages** on push.

To enable deployment:

1. Go to **Settings → Actions → General**  
    → Under **Workflow permissions**, select **"Read and write permissions"**.

2. Go to **Settings → Pages → Build and deployment**  
    → Under **Source**, choose **"Deploy from a branch"**, then select the `gh-pages` branch (after the first push creates it).


### 📝 License

MIT
