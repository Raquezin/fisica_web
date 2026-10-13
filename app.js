document.addEventListener("DOMContentLoaded", () => {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
      ],
      throwOnError: false,
    });
  }

  const links = [...document.querySelectorAll(".toc a[href^='#']")];
  const targets = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (!targets.length) return;
  const onScroll = () => {
    let active = null;
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
      active = targets[targets.length - 1];
    } else {
      for (const t of targets) if (t.getBoundingClientRect().top <= innerHeight * 0.3) active = t;
    }
    links.forEach((a) => a.classList.toggle("active", active !== null && a.getAttribute("href") === "#" + active.id));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
