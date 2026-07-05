# Windows Desktop App

CloneForge AI includes a separate Electron desktop wrapper in `apps/desktop`.

## Development

Run the web app and admin app first:

```bash
npm run dev:web
npm run dev:admin
```

Then run the desktop shell:

```bash
npm run desktop:dev
```

The desktop app opens:

- Main app: `http://localhost:3001`
- Admin app: `http://localhost:3002`

You can override these with:

- `CLONEFORGE_WEB_URL`
- `CLONEFORGE_ADMIN_URL`

## Setup Installer

A beginner-friendly Windows installer has been generated here:

```text
C:\Users\Joshua\Downloads\CloneForge-AI-Setup.exe
C:\Users\Joshua\Downloads\CloneForge AI Installer.exe
```

Use the installer instead of copying the bare app executable. The installer includes the full Electron runtime, including `ffmpeg.dll`, so users should not see the missing DLL error.

The build output is also available here:

```text
apps/desktop/dist/CloneForge-AI-Setup-0.1.0.exe
```

## Build Windows installer again

```bash
npx electron-builder --win nsis --config.win.signAndEditExecutable=false --config.win.target=nsis
```

The `signAndEditExecutable=false` flag avoids Windows symlink privilege issues from electron-builder's code-signing helper on machines without Developer Mode enabled.

This desktop app is a secure shell for the CloneForge web/admin apps. For a fully offline desktop app, the Next.js apps would need to be exported or bundled with a local server process.
