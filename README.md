# whatthefuckshouldiwatchtonight

A random BIFA-winning film picker. Inspired by [whatthefuckshouldimakefordinner.com](http://whatthefuckshouldimakefordinner.com).

## Files

- `index.html` — the page
- `style.css` — styles
- `films.js` — the film data (edit this to add/fix films)
- `app.js` — the logic

## Deploying to GitHub Pages

1. Create a new repo on GitHub (e.g. `whatthefuckshouldiwatchtonight`)
2. Push these files to the `main` branch
3. Go to **Settings → Pages**
4. Under "Source", select **Deploy from a branch → main → / (root)**
5. Hit Save — GitHub will give you a URL like `https://yourusername.github.io/whatthefuckshouldiwatchtonight`

## Custom domain

Once you have `whatthefuckshouldiwatchtonight.com` (or similar):

1. In your domain registrar's DNS settings, add a CNAME record:
   - Name: `www`
   - Value: `yourusername.github.io`
2. In GitHub Pages settings, enter your custom domain
3. Tick "Enforce HTTPS"

GitHub will handle the SSL cert automatically.

## Adding films

Edit `films.js`. Each entry looks like:

```js
{ title: "Film Title", year: 2024, award: "Best British Independent Film" },
```

Verify winners at [bifa.org.uk/awards](https://bifa.org.uk/awards).
