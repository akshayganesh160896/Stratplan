const projects = [
  {
    name: "One-Click Gift Chart",
    category: "Web App",
    description: "Interactive gift planning chart for quick decision-making.",
    tech: ["React", "Vercel"],
    url: "https://one-click-gift-chart-final.vercel.app/",
    thumbnail: "assets/thumbnails/gift-chart.svg"
  },
  {
    name: "Memo Builder",
    category: "Website",
    description: "Creates polished memos quickly with structured sections.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://akshayganesh160896.github.io/MemoBuilder/",
    thumbnail: "assets/thumbnails/memo-builder.svg"
  },
  {
    name: "Stratplan",
    category: "Web App",
    description: "Strategic planning workspace for organizing plans and priorities.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://akshayganesh160896.github.io/Stratplan/",
    thumbnail: "assets/thumbnails/stratplan.svg"
  }
];

const projectGrid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const template = document.getElementById("projectCardTemplate");
const canvas = document.getElementById("interactiveBg");

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((chunk) => chunk[0])
    .join("")
    .toUpperCase();
}

function createProjectCard(project) {
  const card = template.content.firstElementChild.cloneNode(true);

  card.querySelector(".tag").textContent = project.category;
  card.querySelector("h2").textContent = project.name;
  card.querySelector(".description").textContent = project.description;
  card.querySelector(".tech-stack").textContent = `Stack: ${project.tech.join(" • ")}`;

  const thumbnailWrap = card.querySelector(".thumbnail-wrap");
  const thumbnail = card.querySelector(".thumbnail");
  const fallback = card.querySelector(".thumbnail-fallback");

  fallback.textContent = getInitials(project.name);
  thumbnail.alt = `${project.name} preview`;

  if (project.thumbnail) {
    thumbnail.src = project.thumbnail;
    thumbnail.addEventListener("error", () => {
      thumbnailWrap.classList.add("no-image");
    });
  } else {
    thumbnailWrap.classList.add("no-image");
  }

  const link = card.querySelector(".visit-btn");
  if (project.url && project.url !== "#") {
    link.href = project.url;
  } else {
    link.href = "#";
    link.setAttribute("aria-disabled", "true");
    link.textContent = "Add URL";
    link.addEventListener("click", (event) => event.preventDefault());
  }

  attachCardTilt(card);
  return card;
}

function renderProjects(query = "") {
  const search = query.trim().toLowerCase();
  projectGrid.innerHTML = "";

  const filtered = projects.filter((project) => {
    const searchable = [
      project.name,
      project.category,
      project.description,
      project.tech.join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(search);
  });

  filtered.forEach((project) => {
    projectGrid.appendChild(createProjectCard(project));
  });

  emptyState.hidden = filtered.length !== 0;
}

function attachCardTilt(card) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - py) * 5;
    const rotateY = (px - 0.5) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
}

function setupInteractiveBackground() {
  const ctx = canvas.getContext("2d");
  const particles = [];
  const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 };

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function makeParticles() {
    const count = window.innerWidth < 700 ? 36 : 64;
    particles.length = 0;

    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 0.8 + Math.random() * 2.4
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const particle of particles) {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.max(0, 120 - dist) / 9000;

      particle.vx += (dx / dist) * pull;
      particle.vy += (dy / dist) * pull;
      particle.vx *= 0.985;
      particle.vy *= 0.985;

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -10) particle.x = window.innerWidth + 10;
      if (particle.x > window.innerWidth + 10) particle.x = -10;
      if (particle.y < -10) particle.y = window.innerHeight + 10;
      if (particle.y > window.innerHeight + 10) particle.y = -10;

      ctx.beginPath();
      ctx.fillStyle = "rgba(210, 233, 255, 0.56)";
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    makeParticles();
  });

  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;

    document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
    document.documentElement.style.setProperty("--my", `${event.clientY}px`);
  });

  resize();
  makeParticles();
  draw();
}

searchInput.addEventListener("input", (event) => {
  renderProjects(event.target.value);
});

renderProjects();
setupInteractiveBackground();
