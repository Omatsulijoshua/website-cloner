# Asset Handling

CloneForge AI treats logos, images, icons, fonts, and other files as first-class clone artifacts.

## Capture

During capture, the crawler extracts:

- Logo-like images from header, nav, brand, and filename hints
- Images from `<img>` tags and CSS backgrounds
- Favicons and icon links
- Font files from CSS `url(...)` declarations
- Stylesheet dependencies
- SEO and Open Graph images

The crawler only downloads public, authorized assets. It does not copy protected, paywalled, private, or failed-verification assets.

## Storage

Generated projects should include:

```text
public/assets/original
public/assets/logos
public/assets/images
public/assets/icons
public/assets/fonts
public/assets/styles
```

Each asset keeps metadata:

- Original source URL
- Source page URL
- Local original path
- Optimized path
- Usage notes
- Alt text and dimensions when available

## Rewriting

Generated components should reference local assets, not hotlink the original site:

```tsx
<img src="/assets/logos/example-logo.png" alt="Example" />
```

Fonts should be recreated with `@font-face` declarations from local `/assets/fonts` files.

## Replacement

Because every asset has a manifest entry, users can replace logos and images later without regenerating the entire website.
