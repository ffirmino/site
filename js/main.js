(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const chips = (arr) => `<ul class="chips">${arr.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  const initials = (n) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  // Textos
  $("#hero-summary").textContent = PROFILE.summary;
  $("#about-summary").textContent = PROFILE.summary;
  $("#highlights").innerHTML = PROFILE.highlights.map((h) => `<li>${esc(h)}</li>`).join("");
  $("#interests").textContent = "Fora do código: " + INTERESTS;
  document.querySelectorAll("[data-wa]").forEach((a) => (a.href = PROFILE.whatsapp));
  $("#year").textContent = new Date().getFullYear();

  // Números
  const techCount = new Set(SKILLS.flatMap((s) => s.items)).size;
  $("#stats").innerHTML = [
    [PROFILE.years + "+", "anos com C# e .NET"],
    [PROJECTS.length, "projetos autorais"],
    [EXPERIENCE.length, "empresas e clientes"],
    [techCount + "+", "tecnologias no dia a dia"]
  ].map(([n, l]) => `<div class="stat reveal"><b>${n}</b><span>${l}</span></div>`).join("");

  // Projetos + filtros
  const statusLabel = { online: "Publicado", dev: "Em desenvolvimento", local: "Local" };
  const filters = [["todos", "Todos"], ["online", "Publicados"], ["dev", "Em desenvolvimento"]];
  const renderProjects = (f = "todos") => {
    const list = PROJECTS.filter((p) => f === "todos" || p.status === f);
    $("#project-list").innerHTML = list.map((p) => `
      <article class="project reveal in" id="proj-${p.id}">
        <div class="project__top">
          <span class="project__icon">${initials(p.name)}</span>
          <span class="badge badge--${p.status}">${statusLabel[p.status]}</span>
        </div>
        <h3>${esc(p.name)}</h3>
        <p class="project__tag">${esc(p.tagline)}</p>
        <p class="project__desc">${esc(p.description)}</p>
        ${chips(p.stack)}
        <div class="project__links">
          ${p.links.length ? p.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("") : `<span class="soon">// links em breve</span>`}
        </div>
      </article>`).join("");
  };
  $("#filters").innerHTML = filters.map(([k, l], i) => `<button class="filter${i ? "" : " on"}" role="tab" data-f="${k}">${l}</button>`).join("");
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    document.querySelectorAll(".filter").forEach((x) => x.classList.toggle("on", x === b));
    renderProjects(b.dataset.f);
  });
  renderProjects();
  $("#project-list").addEventListener("pointermove", (e) => {
    const card = e.target.closest(".project"); if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });

  // Experiência
  $("#exp-summary").textContent = EXPERIENCE_SUMMARY;
  $("#exp-domains").innerHTML = EXPERIENCE_DOMAINS.map((d) => `<li>${esc(d)}</li>`).join("");
  $("#timeline").innerHTML = EXPERIENCE.map((x, i) => `
    <li class="tl${i === 0 ? " now" : ""}">
      <h3>${esc(x.role)}</h3>
      <span class="tl__period">${esc(x.period)}</span>
      <div class="tl__co">${esc(x.company)}</div>
    </li>`).join("");

  // Stack
  $("#skills").innerHTML = SKILLS.map((s) => `<div class="skill reveal"><h3>${esc(s.group)}</h3>${chips(s.items)}</div>`).join("");

  // Formação
  $("#education").innerHTML = EDUCATION.map((e) => `<li><b>${esc(e.course)}</b><span>${esc(e.school)} · ${esc(e.period)}</span></li>`).join("");
  $("#certs").innerHTML = CERTS.map((c) => `<li>${esc(c)}</li>`).join("");

  // Efeito de digitação no cargo
  const typed = $("#typed");
  const words = typed.dataset.words.split("|");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    let w = 0, c = words[0].length, del = true;
    const tick = () => {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      if (del) { c--; if (c < 0) { del = false; w = (w + 1) % words.length; c = 0; } }
      else { c++; if (c > words[w].length) { del = true; return setTimeout(tick, 2200); } }
      setTimeout(tick, del ? 28 : 55);
    };
    setTimeout(tick, 2600);
  }

  // Menu mobile
  const burger = $("#burger"), nav = $("#nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => { if (e.target.tagName === "A") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

  // Topbar + link ativo
  const topbar = $(".topbar");
  const links = [...nav.querySelectorAll("a")];
  const onScroll = () => {
    topbar.classList.toggle("scrolled", scrollY > 10);
    let cur = "";
    document.querySelectorAll("main section[id]").forEach((s) => { if (s.getBoundingClientRect().top < 140) cur = s.id; });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Animação de entrada
  const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
})();
