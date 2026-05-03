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

function loadMenu() {
  const container = document.getElementById('menu-container');
  if (!container) return;

  fetch('menu.xml')
    .then(res => res.text())
    .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    .then(xml => {
      const items = xml.getElementsByTagName('item');
      Array.from(items).forEach(item => {
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
        container.appendChild(div);
      });
    })
    .catch(console.error);
}

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

function setupForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Your message has been sent.');
    form.reset();
  });
}
