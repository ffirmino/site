(() => {
  const out = document.getElementById("out");
  const term = document.getElementById("term");
  const input = document.getElementById("cmd");
  const ghost = document.getElementById("ghost");
  const form = document.getElementById("form");
  const screen = document.getElementById("screen");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const sleep = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const LINKEDIN_EXP = PROFILE.linkedin + "/details/experience/";

  /* ================= Chuva Matrix ================= */
  const cv = document.getElementById("rain"), ctx = cv.getContext("2d");
  const glyphs = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789FSKIT.NET<>{}#$";
  let cols = [], fs = 16, rainSpeed = 1;
  const fit = () => {
    cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio;
    fs = 16 * devicePixelRatio;
    cols = Array.from({ length: Math.ceil(cv.width / fs) }, () => Math.random() * -50);
  };
  fit(); addEventListener("resize", fit);
  const color = () => getComputedStyle(document.body).getPropertyValue("--fg").trim() || "#3dff7a";
  let fg = color(), last = 0;
  const draw = (t) => {
    requestAnimationFrame(draw);
    if (t - last < 50 / rainSpeed) return; last = t;
    ctx.fillStyle = "rgba(0,0,0,0.08)"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.font = fs + "px monospace";
    cols.forEach((y, i) => {
      const ch = glyphs[(Math.random() * glyphs.length) | 0];
      ctx.fillStyle = Math.random() > .975 ? "#fff" : fg;
      ctx.fillText(ch, i * fs, y * fs);
      cols[i] = y * fs > cv.height && Math.random() > .975 ? 0 : y + 1;
    });
  };
  if (!reduce) requestAnimationFrame(draw);

  /* ================= Saída ================= */
  const scroll = () => (term.scrollTop = term.scrollHeight);
  const line = (html = "", cls = "") => {
    const d = document.createElement("div");
    if (cls) d.className = cls;
    d.innerHTML = html; out.appendChild(d); scroll(); return d;
  };
  const print = async (lines, delay = 18) => { for (const l of lines) { Array.isArray(l) ? line(l[0], l[1]) : line(l); await sleep(delay); } };
  const typeLine = async (text, cls = "", speed = 22) => {
    const d = line("", cls);
    for (const ch of text) { d.textContent += ch; scroll(); await sleep(speed); }
  };
  const c = (name, label) => `<span class="cmd-link" data-cmd="${esc(name)}">${esc(label || name)}</span>`;
  const a = (url, label) => `<a class="ext" href="${esc(url)}" target="_blank" rel="noopener">${esc(label || url)}</a>`;
  const narrow = () => term.clientWidth < 620;
  const pad = (s, n) => (s + " ".repeat(n)).slice(0, Math.max(n, s.length));
  const hr = () => `<span class="dim">${"─".repeat(Math.min(60, Math.floor(term.clientWidth / 14)))}</span>`;
  const title = (t) => [`<span class="hi">${esc(t)}</span>`, hr()];

  const BANNER = String.raw`
███████╗███████╗██╗  ██╗    ██╗████████╗
██╔════╝██╔════╝██║ ██╔╝    ██║╚══██╔══╝
█████╗  ███████╗█████╔╝     ██║   ██║
██╔══╝  ╚════██║██╔═██╗     ██║   ██║
██║     ███████║██║  ██╗    ██║   ██║
╚═╝     ╚══════╝╚═╝  ╚═╝    ╚═╝   ╚═╝`;

  /* ================= Comandos ================= */
  const statusTxt = { online: "[PUBLICADO]", dev: "[EM DESENVOLVIMENTO]", local: "[LOCAL]" };
  const COMMANDS = {
    help: {
      desc: "lista os comandos",
      run: () => print([
        ...title("COMANDOS DISPONÍVEIS"),
        ...Object.entries(COMMANDS).filter(([, v]) => !v.hidden).map(([k, v]) =>
          `  ${c("\\" + k, pad("\\" + k + (v.args ? " " + v.args : ""), 22))}<span class="dim">${esc(v.desc)}</span>`),
        "",
        `<span class="dim">Dicas: Tab completa · ↑/↓ histórico · Ctrl+L limpa · clique nos comandos sublinhados</span>`
      ])
    },
    info: {
      desc: "quem sou eu",
      run: async () => {
        line(`<div class="photo-ascii"><img src="assets/img/profile.jpg" alt="Foto de Fabio Firmino"><div>` +
          `<span class="hi">${esc(PROFILE.name.toUpperCase())}</span>\n` +
          `<span class="dim">cargo   </span> ${esc(PROFILE.role)}\n` +
          `<span class="dim">local   </span> ${esc(PROFILE.location)}\n` +
          `<span class="dim">exp     </span> ${PROFILE.years}+ anos com C#/.NET\n` +
          `<span class="dim">marca   </span> ${esc(PROFILE.brand)}\n` +
          `<span class="dim">status  </span> <span class="hl">● disponível para novos projetos</span>` +
          `</div></div>`);
        await sleep(60);
        await print(["", esc(PROFILE.summary), "", `Próximos: ${c("\\projetos")}  ${c("\\stack")}  ${c("\\exp")}  ${c("\\contato")}`]);
      }
    },
    sobre: {
      desc: "destaques e interesses",
      run: () => print([...title("SOBRE"), ...PROFILE.highlights.map((h) => `  <span class="hl">›</span> ${esc(h)}`), "", `<span class="dim">fora do código:</span> ${esc(INTERESTS)}`])
    },
    projetos: {
      desc: "meus projetos autorais",
      run: () => print([
        ...title(`PROJETOS (${PROJECTS.length})`),
        ...PROJECTS.map((p, i) => `  ${c("\\projeto " + (i + 1), `[${i + 1}] ${pad(p.name, 20)}`)}<span class="${p.status === "dev" ? "warn" : "dim"}">${statusTxt[p.status]}</span>\n      <span class="dim">${esc(p.tagline)}</span>`),
        "",
        `Digite ${c("\\projeto 1")} (ou o nome) para ver os detalhes.`
      ], 40)
    },
    projeto: {
      desc: "detalhes de um projeto",
      args: "<n>",
      run: async (arg) => {
        const q = (arg || "").toLowerCase().trim();
        const p = PROJECTS[parseInt(q, 10) - 1] || PROJECTS.find((x) => x.id === q || x.name.toLowerCase().includes(q));
        if (!q || !p) return print([`<span class="err">projeto não encontrado.</span> Use ${c("\\projetos")} para ver a lista.`]);
        await print([
          ...title(p.name.toUpperCase()),
          `<span class="hl">${esc(p.tagline)}</span>`,
          `<span class="dim">status:</span> <span class="${p.status === "dev" ? "warn" : ""}">${statusTxt[p.status]}</span>   <span class="dim">ano:</span> ${esc(p.year)}`,
          "",
          esc(p.description),
          "",
          `<span class="dim">stack:</span> ${p.stack.map((s) => `[${esc(s)}]`).join(" ")}`,
          p.links.length ? `<span class="dim">links:</span>\n${p.links.map((l) => "  › " + a(l.url, l.label + " ↗")).join("\n")}` : `<span class="dim">links: em breve</span>`
        ], 30);
        const i = PROJECTS.indexOf(p);
        line(`\n${i > 0 ? c("\\projeto " + i, "‹ anterior") + "   " : ""}${i < PROJECTS.length - 1 ? c("\\projeto " + (i + 2), "próximo ›") : ""}`);
      }
    },
    exp: {
      desc: "experiência (resumo)",
      run: () => print([
        ...title("EXPERIÊNCIA — RESUMO"),
        esc(EXPERIENCE_SUMMARY),
        "",
        ...EXPERIENCE.map((x, i) => narrow()
          ? `<span class="${i === 0 ? "hl" : "dim"}">${esc(x.period)}</span>\n  <span class="hi">${esc(x.role)}</span>\n  <span class="dim">${esc(x.company)}</span>`
          : `  <span class="${i === 0 ? "hl" : "dim"}">${pad(x.period, 20)}</span><span class="hi">${esc(x.role)}</span>\n  ${" ".repeat(20)}<span class="dim">${esc(x.company)}</span>`),
        "",
        `Trajetória completa: ${a(LINKEDIN_EXP, "linkedin.com/in/fafirmino ↗")}`
      ], 35)
    },
    stack: {
      desc: "tecnologias",
      run: () => print([
        ...title("STACK"),
        ...SKILLS.map((s) => `<span class="hl">${pad(s.group, 20)}</span>${narrow() ? "\n  " : ""}${s.items.map(esc).join(" · ")}`)
      ], 40)
    },
    formacao: {
      desc: "formação acadêmica",
      run: () => print([...title("FORMAÇÃO"), ...EDUCATION.map((e) => narrow()
        ? `<span class="dim">${esc(e.period)}</span>\n  <span class="hi">${esc(e.course)}</span>\n  <span class="dim">${esc(e.school)}</span>`
        : `  <span class="dim">${pad(e.period, 14)}</span><span class="hi">${esc(e.course)}</span>\n  ${" ".repeat(14)}<span class="dim">${esc(e.school)}</span>`)], 40)
    },
    certs: {
      desc: "cursos e certificações",
      run: () => print([...title("CERTIFICAÇÕES"), ...CERTS.map((x) => `  <span class="hl">✓</span> ${esc(x)}`)], 25)
    },
    contato: {
      desc: "como falar comigo",
      run: () => print([
        ...title("CONTATO"),
        `  <span class="dim">e-mail   </span> ${a("mailto:" + PROFILE.email, PROFILE.email)}`,
        `  <span class="dim">linkedin </span> ${a(PROFILE.linkedin, "linkedin.com/in/fafirmino")}`,
        `  <span class="dim">gitlab   </span> ${a(PROFILE.gitlab, "gitlab.com/ffirmino")}`,
        `  <span class="dim">github   </span> ${a(PROFILE.github, "github.com/ffirmino")}`,
        `  <span class="dim">whatsapp </span> ${a(PROFILE.whatsapp, "enviar mensagem")}`,
        "",
        `<span class="dim">atalhos:</span> ${c("\\linkedin")} ${c("\\gitlab")} ${c("\\github")} ${c("\\whatsapp")} ${c("\\email")}`
      ])
    },
    linkedin: { desc: "abre o LinkedIn", hidden: true, run: () => openUrl(PROFILE.linkedin, "LinkedIn") },
    gitlab: { desc: "abre o GitLab", hidden: true, run: () => openUrl(PROFILE.gitlab, "GitLab") },
    github: { desc: "abre o GitHub", hidden: true, run: () => openUrl(PROFILE.github, "GitHub") },
    whatsapp: { desc: "abre o WhatsApp", hidden: true, run: () => openUrl(PROFILE.whatsapp, "WhatsApp") },
    email: { desc: "envia e-mail", hidden: true, run: () => openUrl("mailto:" + PROFILE.email, "cliente de e-mail") },
    tema: {
      desc: "verde | ambar | azul",
      args: "<cor>",
      run: (arg) => {
        const t = (arg || "").toLowerCase().replace("â", "a");
        if (!["verde", "ambar", "azul"].includes(t)) return print([`uso: \\tema ${c("\\tema verde", "verde")} | ${c("\\tema ambar", "ambar")} | ${c("\\tema azul", "azul")}`]);
        document.body.className = "theme-" + t; fg = color();
        try { localStorage.setItem("fsk-tema", t); } catch (e) {}
        return print([`tema alterado para <span class="hl">${t}</span>.`]);
      }
    },
    matrix: {
      desc: "entra na Matrix",
      run: async () => {
        await typeLine("Siga o coelho branco...", "hl", 45);
        await sleep(400);
        document.body.classList.add("matrix-full"); rainSpeed = 2.2;
        const fr = document.getElementById("fullrain"); fr.hidden = false;
        const exit = () => {
          document.body.classList.remove("matrix-full"); rainSpeed = 1; fr.hidden = true;
          removeEventListener("keydown", exit); fr.removeEventListener("click", exit); input.focus();
        };
        setTimeout(() => { addEventListener("keydown", exit); fr.addEventListener("click", exit); }, 300);
      }
    },
    legado: {
      desc: "abre o site antigo (2023)",
      run: async () => { await print(["carregando versão legado (2023)..."]); await sleep(500); location.href = "legado/"; }
    },
    whoami: { desc: "quem é você", hidden: true, run: () => print(["visitante — mas pode virar parceiro. Veja " + c("\\contato")]) },
    date: { desc: "data e hora", hidden: true, run: () => print([new Date().toLocaleString("pt-BR")]) },
    sudo: { desc: "", hidden: true, run: () => print([`<span class="err">permissão negada:</span> este incidente será reportado ao Fabio. ;)`]) },
    ls: { desc: "", hidden: true, run: () => print(["sobre.txt  projetos/  experiencia.log  stack.json  formacao.md  certs/  contato.vcf", `<span class="dim">(aqui os arquivos são comandos: tente ${c("\\help")})</span>`]) },
    clear: { desc: "limpa a tela", run: () => { out.innerHTML = ""; } },
    gui: {
      desc: "volta para o site normal",
      run: async () => {
        await print(["encerrando sessão...", "logout"]);
        await sleep(300); screen.classList.remove("on"); screen.classList.add("off");
        await sleep(600); location.href = "index.html";
      }
    }
  };
  const ALIASES = { ajuda: "help", "?": "help", cls: "clear", limpar: "clear", experiencia: "exp", "experiência": "exp", skills: "stack", projects: "projetos", project: "projeto", contact: "contato", exit: "gui", sair: "gui", site: "gui", about: "sobre", "formação": "formacao" };
  const openUrl = (url, name) => { print([`abrindo ${name}...`]); window.open(url, "_blank", "noopener"); };

  /* ================= Execução ================= */
  const history = []; let hIdx = 0; let busy = false;
  const run = async (raw) => {
    const text = raw.trim();
    line(`<span class="u">fabio@fsk-it</span>:<span class="p">~</span>$ <span class="hi">${esc(text)}</span>`);
    if (!text) return;
    if (history[history.length - 1] !== text) history.push(text);
    hIdx = history.length;
    const [first, ...rest] = text.replace(/^[\\\/]/, "").split(/\s+/);
    let name = first.toLowerCase(); name = ALIASES[name] || name;
    const cmd = COMMANDS[name];
    if (!cmd) {
      const sug = Object.keys(COMMANDS).find((k) => k.startsWith(name.slice(0, 2)));
      return print([`<span class="err">comando não encontrado:</span> ${esc(first)}` + (sug ? `  — você quis dizer ${c("\\" + sug)}?` : ""), `digite ${c("\\help")} para ver a lista.`]);
    }
    busy = true; input.disabled = true;
    try { await cmd.run(rest.join(" ")); } finally { busy = false; input.disabled = false; line(""); input.focus({ preventScroll: true }); scroll(); }
  };

  form.addEventListener("submit", (e) => { e.preventDefault(); if (busy) return; const v = input.value; input.value = ""; ghost.textContent = ""; run(v); });

  const allNames = () => Object.keys(COMMANDS).map((k) => "\\" + k);
  const completion = (v) => {
    if (!v) return "";
    const norm = v.startsWith("\\") || v.startsWith("/") ? "\\" + v.slice(1) : "\\" + v;
    if (/\s/.test(norm)) return "";
    const m = allNames().find((n) => n.startsWith(norm.toLowerCase()) && n !== norm.toLowerCase());
    return m ? v + m.slice(norm.length) : "";
  };
  input.addEventListener("input", () => { ghost.textContent = completion(input.value); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Tab") { e.preventDefault(); const m = completion(input.value); if (m) { input.value = m.startsWith("\\") ? m : "\\" + m; ghost.textContent = ""; } }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (hIdx > 0) { input.value = history[--hIdx]; ghost.textContent = ""; } }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (hIdx < history.length - 1) input.value = history[++hIdx]; else { hIdx = history.length; input.value = ""; } ghost.textContent = ""; }
    else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); out.innerHTML = ""; }
    else if (e.key === "c" && e.ctrlKey && !getSelection().toString()) { line(`<span class="u">fabio@fsk-it</span>:<span class="p">~</span>$ ${esc(input.value)}^C`); input.value = ""; ghost.textContent = ""; }
  });

  const clickCmd = (e) => { const el = e.target.closest("[data-cmd]"); if (el && !busy) { e.preventDefault(); run(el.dataset.cmd); } };
  out.addEventListener("click", clickCmd);
  document.getElementById("quick").addEventListener("click", clickCmd);
  term.addEventListener("click", (e) => { if (!e.target.closest("a,[data-cmd]") && !getSelection().toString()) input.focus({ preventScroll: true }); });

  document.getElementById("quick").innerHTML =
    ["\\info", "\\projetos", "\\exp", "\\stack", "\\contato", "\\matrix", "\\help", "\\gui"]
      .map((k) => `<button type="button" data-cmd="${k}">${k}</button>`).join("");

  /* ================= Boot ================= */
  try { const t = localStorage.getItem("fsk-tema"); if (t) { document.body.className = "theme-" + t; fg = color(); } } catch (e) {}

  const boot = async () => {
    screen.classList.add("on");
    await sleep(900);
    const visited = (() => { try { return sessionStorage.getItem("fsk-boot"); } catch (e) { return null; } })();
    if (!visited) {
      await print([
        `<span class="dim">FSK-BIOS v2.0.26  (C) ${new Date().getFullYear()} FSK IT</span>`,
        `<span class="dim">CPU: C# Core @ 17 anos de experiência ........ OK</span>`,
        `<span class="dim">RAM: ${PROJECTS.length} projetos carregados ..................... OK</span>`,
        `<span class="dim">NET: estabelecendo conexão segura com fsk-it ... OK</span>`
      ], 160);
      await sleep(250);
      const bar = line("", "dim");
      for (let i = 0; i <= 24; i++) { bar.textContent = "carregando portfólio [" + "█".repeat(i) + "░".repeat(24 - i) + "] " + Math.round(i / 24 * 100) + "%"; await sleep(35); }
      await sleep(200);
      try { sessionStorage.setItem("fsk-boot", "1"); } catch (e) {}
    }
    line(BANNER, "ascii");
    await sleep(100);
    await typeLine(`Bem-vindo(a) ao terminal de ${PROFILE.name}.`, "hi", 18);
    await print([
      `<span class="dim">${esc(PROFILE.role)} · ${esc(PROFILE.location)}</span>`,
      "",
      `Digite ${c("\\info")} para começar ou ${c("\\help")} para ver todos os comandos.`,
      ""
    ], 60);
    input.disabled = false; input.focus();
  };
  boot();
})();
