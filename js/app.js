window.app = function () {
  return {
    current: null,
    init() {
      this.load("home");
    },
    async load(page) {
      this.current = page;
      try {
        const res = await fetch(`pages/${page}.html`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this.$refs.content.innerHTML = await res.text();
        this.attachMovingLinkListeners();
      } catch (e) {
        console.error("Fetch errore:", e);
        this.$refs.content.innerHTML = "<p>Errore nel caricamento.</p>";
      }
    },
    attachMovingLinkListeners() {
      const box = document.getElementById("box");
      if (!box) return;

      const links = Array.from(box.querySelectorAll(".moving-link"));
      const boxW = box.clientWidth;
      const boxH = box.clientHeight;
      const margin = 20; // buffer interno

      const minX = margin;
      const maxX = boxW - margin - (links[0]?.offsetWidth || 0);
      const minY = margin;
      const maxY = boxH - margin - (links[0]?.offsetHeight || 0);

      function randomInSquare() {
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        return { x, y };
      }

      // assegna posizioni iniziali a tutti i link
      links.forEach((link) => {
        link.style.position = "absolute";
        const { x, y } = randomInSquare();
        link.style.left = `${x}px`;
        link.style.top = `${y}px`;
      });

      // al click di *qualsiasi* link, sposto tutti i link
      links.forEach((link) => {
        link.addEventListener("click", async (event) => {
          event.preventDefault();
          const url = link.dataset.url;
          if (url) window.open(url, "_blank");

          if (link.id === "copyEmailBtn") {
            try {
              // copia in clipboard
              await navigator.clipboard.writeText("tuo.nome@esempio.com");
              alert("📋 Email copiata negli appunti!");
            } catch {
              console.warn("Copia non riuscita");
            }
          }

          // riposiziona tutti i link
          links.forEach((l) => {
            const { x, y } = randomInSquare();
            l.style.left = `${x}px`;
            l.style.top = `${y}px`;
          });
        });
      });
    },
  };
};
