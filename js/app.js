'use strict';

const STORAGE_KEYS = {
  products: 'caballoP5',
  orders: 'caballoO5',
  session: 'caballoS5',
  cart: 'caballoC5',
  users: 'caballoU5'
};

const seedUsers = [
  { id: 1, name: 'Laura Cliente', email: 'cliente@demo.com', password: '1234', role: 'cliente', phone: '600 123 456' },
  { id: 2, name: 'Admin Obrador', email: 'admin@demo.com', password: '1234', role: 'admin', phone: '600 654 321' }
];

const categoryMeta = {
  novedades: { title: 'Novedades', subtitle: 'Selección destacada de temporada.', tag: 'Temporada' },
  desayunos: { title: 'Desayunos', subtitle: 'Opciones individuales y para grupos.', tag: 'Mañanas especiales' },
  salados: { title: 'Salados', subtitle: 'Bocados y bandejas para compartir.', tag: 'Para eventos' },
  bolleria: { title: 'Bollería y panes', subtitle: 'Horneado diario, masas y panes artesanos.', tag: 'Horno diario' },
  pasteleria: { title: 'Pastelería', subtitle: 'Tartas y dulces para celebraciones.', tag: 'Celebraciones' },
  gourmet: { title: 'Gourmet y regalos', subtitle: 'Detalles especiales.', tag: 'Regalos' },
  regalos: { title: 'Regalos', subtitle: 'Cajas preparadas para sorprender.', tag: 'Detalles' },
  bebidas: { title: 'Bebidas', subtitle: 'Bebidas para acompañar.', tag: 'Bebidas' }
};

const $ = (id) => document.getElementById(id);

function product(id, title, desc, category, emoji, colorA, colorB, stock, active, variants, badge = '', image = '') {
  return { id, title, desc, category, emoji, colorA, colorB, stock, active, variants, badge, image };
}

const defaultProducts = [
  product('chocolate-francesa', 'Chocolate a la francesa', '500 ml de chocolate para servir caliente.', 'novedades', '☕', '#6f3829', '#e9b17d', 24, true, [{ name: '500 ml', price: 7.5 }], 'Nuevo'),
  product('turron-artesano', 'Tabletas de turrón', 'Diferentes sabores de obrador propio.', 'novedades', '🍫', '#7a332b', '#f2c185', 18, true, [{ name: 'Yema', price: 6 }, { name: 'Trufa caramelo', price: 6 }, { name: 'Almendra y naranja', price: 6 }], 'Edición limitada'),
  product('roscon-clasico', 'Roscón clásico', 'Masa aromática con fruta confitada y almendra.', 'novedades', '👑', '#b3543f', '#f7d9a9', 9, true, [{ name: 'Pequeño 4 raciones', price: 22.5 }, { name: 'Mediano 8 raciones', price: 30 }, { name: 'Grande 12 raciones', price: 40 }], 'Popular'),
  product('polvorones', 'Caja de polvorones', 'Dulce tradicional en caja para compartir.', 'novedades', '🍪', '#a1704b', '#f4dfbd', 5, true, [{ name: 'Caja 240 g', price: 7 }], 'Bajo stock'),
  product('caja-mini-bolleria', 'Caja mini bollería', 'Surtido de mini cruasanes, napolitanas y caracolas.', 'desayunos', '🥐', '#bf6d37', '#ffdc9f', 16, true, [{ name: '12 unidades', price: 16 }, { name: '24 unidades', price: 29 }]),
  product('zumo-natural', 'Zumo natural', 'Botella de zumo recién exprimido.', 'desayunos', '🍊', '#f09a20', '#ffe0a3', 42, true, [{ name: '250 ml', price: 3.2 }, { name: '500 ml', price: 5.9 }]),
  product('empanada-atun', 'Empanada de atún', 'Masa crujiente con relleno jugoso.', 'salados', '🥟', '#b7653d', '#ffd5a5', 12, true, [{ name: 'Media pieza', price: 14.5 }, { name: 'Pieza completa', price: 27 }]),
  product('pincho-tortilla', 'Pincho de tortilla', 'Tortilla española en porciones.', 'salados', '🍳', '#c98632', '#ffe4a8', 31, true, [{ name: 'Unidad', price: 3.75 }, { name: 'Bandeja 12 uds', price: 39 }]),
  product('croissant-mantequilla', 'Croissant de mantequilla', 'Hojaldrado clásico con mantequilla.', 'bolleria', '🥐', '#c7813d', '#ffe0a4', 34, true, [{ name: 'Unidad', price: 2.2 }, { name: 'Pack 6', price: 12 }], 'Más vendido'),
  product('napolitana-chocolate', 'Napolitana de chocolate', 'Masa crujiente rellena de crema de cacao.', 'bolleria', '🍫', '#77402c', '#e5b17a', 19, true, [{ name: 'Unidad', price: 2.5 }, { name: 'Pack 6', price: 13.5 }]),
  product('tarta-chocolate', 'Tarta de chocolate', 'Bizcocho húmedo y crema intensa de cacao.', 'pasteleria', '🍰', '#7d332b', '#e7a777', 7, true, [{ name: '6 raciones', price: 24 }, { name: '10 raciones', price: 36 }], 'Favorita'),
  product('tarta-queso', 'Tarta de queso', 'Cremosa, tostada y con base crujiente.', 'pasteleria', '🍮', '#c98c55', '#ffe1b7', 11, true, [{ name: '6 raciones', price: 25 }, { name: '10 raciones', price: 38 }]),
  product('caja-delicias', 'Caja de delicias', 'Selección premium de dulces artesanos.', 'regalos', '🎁', '#aa2f2a', '#f8c8ae', 14, true, [{ name: 'Caja pequeña', price: 19.5 }, { name: 'Caja grande', price: 34 }], 'Regalo'),
  product('cafe-molido', 'Café molido selección', 'Café aromático para acompañar tus dulces.', 'bebidas', '☕', '#6f3c2d', '#c99062', 26, true, [{ name: 'Paquete 250 g', price: 8.5 }])
];

const defaultOrders = [
  {
    id: 10024,
    userId: 1,
    date: '2026-05-04',
    status: 'Preparando',
    tienda: 'Tienda principal',
    pickupDate: '2026-05-08',
    pickupTime: '10:00 – 10:30',
    total: 42.5,
    items: [
      { productId: 'roscon-clasico', title: 'Roscón clásico', variant: 'Pequeño 4 raciones', qty: 1, price: 22.5 },
      { productId: 'caja-mini-bolleria', title: 'Caja mini bollería', variant: '12 unidades', qty: 1, price: 16 },
      { productId: 'zumo-natural', title: 'Zumo natural', variant: '250 ml', qty: 1, price: 4 }
    ]
  },
  {
    id: 10017,
    userId: 1,
    date: '2026-04-28',
    status: 'Entregado',
    tienda: 'CC Espacio',
    pickupDate: '2026-05-01',
    pickupTime: '17:00 – 17:30',
    total: 31,
    items: [
      { productId: 'empanada-atun', title: 'Empanada de atún', variant: 'Media pieza', qty: 1, price: 14.5 },
      { productId: 'croissant-mantequilla', title: 'Croissant de mantequilla', variant: 'Pack 6', qty: 1, price: 12 },
      { productId: 'zumo-natural', title: 'Zumo natural', variant: '250 ml', qty: 1, price: 4.5 }
    ]
  }
];

function loadOrSeed(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (error) {
    console.warn(`No se pudo leer ${key}`, error);
  }

  const copy = JSON.parse(JSON.stringify(fallback));
  localStorage.setItem(key, JSON.stringify(copy));
  return copy;
}

function loadUsers() {
  return loadOrSeed(STORAGE_KEYS.users, seedUsers);
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let users = loadUsers();
let products = loadOrSeed(STORAGE_KEYS.products, defaultProducts);
let orders = loadOrSeed(STORAGE_KEYS.orders, defaultOrders);
let session = JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || 'null');
let cart = loadOrSeed(STORAGE_KEYS.cart, []);
let activeFilter = 'all';
let searchTerm = '';
let editingProductId = null;
let selectedTienda = 'tienda1';

const sectionsEl = $('sections');
const emptyState = $('emptyState');
const cartDrawer = $('cartDrawer');
const overlay = $('overlay');
const cartItemsEl = $('cartItems');
const cartTotal = $('cartTotal');
const cartCount = $('cartCount');
const toast = $('toast');
const mobilePanel = $('mobilePanel');
const loginModal = $('loginModal');
const registerModal = $('registerModal');
const checkoutModal = $('checkoutModal');

function escHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function fmtPrice(value) {
  return Number(value || 0).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}

function normStatus(status) {
  return String(status || '').toLowerCase().replaceAll(' ', '-').replace('en-reparto', 'reparto');
}

function stockCls(stock) {
  if (stock <= 0) return 'out';
  if (stock <= 5) return 'low';
  return '';
}

function svgImg(item) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 760'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='${item.colorA}' offset='0'/><stop stop-color='${item.colorB}' offset='1'/></linearGradient><filter id='s'><feDropShadow dx='0' dy='22' stdDeviation='28' flood-color='rgba(48,28,18,.28)'/></filter></defs><rect width='900' height='760' fill='url(#g)'/><circle cx='705' cy='135' r='170' fill='rgba(255,255,255,.19)'/><rect x='130' y='118' width='640' height='490' rx='70' fill='rgba(255,255,255,.55)' filter='url(#s)'/><text x='450' y='390' text-anchor='middle' dominant-baseline='middle' font-size='190'>${item.emoji}</text><text x='450' y='650' text-anchor='middle' font-family='Montserrat,Arial' font-size='38' font-weight='700' fill='rgba(255,255,255,.94)'>${escHtml(item.title)}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getImg(item) {
  return item?.image || svgImg(item);
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve('');
    if (!file.type.startsWith('image/')) return reject(new Error('El archivo debe ser una imagen'));
    if (file.size > 900 * 1024) return reject(new Error('La imagen pesa demasiado. Máximo 900 KB'));

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
    reader.readAsDataURL(file);
  });
}

function priceText(item) {
  const prices = (item.variants || []).map((variant) => Number(variant.price));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? fmtPrice(min) : `${fmtPrice(min)} – ${fmtPrice(max)}`;
}

function renderStore() {
  const activeProducts = products.filter((item) => item.active);
  let visible = 0;

  sectionsEl.innerHTML = Object.entries(categoryMeta).map(([category, meta]) => {
    const categoryProducts = activeProducts.filter((item) => {
      const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
      const searchable = `${item.title} ${item.desc} ${item.category}`.toLowerCase();
      const matchesSearch = !searchTerm || searchable.includes(searchTerm);
      return item.category === category && matchesCategory && matchesSearch;
    });

    if (!categoryProducts.length) return '';
    visible += categoryProducts.length;

    return `<section id="${category}"><div class="section-head"><div><h2>${meta.title}</h2><p>${meta.subtitle}</p></div><span class="section-tag">${meta.tag}</span></div><div class="product-grid">${categoryProducts.map(renderCard).join('')}</div></section>`;
  }).join('');

  emptyState.style.display = visible ? 'none' : 'block';
  bindCards();
}

function renderCard(item) {
  const variants = item.variants || [];
  const disabled = item.stock <= 0;

  return `<article class="product-card" data-id="${escHtml(item.id)}"><a class="product-media" href="javascript:void(0)"><img src="${getImg(item)}" alt="${escHtml(item.title)}" loading="lazy">${item.badge ? `<span class="badge">${escHtml(item.badge)}</span>` : ''}<span class="stock-badge ${stockCls(item.stock)}">${item.stock <= 0 ? 'Agotado' : `${item.stock} uds`}</span></a><div class="product-body"><h3 class="product-title">${escHtml(item.title)}</h3><p class="product-desc">${escHtml(item.desc)}</p><div class="product-bottom">${variants.length > 1 ? `<select class="variant-select" ${disabled ? 'disabled' : ''}><option value="">Seleccionar</option>${variants.map((variant, index) => `<option value="${index}">${escHtml(variant.name)}: ${fmtPrice(variant.price)}</option>`).join('')}</select>` : ''}<span class="price">${priceText(item)}</span><button class="add-btn" data-action="add" ${disabled ? 'disabled' : ''}>＋</button></div></div></article>`;
}

function bindCards() {
  document.querySelectorAll('[data-action="add"]').forEach((button) => {
    button.onclick = () => {
      const card = button.closest('.product-card');
      const item = products.find((productItem) => productItem.id === card.dataset.id);
      const select = card.querySelector('.variant-select');
      let variantIndex = 0;

      if (select) {
        if (!select.value) {
          showToast('Selecciona una variante');
          select.focus();
          return;
        }
        variantIndex = Number(select.value);
      }

      addToCart(item, item.variants[variantIndex]);
    };
  });
}

function addToCart(item, variant) {
  if (!item || item.stock <= 0) {
    showToast('Producto sin stock');
    return;
  }

  const quantityInCart = cart.filter((line) => line.id === item.id).reduce((sum, line) => sum + line.qty, 0);
  if (quantityInCart >= item.stock) {
    showToast('No hay más stock disponible');
    return;
  }

  const key = `${item.id}-${variant.name}`;
  const existing = cart.find((line) => line.key === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ key, id: item.id, title: item.title, variant: variant.name, price: Number(variant.price), image: getImg(item), qty: 1 });
  }

  save(STORAGE_KEYS.cart, cart);
  updateCart();
  showToast(`${item.title} añadido`);
  openCart();
}

function updateCart() {
  const quantity = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  cartCount.textContent = quantity;
  cartTotal.textContent = fmtPrice(total);

  if (!cart.length) {
    cartItemsEl.innerHTML = '<p style="color:var(--muted);line-height:1.6;padding:10px 0">Tu cesta está vacía.</p>';
    save(STORAGE_KEYS.cart, cart);
    return;
  }

  cartItemsEl.innerHTML = cart.map((line) => `<div class="cart-item" data-key="${escHtml(line.key)}"><img src="${line.image}" alt="${escHtml(line.title)}"><div><h4>${escHtml(line.title)}</h4><span>${escHtml(line.variant)} · ${fmtPrice(line.price)}</span><div class="qty"><button data-cart="minus">−</button><strong>${line.qty}</strong><button data-cart="plus">+</button></div></div><button class="remove" data-cart="remove">×</button></div>`).join('');

  document.querySelectorAll('[data-cart]').forEach((button) => {
    button.onclick = () => {
      const key = button.closest('.cart-item').dataset.key;
      const action = button.dataset.cart;
      const line = cart.find((item) => item.key === key);
      if (!line) return;

      const productItem = products.find((item) => item.id === line.id);
      const currentQuantity = cart.filter((item) => item.id === line.id).reduce((sum, item) => sum + item.qty, 0);

      if (action === 'plus') {
        if (productItem && currentQuantity >= productItem.stock) {
          showToast('Sin más stock');
          return;
        }
        line.qty += 1;
      }

      if (action === 'minus') line.qty = Math.max(1, line.qty - 1);
      if (action === 'remove') cart = cart.filter((item) => item.key !== key);

      save(STORAGE_KEYS.cart, cart);
      updateCart();
    };
  });
}

function openCart() {
  cartDrawer.classList.add('open');
  overlay.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  checkOverlay();
}

function checkOverlay() {
  const anyOpen = [loginModal, registerModal, checkoutModal, cartDrawer, mobilePanel].some((element) => element.classList.contains('open'));
  if (!anyOpen) overlay.classList.remove('open');
}

function openModal(modal) {
  modal.classList.add('open');
  overlay.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  checkOverlay();
}

function openLogin() {
  [registerModal, checkoutModal].forEach((modal) => closeModal(modal));
  openModal(loginModal);
}

function closeLogin() {
  closeModal(loginModal);
}

function openRegister() {
  closeModal(loginModal);
  openModal(registerModal);
}

function closeRegister() {
  closeModal(registerModal);
}

function openCheckoutModal() {
  if (!cart.length) {
    showToast('La cesta está vacía');
    return;
  }

  const user = currentUser();
  if (!user) {
    closeCart();
    openLogin();
    showToast('Inicia sesión para confirmar el encargo');
    return;
  }

  if (user.role === 'admin') {
    showToast('El admin no puede hacer encargos');
    return;
  }

  const total = cart.reduce((sum, line) => sum + line.qty * line.price, 0);
  $('checkoutSummary').innerHTML = `<h4>Resumen del encargo</h4>${cart.map((line) => `<div class="order-summary-item"><span>${escHtml(line.title)} ×${line.qty} <small>(${escHtml(line.variant)})</small></span><span>${fmtPrice(line.qty * line.price)}</span></div>`).join('')}<div class="order-summary-total"><span>Total</span><span>${fmtPrice(total)}</span></div>`;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  $('pickupDate').min = tomorrow.toISOString().slice(0, 10);
  $('pickupDate').value = '';
  $('pickupTime').value = '';

  selectedTienda = 'tienda1';
  document.querySelectorAll('.tienda-card').forEach((card) => card.classList.remove('selected'));
  $('tienda1').classList.add('selected');

  closeCart();
  openModal(checkoutModal);
}

window.selectTienda = function selectTienda(id) {
  selectedTienda = id;
  document.querySelectorAll('.tienda-card').forEach((card) => card.classList.toggle('selected', card.id === id));
};

function confirmOrder() {
  let ok = true;

  [$('dateError'), $('timeError')].forEach((element) => element.classList.remove('show'));
  [$('pickupDate'), $('pickupTime')].forEach((input) => input.classList.remove('error'));

  if (!$('pickupDate').value) {
    $('dateError').classList.add('show');
    $('pickupDate').classList.add('error');
    ok = false;
  }

  if (!$('pickupTime').value) {
    $('timeError').classList.add('show');
    $('pickupTime').classList.add('error');
    ok = false;
  }

  if (!ok) return;

  const user = currentUser();
  const tiendaLabel = selectedTienda === 'tienda1' ? 'Tienda principal' : 'CC Espacio Torrelodones';
  const badLine = cart.find((line) => {
    const productItem = products.find((item) => item.id === line.id);
    return !productItem || productItem.stock < line.qty;
  });

  if (badLine) {
    showToast(`Stock insuficiente: ${badLine.title}`);
    return;
  }

  const newOrder = {
    id: Math.max(10000, ...orders.map((order) => order.id)) + 1,
    userId: user.id,
    date: new Date().toISOString().slice(0, 10),
    status: 'Pendiente',
    tienda: tiendaLabel,
    pickupDate: $('pickupDate').value,
    pickupTime: $('pickupTime').value,
    total: cart.reduce((sum, line) => sum + line.qty * line.price, 0),
    items: cart.map((line) => ({ productId: line.id, title: line.title, variant: line.variant, qty: line.qty, price: line.price }))
  };

  products = products.map((item) => {
    const quantity = cart.filter((line) => line.id === item.id).reduce((sum, line) => sum + line.qty, 0);
    return quantity ? { ...item, stock: Math.max(0, item.stock - quantity) } : item;
  });

  orders.push(newOrder);
  cart = [];

  save(STORAGE_KEYS.products, products);
  save(STORAGE_KEYS.orders, orders);
  save(STORAGE_KEYS.cart, cart);

  updateCart();
  renderStore();
  closeModal(checkoutModal);
  showView('client');
  activateTab('clientTabs', 'clientOrders', 'client');
  showToast(`✓ Encargo #${newOrder.id} confirmado`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function currentUser() {
  return session ? users.find((user) => user.id === session.userId) || null : null;
}

function login(email, password) {
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);

  if (!user) {
    showToast('Email o contraseña incorrectos');
    return;
  }

  session = { userId: user.id, role: user.role, name: user.name, email: user.email };
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));

  closeLogin();
  updateAuthUI();
  showPortalForRole();
  showToast(`Bienvenido/a, ${user.name}`);
}

function register(name, email, phone, password) {
  if (users.find((user) => user.email.toLowerCase() === email.toLowerCase())) {
    showToast('Ya existe una cuenta con ese email');
    return;
  }

  const newUser = {
    id: Math.max(...users.map((user) => user.id)) + 1,
    name,
    email: email.toLowerCase(),
    password,
    role: 'cliente',
    phone
  };

  users.push(newUser);
  save(STORAGE_KEYS.users, users);

  session = { userId: newUser.id, role: 'cliente', name: newUser.name, email: newUser.email };
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));

  closeRegister();
  updateAuthUI();
  showPortalForRole();
  showToast(`¡Cuenta creada! Bienvenido/a, ${newUser.name}`);
}

function logout() {
  session = null;
  localStorage.removeItem(STORAGE_KEYS.session);
  updateAuthUI();
  showView('store');
  showToast('Sesión cerrada');
}

function updateAuthUI() {
  const user = currentUser();
  $('loginBtn').hidden = !!user;
  $('portalBtn').hidden = !user;
  $('logoutBtn').hidden = !user;

  if (user && $('portalBtn')) {
    $('portalBtn').textContent = user.role === 'admin' ? 'Panel admin' : 'Mi portal';
  }
}

function showView(viewName) {
  document.querySelectorAll('.view').forEach((element) => element.classList.remove('active'));

  if (viewName === 'client') {
    $('clientView').classList.add('active');
    renderClientPortal();
  } else if (viewName === 'admin') {
    $('adminView').classList.add('active');
    renderAdminPortal();
  } else {
    $('storeView').classList.add('active');
    renderStore();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPortalForRole() {
  const user = currentUser();
  if (!user) {
    openLogin();
    return;
  }

  user.role === 'admin' ? showView('admin') : showView('client');
}

function requireRole(role) {
  const user = currentUser();

  if (!user) {
    openLogin();
    return false;
  }

  if (user.role !== role) {
    showToast('Sin permisos');
    showPortalForRole();
    return false;
  }

  return true;
}

function renderClientPortal() {
  if (!requireRole('cliente')) return;

  const user = currentUser();
  const myOrders = orders.filter((order) => order.userId === user.id).sort((a, b) => b.id - a.id);
  const pending = myOrders.filter((order) => !['Entregado', 'Cancelado'].includes(order.status)).length;
  const total = myOrders.reduce((sum, order) => sum + Number(order.total), 0);
  const latest = myOrders[0];

  $('clientGreeting').textContent = `Hola, ${user.name}`;
  $('clientStats').innerHTML = `<article class="stat-card"><strong>Encargos realizados</strong><div class="stat-number">${myOrders.length}</div><p>Total de encargos en tu cuenta.</p></article><article class="stat-card"><strong>Encargos activos</strong><div class="stat-number">${pending}</div><p>Pendientes de preparación o recogida.</p></article><article class="stat-card"><strong>Total gastado</strong><div class="stat-number">${fmtPrice(total)}</div><p>Importe acumulado en tus encargos.</p></article>`;
  $('clientSummary').innerHTML = `<div class="panel-card"><h3>Resumen rápido</h3>${latest ? `<p>Tu último encargo es el <strong>#${latest.id}</strong>, para recoger el <strong>${latest.pickupDate}</strong> en <strong>${latest.tienda}</strong>. Estado: <span class="status ${normStatus(latest.status)}">${latest.status}</span>.</p><div class="form-actions"><button class="btn btn-primary" onclick="repeatOrder(${latest.id})">Repetir encargo</button><button class="btn" onclick="activateTab('clientTabs','clientOrders','client')">Ver todos</button></div>` : '<p>Aún no tienes encargos. ¡Empieza añadiendo productos a tu cesta!</p>'}</div>`;
  $('clientOrders').innerHTML = `<div class="panel-card"><h3>Mis encargos</h3>${renderOrdersTable(myOrders, false)}</div>`;
  $('clientProfile').innerHTML = `<div class="panel-card"><h3>Datos personales</h3><div class="form-grid"><div><label>Nombre</label><input class="form-control" value="${escHtml(user.name)}" disabled></div><div><label>Email</label><input class="form-control" value="${escHtml(user.email)}" disabled></div><div class="full"><label>Teléfono</label><input class="form-control" value="${escHtml(user.phone || '—')}" disabled></div></div></div>`;
}

function renderOrdersTable(list, admin) {
  if (!list.length) return '<p style="color:var(--muted)">No hay encargos para mostrar.</p>';

  return `<div class="table-wrap"><table><thead><tr><th>#</th>${admin ? '<th>Cliente</th>' : ''}<th>Fecha</th><th>Recogida</th><th>Tienda</th><th>Estado</th><th>Total</th><th></th></tr></thead><tbody>${list.map((order) => {
    const owner = users.find((user) => user.id === order.userId);
    return `<tr><td>#${order.id}</td>${admin ? `<td>${escHtml(owner ? owner.name : '—')}</td>` : ''}<td>${order.date}</td><td>${order.pickupDate || '—'}<br><small style="color:var(--muted)">${order.pickupTime || ''}</small></td><td>${escHtml(order.tienda || '—')}</td><td>${admin ? renderStatusSel(order) : `<span class="status ${normStatus(order.status)}">${escHtml(order.status)}</span>`}</td><td>${fmtPrice(order.total)}</td><td>${admin ? `<button class="btn btn-small" onclick="saveOrderStatus(${order.id})">Guardar</button>` : `<button class="btn btn-small" onclick="repeatOrder(${order.id})">Repetir</button>`}</td></tr>`;
  }).join('')}</tbody></table></div>`;
}

function renderStatusSel(order) {
  return `<select class="form-control" id="status-${order.id}" style="min-width:150px;padding:8px 12px;">${['Pendiente', 'Preparando', 'Listo para recoger', 'Entregado', 'Cancelado'].map((status) => `<option value="${status}" ${status === order.status ? 'selected' : ''}>${status}</option>`).join('')}</select>`;
}

function repeatOrder(id) {
  const order = orders.find((item) => item.id === id);
  if (!order) return;

  order.items.forEach((line) => {
    const productItem = products.find((item) => item.id === line.productId && item.active && item.stock > 0);
    if (!productItem) return;

    const variant = productItem.variants.find((item) => item.name === line.variant) || productItem.variants[0];
    for (let index = 0; index < line.qty; index += 1) addToCart(productItem, variant);
  });

  showView('store');
  openCart();
}

function renderAdminPortal() {
  if (!requireRole('admin')) return;

  const activeProducts = products.filter((item) => item.active).length;
  const lowStock = products.filter((item) => item.active && item.stock <= 5).length;
  const pending = orders.filter((order) => !['Entregado', 'Cancelado'].includes(order.status)).length;

  $('adminStats').innerHTML = `<article class="stat-card"><strong>Productos activos</strong><div class="stat-number">${activeProducts}</div><p>Visibles en la tienda.</p></article><article class="stat-card"><strong>Bajo stock</strong><div class="stat-number">${lowStock}</div><p>Con 5 unidades o menos.</p></article><article class="stat-card"><strong>Encargos pendientes</strong><div class="stat-number">${pending}</div><p>Necesitan gestión.</p></article>`;

  renderAdminProducts();
  renderAdminStock();
  renderAdminOrders();
}

function renderAdminProducts() {
  $('adminProducts').innerHTML = `<div class="panel-card"><h3>${editingProductId ? 'Editar producto' : 'Añadir producto'}</h3><form id="productForm">${renderProdFields(editingProductId ? products.find((item) => item.id === editingProductId) : null)}<div class="form-actions"><button class="btn btn-primary" type="submit">${editingProductId ? 'Guardar' : 'Añadir'}</button>${editingProductId ? '<button class="btn" type="button" onclick="cancelEditProduct()">Cancelar</button>' : ''}</div></form></div><div class="panel-card"><h3>Listado de productos</h3><div class="table-wrap"><table><thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${products.map((item) => `<tr><td><strong>${escHtml(item.title)}</strong><br><small style="color:var(--muted)">${escHtml(item.desc)}</small></td><td>${escHtml(categoryMeta[item.category]?.title || item.category)}</td><td>${priceText(item)}</td><td>${item.stock}</td><td>${item.active ? '<span class="status entregado">Activo</span>' : '<span class="status cancelado">Inactivo</span>'}</td><td><button class="btn btn-small" onclick="editProduct('${item.id}')">Editar</button> <button class="btn btn-small btn-danger" onclick="toggleProduct('${item.id}')">${item.active ? 'Desactivar' : 'Activar'}</button></td></tr>`).join('')}</tbody></table></div></div>`;
  bindProdForm();
}

function renderProdFields(item) {
  const source = item || { title: '', desc: '', category: 'novedades', emoji: '🍰', colorA: '#b72e24', colorB: '#f7d9a9', stock: 10, badge: '', image: '', variants: [{ name: 'Unidad', price: 9.9 }] };

  return `<div class="form-grid"><div><label>Nombre</label><input class="form-control" name="title" value="${escHtml(source.title)}" required></div><div><label>Categoría</label><select class="form-control" name="category">${Object.keys(categoryMeta).map((category) => `<option value="${category}" ${source.category === category ? 'selected' : ''}>${categoryMeta[category].title}</option>`).join('')}</select></div><div class="full"><label>Descripción</label><textarea class="form-control" name="desc" required>${escHtml(source.desc)}</textarea></div><div><label>Stock</label><input class="form-control" name="stock" type="number" min="0" value="${source.stock}" required></div><div><label>Etiqueta</label><input class="form-control" name="badge" value="${escHtml(source.badge || '')}" placeholder="Nuevo, Popular..."></div><div><label>Emoji</label><input class="form-control" name="emoji" value="${escHtml(source.emoji || '🍰')}"></div><div><label>Color A</label><input class="form-control" name="colorA" value="${escHtml(source.colorA || '#b72e24')}"></div><div><label>Color B</label><input class="form-control" name="colorB" value="${escHtml(source.colorB || '#f7d9a9')}"></div><div class="full"><label>URL imagen</label><input class="form-control" name="image" value="${escHtml(source.image || '')}" placeholder="https://..."></div><div class="full"><label>Subir imagen</label><input class="form-control" name="imageFile" type="file" accept="image/*">${source.image ? `<img class="preview-img" src="${escHtml(source.image)}" alt="preview">` : ''}</div><div class="full"><label>Variantes (Nombre:precio, ...)</label><input class="form-control" name="variants" value="${escHtml((source.variants || []).map((variant) => `${variant.name}:${variant.price}`).join(', '))}" required></div></div>`;
}

function bindProdForm() {
  const form = $('productForm');
  if (!form) return;

  form.onsubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    let uploaded = '';

    try {
      uploaded = await readFile(form.querySelector('input[name="imageFile"]').files[0]);
    } catch (error) {
      showToast(error.message);
      return;
    }

    const variants = String(data.get('variants'))
      .split(',')
      .map((raw) => {
        const [name, price] = raw.split(':');
        return { name: (name || '').trim(), price: Number(String(price || '').replace(',', '.')) };
      })
      .filter((variant) => variant.name && !Number.isNaN(variant.price));

    if (!variants.length) {
      showToast('Añade al menos una variante válida');
      return;
    }

    const payload = {
      title: data.get('title').trim(),
      desc: data.get('desc').trim(),
      category: data.get('category'),
      emoji: data.get('emoji').trim() || '🍰',
      colorA: data.get('colorA').trim() || '#b72e24',
      colorB: data.get('colorB').trim() || '#f7d9a9',
      stock: Number(data.get('stock')),
      active: true,
      variants,
      badge: data.get('badge').trim(),
      image: uploaded || data.get('image').trim()
    };

    if (editingProductId) {
      products = products.map((item) => item.id === editingProductId ? { ...item, ...payload } : item);
      editingProductId = null;
      showToast('Producto actualizado');
    } else {
      products.push({ id: mkId(payload.title), ...payload });
      showToast('Producto añadido');
    }

    save(STORAGE_KEYS.products, products);
    renderStore();
    renderAdminPortal();
  };
}

function mkId(title) {
  const base = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'producto';
  let id = base;
  let count = 1;

  while (products.some((item) => item.id === id)) {
    count += 1;
    id = `${base}-${count}`;
  }

  return id;
}

function editProduct(id) {
  editingProductId = id;
  activateTab('adminTabs', 'adminProducts', 'admin');
  renderAdminProducts();
  scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEditProduct() {
  editingProductId = null;
  renderAdminProducts();
}

function toggleProduct(id) {
  products = products.map((item) => item.id === id ? { ...item, active: !item.active } : item);
  save(STORAGE_KEYS.products, products);
  renderStore();
  renderAdminPortal();
  showToast('Estado actualizado');
}

function renderAdminStock() {
  $('adminStock').innerHTML = `<div class="panel-card"><h3>Control de stock</h3><div class="table-wrap"><table><thead><tr><th>Producto</th><th>Categoría</th><th>Stock actual</th><th>Actualizar</th><th></th></tr></thead><tbody>${products.map((item) => `<tr><td><strong>${escHtml(item.title)}</strong></td><td>${escHtml(categoryMeta[item.category]?.title || item.category)}</td><td><span class="status ${item.stock <= 5 ? 'preparando' : 'entregado'}">${item.stock} uds</span></td><td><input class="form-control" id="stock-${item.id}" type="number" min="0" value="${item.stock}" style="max-width:120px;padding:8px 12px;"></td><td><button class="btn btn-small" onclick="saveStock('${item.id}')">Guardar</button></td></tr>`).join('')}</tbody></table></div></div>`;
}

function saveStock(id) {
  const stock = Math.max(0, Number($(`stock-${id}`).value || 0));
  products = products.map((item) => item.id === id ? { ...item, stock } : item);
  save(STORAGE_KEYS.products, products);
  renderStore();
  renderAdminPortal();
  activateTab('adminTabs', 'adminStock', 'admin');
  showToast('Stock actualizado');
}

function renderAdminOrders() {
  const sorted = [...orders].sort((a, b) => b.id - a.id);
  $('adminOrders').innerHTML = `<div class="panel-card"><h3>Encargos de clientes</h3>${renderOrdersTable(sorted, true)}</div>`;
}

function saveOrderStatus(id) {
  const select = $(`status-${id}`);
  if (!select) return;

  orders = orders.map((order) => order.id === id ? { ...order, status: select.value } : order);
  save(STORAGE_KEYS.orders, orders);
  renderAdminPortal();
  activateTab('adminTabs', 'adminOrders', 'admin');
  showToast('Estado actualizado');
}

function activateTab(containerId, tabId, scope) {
  document.querySelectorAll(`#${containerId} .portal-tab`).forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === tabId));
  const view = scope === 'admin' ? $('adminView') : $('clientView');
  view.querySelectorAll('.portal-section').forEach((section) => section.classList.remove('active'));
  $(tabId).classList.add('active');
}

function bindEvents() {
  $('regPassword').oninput = function updateStrength() {
    const value = this.value;
    const fill = $('strengthFill');
    let score = 0;

    if (value.length >= 6) score += 1;
    if (value.length >= 10) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    fill.style.width = [0, 20, 40, 65, 85, 100][Math.min(score, 5)] + '%';
    fill.style.background = ['#ccc', 'var(--danger)', 'var(--warning)', 'var(--warning)', '#5aad7f', 'var(--ok)'][Math.min(score, 5)];
  };

  $('registerForm').onsubmit = (event) => {
    event.preventDefault();
    let ok = true;
    const name = $('regName').value.trim();
    const email = $('regEmail').value.trim();
    const password = $('regPassword').value;
    const password2 = $('regPassword2').value;
    const phone = $('regPhone').value.trim();

    [$('regName'), $('regEmail'), $('regPassword'), $('regPassword2')].forEach((input) => input.classList.remove('error'));
    [$('regNameError'), $('regEmailError'), $('regPassError'), $('regPass2Error')].forEach((error) => error.classList.remove('show'));

    if (!name) {
      $('regName').classList.add('error');
      $('regNameError').classList.add('show');
      ok = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $('regEmail').classList.add('error');
      $('regEmailError').classList.add('show');
      ok = false;
    }

    if (password.length < 6) {
      $('regPassword').classList.add('error');
      $('regPassError').classList.add('show');
      ok = false;
    }

    if (password !== password2) {
      $('regPassword2').classList.add('error');
      $('regPass2Error').classList.add('show');
      ok = false;
    }

    if (ok) register(name, email, phone, password);
  };

  $('loginForm').onsubmit = (event) => {
    event.preventDefault();
    let ok = true;

    [$('emailInput'), $('passwordInput')].forEach((input) => input.classList.remove('error'));
    [$('emailLoginError'), $('passLoginError')].forEach((error) => error.classList.remove('show'));

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('emailInput').value)) {
      $('emailInput').classList.add('error');
      $('emailLoginError').classList.add('show');
      ok = false;
    }

    if (!$('passwordInput').value) {
      $('passwordInput').classList.add('error');
      $('passLoginError').classList.add('show');
      ok = false;
    }

    if (ok) login($('emailInput').value, $('passwordInput').value);
  };

  $('searchInput').oninput = (event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    renderStore();
  };

  $('categoryNav').onclick = (event) => {
    const link = event.target.closest('a[data-filter]');
    if (!link) return;

    activeFilter = link.dataset.filter;
    document.querySelectorAll('#categoryNav a').forEach((anchor) => anchor.classList.toggle('active', anchor.dataset.filter === activeFilter));
    showView('store');
  };

  $('openCart').onclick = openCart;
  $('closeCart').onclick = closeCart;
  $('continueBtn').onclick = closeCart;
  $('checkoutBtn').onclick = openCheckoutModal;
  $('confirmOrderBtn').onclick = confirmOrder;
  $('cancelCheckoutBtn').onclick = () => closeModal(checkoutModal);
  $('closeCheckout').onclick = () => closeModal(checkoutModal);
  $('loginBtn').onclick = openLogin;
  $('heroLoginBtn').onclick = () => currentUser() ? showPortalForRole() : openLogin();
  $('portalBtn').onclick = showPortalForRole;
  $('logoutBtn').onclick = logout;
  $('homeLink').onclick = (event) => {
    event.preventDefault();
    showView('store');
  };
  $('closeLogin').onclick = closeLogin;
  $('closeRegister').onclick = closeRegister;
  $('goToRegister').onclick = openRegister;
  $('goToLogin').onclick = openLogin;
  $('fillAdmin').onclick = () => {
    $('emailInput').value = 'admin@demo.com';
    $('passwordInput').value = '1234';
  };
  $('fillClient').onclick = () => {
    $('emailInput').value = 'cliente@demo.com';
    $('passwordInput').value = '1234';
  };

  overlay.onclick = () => {
    closeCart();
    closeLogin();
    closeRegister();
    closeModal(checkoutModal);
    mobilePanel.classList.remove('open');
    checkOverlay();
  };

  $('openMenu').onclick = () => {
    mobilePanel.classList.add('open');
    overlay.classList.add('open');
  };

  $('closeMenu').onclick = () => {
    mobilePanel.classList.remove('open');
    checkOverlay();
  };

  mobilePanel.querySelectorAll('a').forEach((anchor) => {
    anchor.onclick = () => {
      if (anchor.dataset.mobileLogin !== undefined) openLogin();
      if (anchor.dataset.mobileView === 'store') showView('store');
      mobilePanel.classList.remove('open');
      checkOverlay();
    };
  });

  document.querySelectorAll('[data-view="store"]').forEach((button) => {
    button.onclick = () => showView('store');
  });

  $('clientTabs').onclick = (event) => {
    const tab = event.target.closest('.portal-tab');
    if (tab) activateTab('clientTabs', tab.dataset.tab, 'client');
  };

  $('adminTabs').onclick = (event) => {
    const tab = event.target.closest('.portal-tab');
    if (tab) activateTab('adminTabs', tab.dataset.tab, 'admin');
  };

  $('whatsappBtn').onclick = (event) => {
    event.preventDefault();
    window.open('https://api.whatsapp.com/send?phone=34678637290&text=' + encodeURIComponent('Hola, quiero hacer una consulta a Pastelería El Caballo Goloso'), '_blank', 'noopener,noreferrer');
  };
}

window.repeatOrder = repeatOrder;
window.editProduct = editProduct;
window.cancelEditProduct = cancelEditProduct;
window.toggleProduct = toggleProduct;
window.saveStock = saveStock;
window.saveOrderStatus = saveOrderStatus;
window.activateTab = activateTab;

bindEvents();
renderStore();
updateCart();
updateAuthUI();
