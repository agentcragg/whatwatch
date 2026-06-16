(function () {
  const elTitle  = document.getElementById('film-title');
  const btnSkip  = document.getElementById('btn-skip');

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
    elTitle.textContent = current.title;
    elTitle.href = 'https://letterboxd.com/search/' + encodeURIComponent(current.title);
  }

  btnSkip.addEventListener('click', pick);

  pick();
})();
