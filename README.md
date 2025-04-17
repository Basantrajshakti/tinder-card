# 🛍️ Product Swipe Discovery App:

> A mobile-first, swipe-based product discovery app built with **React**, **GSAP**, **Typescript**, and **TailwindCSS**, and packaged for Android using **Capacitor.js**.

---

## 📁 Project Structure

```
├── capacitor.config.ts                # Capacitor config (App name, ID, etc.)
├── eslint.config.js                   # ESLint config for code linting
├── index.html                         # App entry HTML
├── package-lock.json
├── package.json
├── public/
│   └── vite.svg                       # Static asset (can include icons, images, etc.)
├── src/
│   ├── App.jsx                        # Root component, renders SwipeDeck
│   ├── components/
│   │   ├── ProductCard.jsx            # UI for individual product card
│   │   ├── SwipeCard.jsx              # Draggable card logic (GSAP gestures)
│   │   └── SwipeDeck.jsx              # Card stack + swipe logic + refresh
│   ├── constants/
│   │   └── product.js                 # Mock product data (10+ cards)
│   ├── index.css                      # TailwindCSS base styles
│   ├── main.jsx                       # Vite entry point
│   └── vite-env.d.ts                  # Vite’s ambient declarations (auto-generated)
├── tinder-card.apk                    # Built APK for Android (optional output)
├── vite.config.js                     # Vite config for build and preview
```

---

## 🧩 Key Components & Responsibilities

### 🔹 `SwipeDeck.tsx`

- Maintains `cardIndex` and `swipeDirection` state
- Controls the size of the visible card stack (`STACK_SIZE`)
- Renders the top N cards using `SwipeCard`
- Shows a "Refresh" button when deck is empty

### 🔹 `SwipeCard.tsx`

- Implements gesture handling with:
  - `touchstart`, `touchmove`, `touchend`
  - `dragstart`, `drag`, `dragend`
- Uses **GSAP** to animate swipes
- Detects swipe direction: `'left'`, `'right'`, `'up'`
- Locks animation state with `isAnimating` for performance

### 🔹 `ProductCard.tsx`

- Renders product details: name, brand, pricing, discount
- Displays **badges** based on swipe direction:
  - ✅ Like (green)
  - ❌ Dislike (red)
  - 🛒 Add to cart (blue)

---

## 🧾 Data Structure

### 🔸 `product.ts` structure

```js
[
  {
    id: 1,
    name: 'floral print v-neck top',
    brand: 'shaye',
    price: 2986,
    originalPrice: 4977,
    discountPercentage: 40,
    imageUrl: 'https://example.com/image.jpg'
  },
  ...
]
```

---

## ⚙️ Core Configurations

### 🔸 Vite

Ensure this is set in `vite.config.js` for Capacitor to resolve paths correctly:

```js
export default defineConfig({
  base: "./",
});
```

---

## 📲 Build for Android with Capacitor

### Step-by-step:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npm run build
npx cap add android
npx cap copy
npx cap open android
```

Then in Android Studio:

- Select device/emulator
- Click ▶️ to run
- Or go to `Build > Build APK(s)`

---

## 🧠 Features

| Feature                    | Supported ✅ |
| -------------------------- | ------------ |
| Swipe Left / Right / Up    | ✅           |
| Dynamic Card Stack         | ✅           |
| Preloaded Images           | ✅           |
| Badges with Direction      | ✅           |
| GSAP Animations            | ✅           |
| Responsive Layout (Mobile) | ✅           |
| Offline Refresh Button     | ✅           |
| Vite + Capacitor Android   | ✅           |

---
