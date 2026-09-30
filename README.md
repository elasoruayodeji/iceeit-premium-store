# ICEEIT — Update: New Colors + Product Videos

## What changed
1. **Colors.** The cream look is gone. New palette: near-black graphite
   background, warm off-white text, one bold orange accent used on buttons,
   links, and highlights. Fonts are unchanged (Playfair Display headings,
   Inter body text).
2. **Product videos.** Each of your 6 products now plays a video instead of
   a static photo: on the shop grid it plays when you hover (or when it
   scrolls into view on phones), and on the product page it plays with
   controls, plus a thumbnail strip if you add extra photos too.
3. **6 model photos** now have named, exact spots: homepage hero, homepage
   editorial section, About page, Collections page, and two category tiles.
4. Until a video or photo is added, that exact spot shows a dark tile
   naming the file it's waiting for (e.g. "hero.jpg — IMAGE COMING SOON"),
   never a broken icon.

Nothing else changed. Routing, cart, and prices are exactly as before.

## Before you touch anything
Close Cursor / VS Code completely if it's open on this project. Don't edit
inside the editor for this step, do it in Finder/Explorer or Terminal as
below, then reopen the editor afterward. This avoids the kind of accidental
revert that happened last time.

## Step by step (do this exactly, in order)

1. **Back up your current project folder first.** Right-click your ICEEIT
   project folder and duplicate it, or copy it to a new location, and name
   the copy something like `ICEEIT-backup`. Do this even if you're confident,
   it costs nothing and means you can never lose work again.

2. **Unzip this file** (`iceeit-update-final.zip`) somewhere, e.g. your
   Desktop. You'll get a folder containing three things: `src`, `public`,
   and `index.html`.

3. In your real project folder, **delete** these three items only:
   - the `src` folder
   - the `public` folder
   - the `index.html` file

   Do NOT delete `node_modules`, `package.json`, `package-lock.json`, or
   `vite.config.js`. Leave those exactly as they are.

4. **Copy** (not cut) the `src` folder, `public` folder, and `index.html`
   from the unzipped update into your project folder, in the same place you
   just deleted them from.

   Using copy instead of cut means the source files stay put on your
   Desktop even if something goes wrong with the paste, so you can just try
   again.

5. Open a terminal in your project folder and run:
   ```
   npm run dev
   ```
   Do NOT run `npm install` first. This update uses the same four packages
   your project already had (react, react-dom, react-router-dom,
   framer-motion), so nothing new needs installing.

   Only run `npm install` if the terminal says something like "Cannot find
   module" or "Failed to resolve import" — if that happens, stop the
   server (Ctrl+C), run `npm install`, then run `npm run dev` again.

6. Open the localhost address it gives you and check the homepage, shop
   page, and one product page. You should see the dark background and
   orange accent, and each product tile should say "VIDEO COMING SOON"
   with the product's name on it.

7. **Now add your real media.** Two new folders are inside `public`:
   - `public/images/PUT_PHOTOS_HERE.txt` lists the 6 exact photo filenames
     and where each one is used.
   - `public/videos/PUT_VIDEOS_HERE.txt` lists the 6 exact video filenames
     and where each one is used.

   Rename your photos and videos to match exactly (lowercase, correct
   extension, no spaces), and drop them into those two folders. Refresh
   the browser after each one, no restart needed.

8. Once everything looks right locally, only then commit and push to
   GitHub / redeploy on Vercel.

## If something looks wrong
- **A tile still says "coming soon" after you added the file:** double
  check the filename is exactly right, including lowercase and the correct
  extension (.jpg vs .jpeg vs .png will not match).
- **Colors look unchanged:** your browser may be showing a cached version,
  do a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac).
- **Videos look huge/slow to load:** compress them before adding, they
  should be a few MB each, not tens of MB.
