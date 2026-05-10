// Footer year
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('footer-year');
  if (yearSpan) {
    yearSpan.textContent = `@${new Date().getFullYear()}`;
  }

  loadMenu();
  loadBranches();
  setupForm();
});

// =========================
//      MENU SECTIONS
// =========================

function loadMenu() {
  const container = document.getElementById('menu-container');
  if (!container) return;

  fetch('menu.xml')
    .then(res => res.text())
    .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    .then(xml => {
      const items = Array.from(xml.getElementsByTagName('item'));

      // Categorías según el case study
      const categories = {
        meals: [
          "Beetroot and feta salad",
          "Sourdough Rye Sandwich",
          "Spinach Pie and Salad",
          "Feta pancakes with salad"
        ],
        coffee: [
          "Small Coffee",
          "Regular Coffee",
          "Large Coffee"
        ],
        other: [
          "Soda",
          "Fresh juice",
          "Bottled water"
        ]
      };

      // Crear secciones
      const sections = {
        meals: createSection("Meals"),
        coffee: createSection("Coffee & Hot Chocolate"),
        other: createSection("Other Beverages")
      };

      // Insertar secciones en el contenedor
      container.appendChild(sections.meals);
      container.appendChild(sections.coffee);
      container.appendChild(sections.other);

      // Clasificar items
      items.forEach(item => {
        const name = item.getElementsByTagName('name')[0].textContent;
        const desc = item.getElementsByTagName('description')[0].textContent;
        const price = item.getElementsByTagName('price')[0].textContent;
        const image = item.getElementsByTagName('image')[0].textContent;

        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
          <img src="${image}" alt="${name}">
          <h3>${name}</h3>
          <p>${desc}</p>
          <strong>${price}</strong>
        `;

        if (categories.meals.includes(name)) {
          sections.meals.appendChild(div);
        } else if (categories.coffee.includes(name)) {
          sections.coffee.appendChild(div);
        } else {
          sections.other.appendChild(div);
        }
      });
    })
    .catch(console.error);
}

function createSection(title) {
  const section = document.createElement('div');
  section.className = 'menu-section';
  section.innerHTML = `<h2 class="menu-title">${title}</h2>`;
  return section;
}

// =========================
//      BRANCHES
// =========================

function loadBranches() {
  const container = document.getElementById('branches-container');
  if (!container) return;

  fetch('branches.xml')
    .then(res => res.text())
    .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    .then(xml => {
      const branches = xml.getElementsByTagName('branch');
      Array.from(branches).forEach(branch => {
        const name = branch.getElementsByTagName('name')[0].textContent;
        const address = branch.getElementsByTagName('address')[0].textContent;
        const phone = branch.getElementsByTagName('phone')[0].textContent;
        const hours = branch.getElementsByTagName('hours')[0].textContent;
        const maplink = branch.getElementsByTagName('maplink')[0].textContent;

        const div = document.createElement('div');
        div.className = 'branch-card';
        div.innerHTML = `
          <h3>${name}</h3>
          <p>${address}</p>
          <p>Phone: ${phone}</p>
          <p>Hours: ${hours}</p>
          <a href="${maplink}" target="_blank">View on Google Maps</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(console.error);
}

// =========================
//      FORM
// =========================

function setupForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Your message has been sent.');
    form.reset();
  });
}
