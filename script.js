/* ------------------------------------------------------------------
   CART (uses sessionStorage) + feedback + newsletter
   ------------------------------------------------------------------ */

// cart lives in sessionStorage
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
updateCartDisplay(); // show cart items on load

document.addEventListener('DOMContentLoaded', () => {
  /* ─ view-cart toggle (works anywhere the button + modal exist) ─ */
  const viewCartBtn = document.getElementById('view-cart');
  const cartModal   = document.getElementById('cart-modal');

  if (viewCartBtn && cartModal) {
    viewCartBtn.addEventListener('click', () => {
      cartModal.classList.toggle('hidden');
      updateCartDisplay();
    });
  }

  /* ─ add-to-cart buttons ─
     preferred:  <button class="add-cart" data-item="Yoga Mat"> */
  document.querySelectorAll('.add-cart').forEach(btn =>
    btn.addEventListener('click', () => addToCart(btn.dataset.item))
  );

  /* fallback for old  onclick="addToCart('Item')" buttons */
  document.querySelectorAll('button[onclick^="addToCart"]').forEach(btn =>
    btn.addEventListener('click', () => {
      const m = (btn.getAttribute('onclick') || '')
        .match(/addToCart\(['"](.+?)['"]\)/);
      if (m && m[1]) addToCart(m[1]);
    })
  );

  /* ─ newsletter quick alert ─ */
  const newsletter = document.getElementById('newsletter');
  if (newsletter) {
    newsletter.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thanks for subscribing!');
      newsletter.reset();
    });
  }

  /* ─ feedback form saves to localStorage ─ */
  const feedback = document.getElementById('feedback-form');
  if (feedback) {
    feedback.addEventListener('submit', e => {
      e.preventDefault();
      saveFeedback();
      alert('Feedback sent—thanks!');
      feedback.reset();
    });
  }
});

/* ---------- cart helpers (sessionStorage) ---------- */
function addToCart(item) {
  cart.push(item);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  alert(item + ' added to cart.');
  updateCartDisplay();
}

function updateCartDisplay() {
  const list = document.getElementById('cart-items');
  if (!list) return;

  list.innerHTML = '';
  if (cart.length === 0) {
    list.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }
  cart.forEach(i => {
    const li = document.createElement('li');
    li.textContent = i;
    list.appendChild(li);
  });
}

function clearCart() {
  cart = [];
  sessionStorage.removeItem('cart');
  updateCartDisplay();
}

function processOrder() {
  if (cart.length === 0) {
    alert('Cart is empty.');
    return;
  }
  alert('Thank you for your order!');
  clearCart();
}

/* ---------- feedback storage (localStorage) ---------- */
function saveFeedback() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const fb = { name, email, message, time: Date.now() };
  localStorage.setItem('feedback', JSON.stringify(fb));
}
