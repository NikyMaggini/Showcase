window.app = function() {
  return {
    current: null,
    init() {
      this.load('home');
    },
    async load(page) {
      this.current = page;
      try {
        const res = await fetch(`pages/${page}.html`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this.$refs.content.innerHTML = await res.text();
      } catch (e) {
        console.error('Fetch errore:', e);
        this.$refs.content.innerHTML = '<p>Errore nel caricamento.</p>';
      }
    }
  }
}
  