// Smooth scroll untuk tombol "Lihat Karyaku"
const btnScroll = document.querySelector('.btn[href="#projects"]');
if (btnScroll) {
  btnScroll.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Smooth scroll untuk semua navigasi
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Reveal on scroll
const sections = document.querySelectorAll('.section');
function revealSections() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Elemen teks
const mainText = "Hello, I'm Satria";
const subText = "Software Engineer & Web Developer";
const typedElement = document.getElementById("typed-text");
const subElement = document.getElementById("sub-text");

// Efek ketik warna
function typeTextColorful(text, element, delay = 100, callback) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      const span = document.createElement("span");
      const isDark = document.body.classList.contains("dark");
      const colors = isDark
        ? ["#ffffff", "#dddddd", "#bbbbbb"]
        : ["#111111", "#222222", "#000000"];
      span.textContent = text[i];
      span.style.color = colors[i % colors.length];
      element.appendChild(span);
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, delay);
}

// Efek ketik biasa
function typeText(element, text, speed = 30, callback) {
  let index = 0;
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// Konten "Our Profile" (dulu: About Me)
const aboutText = `Saya adalah web developer yang senang membangun website interaktif dan responsif. Berpengalaman dalam HTML, CSS, JavaScript, dan lebih banyak lagi.`;

const skills = [
  {
    title: "Frontend Development",
    desc: "Ahli dalam HTML, CSS, dan JavaScript untuk membangun antarmuka pengguna yang menarik dan responsif.",
    icons: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    ]
  },
  {
    title: "Backend Development",
    desc: "Pengalaman menggunakan Node.js dan Express.js untuk membangun API dan server-side logic yang efisien.",
    icons: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
    ]
  },
  {
    title: "UI/UX Design",
    desc: "Mengerti prinsip desain modern dan mampu membuat desain yang user-friendly menggunakan Figma.",
    icons: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
    ]
  }
];

// Update tema pada skill card
function updateCardTheme(card) {
  const isDark = document.body.classList.contains("dark");
  card.style.backgroundColor = isDark ? "#222" : "#f2f2f2";
  card.style.color = isDark ? "#fff" : "#111";
  card.style.border = "1px solid " + (isDark ? "#444" : "#ccc");
}

// Ketik saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  // Ketik header
  if (typedElement && typedElement.children.length === 0) {
    typeTextColorful(mainText, typedElement, 100, () => {
      setTimeout(() => {
        typeText(subElement, subText);
      }, 500);
    });
  }

  // Ketik profil dan tampilkan skill
  const aboutEl = document.getElementById("about-typing");
  const cardsEl = document.getElementById("skill-cards");

  if (aboutEl && aboutEl.textContent.trim() === "") {
    typeText(aboutEl, aboutText, 30, () => {
      skills.forEach((skill, i) => {
        setTimeout(() => {
          const card = document.createElement("div");
          card.className = "skill-card";

          const titleEl = document.createElement("h3");
          titleEl.textContent = skill.title;

          const descEl = document.createElement("p");

          const iconContainer = document.createElement("div");
          iconContainer.className = "skill-card-icons";

          skill.icons.forEach(url => {
            const img = document.createElement("img");
            img.src = url;
            img.alt = "icon";
            iconContainer.appendChild(img);
          });

          card.appendChild(titleEl);
          card.appendChild(descEl);
          card.appendChild(iconContainer);
          updateCardTheme(card);
          cardsEl.appendChild(card);

          typeText(descEl, skill.desc, 20);
        }, i * 1000);
      });
    });
  }
});

// Toggle tema dark/light
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Update warna skill card
  document.querySelectorAll(".skill-card").forEach(updateCardTheme);

  // Update warna teks header ketikan
  if (typedElement && typedElement.children.length > 0) {
    [...typedElement.children].forEach((span, i) => {
      const colors = isDark
        ? ["#ffffff", "#dddddd", "#bbbbbb"]
        : ["#111111", "#222222", "#000000"];
      span.style.color = colors[i % colors.length];
    });
  }
});

// Dummy submit form
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Your message has been sent!");
  });
}
