# CSS Class Reference - Quick Guide

## 🎨 Color System

### Brand Colors

- Primary: `#184267`
- Secondary: `#0062b9`
- Dark: `#0f2d47`

### Usage

```html
<div class="bg-gradient-brand">Gradient background</div>
<div class="text-brand-primary">Primary color text</div>
```

---

## 🔘 Buttons

### Primary Button (White on transparent)

```html
<a class="btn btn-primary" href="#">Click Me</a>
```

### Secondary Button (Outlined)

```html
<a class="btn btn-secondary" href="#">Click Me</a>
```

### Default Button

```html
<a class="btn" href="#">Click Me</a>
```

---

## 📑 Section Headers

```html
<div class="section-header text-center">
    <p>Section Label</p>
    <h2>Section Title</h2>
</div>
```

---

## 🖼️ Portfolio Components

### Filter Buttons

```html
<button class="filter-btn active" data-filter="*">All</button>
<button class="filter-btn" data-filter=".category">Category</button>
```

### Portfolio Card

```html
<div class="portfolio-card">
    <div class="portfolio-img-wrapper">
        <img src="image.jpg" alt="Project">
        <div class="portfolio-overlay">
            <div class="portfolio-details">
                <h3>Project Title</h3>
                <p class="project-desc">Description</p>
                <div class="tech-badges">
                    <span class="tech-badge">PHP</span>
                    <span class="tech-badge">MySQL</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

---

## 🎯 Hero Section

### Badges

```html
<div class="badge-item">
    <i class="fas fa-icon"></i>
    <div class="badge-content">
        <span class="badge-label">Label</span>
    </div>
</div>
```

---

## 💼 Skills Section

### Skill Card

```html
<div class="skill-card">
    <h5>Category Name</h5>
    <ul>
        <li><i class="fab fa-php"></i> PHP</li>
        <li><i class="fab fa-js"></i> JavaScript</li>
    </ul>
</div>
```

---

## ⏱️ Timeline

```html
<div class="timeline">
    <div class="timeline-item left">
        <div class="timeline-text">
            <h2>Position</h2>
            <h4>Company</h4>
            <p>Description</p>
        </div>
    </div>
    <div class="timeline-item right">
        <!-- Same structure -->
    </div>
</div>
```

---

## ✨ Utility Classes

### Backgrounds

- `.bg-gradient-brand` - Brand gradient
- `.bg-gradient-hero` - Hero section gradient
- `.glass` - Glassmorphism effect

### Shadows

- `.shadow-card` - Default card shadow
- `.shadow-card-hover` - Hover state shadow
- `.shadow-elevated` - Elevated shadow

### Animations

- `.animate-fade-in-down` - Fade in from top
- `.animate-fade-in-up` - Fade in from bottom
- `.animate-blink` - Blinking cursor

---

## 📱 Responsive Breakpoints

Tailwind default breakpoints:

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

### Usage

```html
<div class="text-sm md:text-base lg:text-lg">
    Responsive text size
</div>
```

---

## 🎭 Special Components

### Loader

```html
<div class="loader"></div>
```

### Back to Top

```html
<a href="#" class="btn back-to-top">
    <i class="fa fa-chevron-up"></i>
</a>
```

### Achievement Card

```html
<div class="achievement-card">
    <div class="achievement-icon">
        <i class="fas fa-trophy"></i>
    </div>
    <div class="achievement-number">50+</div>
    <div class="achievement-label">Projects</div>
</div>
```

---

## 💡 Pro Tips

1. **Combine Tailwind utilities with custom components:**

   ```html
   <div class="portfolio-card mt-8 lg:mt-12">
   ```

2. **Use responsive utilities:**

   ```html
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
   ```

3. **Leverage hover states:**

   ```html
   <button class="btn hover:scale-105 transition-transform">
   ```

4. **Custom spacing:**

   ```html
   <section class="pt-10 lg:pt-20">
   ```

---

## 🔗 Common Patterns

### Card with Hover Effect

```html
<div class="skill-card hover:-translate-y-3">
    <!-- Content -->
</div>
```

### Centered Content

```html
<div class="flex items-center justify-center min-h-screen">
    <!-- Content -->
</div>
```

### Responsive Grid

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Items -->
</div>
```
