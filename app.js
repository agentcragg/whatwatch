(function () {
  const elTitle  = document.getElementById('film-title');
  const elYear   = document.getElementById('film-year');
  const elAward  = document.getElementById('film-award');
  const btnPick  = document.getElementById('btn-pick');
  const btnSkip  = document.getElementById('btn-skip');
  const linkCopy = document.getElementById('link-copy');
  const linkLb   = document.getElementById('link-letterboxd');
  const linkTweet = document.getElementById('link-tweet');

  let current = null;
  let seen = [];

  function pick() {
    let pool = FILMS.filter((_, i) => !seen.includes(i));
    if (pool.length === 0) {
      seen = [];
      pool = FILMS;
    }
    const poolIdx = Math.floor(Math.random() * pool.length);
    const film = pool[poolIdx];
    const realIdx = FILMS.indexOf(film);
    seen.push(realIdx);
    current = film;
    render();
  }

  function render() {
    if (!current) return;

    elTitle.textContent  = current.title;
    elYear.textContent   = current.year;
    elAward.textContent  = current.award;

    // Letterboxd search
    linkLb.href = 'https://letterboxd.com/search/' + encodeURIComponent(current.title);

    // Tweet
    const tweetText = 'Watch ' + current.title + ' (' + current.year + ') tonight — ' + current.award + ' winner. Via whatthefuckshouldiwatchtonight.com';
    linkTweet.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText);

    // Update page URL so link-copying works
    const params = new URLSearchParams({ t: current.title, y: current.year });
    history.replaceState(null, '', '?' + params.toString());
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('t');
    const y = params.get('y');
    if (t && y) {
      const match = FILMS.find(f => f.title === t && String(f.year) === y);
      if (match) {
        current = match;
        seen.push(FILMS.indexOf(match));
        render();
        return true;
      }
    }
    return false;
  }

  linkCopy.addEventListener('click', function (e) {
    e.preventDefault();
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(function () {
      linkCopy.textContent = 'Copied!';
      setTimeout(function () { linkCopy.textContent = 'Link to this film'; }, 2000);
    }).catch(function () {
      // Fallback: select a temp input
      const inp = document.createElement('input');
      inp.value = url;
      document.body.appendChild(inp);
      inp.select();
      document.execCommand('copy');
      document.body.removeChild(inp);
      linkCopy.textContent = 'Copied!';
      setTimeout(function () { linkCopy.textContent = 'Link to this film'; }, 2000);
    });
  });

  btnPick.addEventListener('click', pick);
  btnSkip.addEventListener('click', pick);

  // On load: restore from URL or pick fresh
  if (!loadFromURL()) {
    pick();
  }
})();
