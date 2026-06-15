/* ==================================================== STATE & CONFIGURATION ==================================================== */
const API_URL = "https://dummyjson.com/products?limit=0";
let allProducts = [];
let cart = JSON.parse(localStorage.getItem("apex_cart")) || [];

/* ==================================================== INITIALIZATION CONTROLLER ==================================================== */
document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter();
    // Roteamento interno simples baseado nos elementos presentes na árvore DOM
    if (document.getElementById("products-grid")) {
        initGalleryPage();
    }
    if (document.getElementById("cart-items-container")) {
        initCartPage();
    }
});

/* ==================================================== STORAGE MANAGERS ==================================================== */
function saveCartToStorage() {
    localStorage.setItem("apex_cart", JSON.stringify(cart));
}

/* ==================================================== GALLERY LOGIC ==================================================== */
async function initGalleryPage() {
    const grid = document.getElementById("products-grid");
    const spinner = document.getElementById("loading-spinner");

    spinner.style.display = "flex";
    grid.style.display = "none";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allProducts = data.products;

        renderCategories(allProducts);
        renderGallery(allProducts);
        setupSearchAndFilters();
    } catch (error) {
        console.error("Erro ao consumir a API DummyJSON:", error);
        grid.innerHTML = `<p class="error-msg">Falha ao carregar catálogo. Tente novamente mais tarde.</p>`;
    } finally {
        spinner.style.display = "none";
        grid.style.display = "grid";
    }
}

function renderGallery(products) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    if (products.length === 0) {
        grid.innerHTML = `<p class="no-results">Nenhum produto correspondente encontrado.</p>`;
        return;
    }

    products.forEach((product) => {
        const cardPerspective = document.createElement("div");
        cardPerspective.classList.add("card-perspective");

        // Construção da estrutura estruturada e semântica com Article
        cardPerspective.innerHTML = `
            <article class="product-card" id="card-${product.id}">
                <div class="card-front">
                    <div class="img-wrapper">
                        <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                    </div>
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <p class="product-desc">${product.description}</p>

<div class="meta-info">
    <p><i class="fa-solid fa-truck"></i> ${product.shippingInformation || "Standard shipping"}</p>
    <p><i class="fa-solid fa-box"></i> Status: ${product.availabilityStatus || "Em estoque"}</p>
</div>
<div class="card-actions">
    <button class="btn btn-add-cart" onclick="addToCart(${product.id})">Adicionar</button>
    <button class="btn-flip" onclick="toggleFlip(${product.id})" aria-label="Ver avaliações">
        <i class="fa-solid fa-rotate"></i>
    </button>
</div>
                </div>
                <div class="card-back">
                    <div class="back-header">
                        <h4>Avaliações do Produto</h4>
                        <button class="btn-flip" onclick="toggleFlip(${product.id})" aria-label="Voltar à frente"><i class="fa-solid fa-rotate"></i></button>
                    </div>
                    <div class="reviews-container">
                        ${renderReviews(product.reviews)}
                    </div>
                </div>
            </article>
        `;
        grid.appendChild(cardPerspective);
    });
}

function renderReviews(reviews) {
    if (!reviews || reviews.length === 0)
        return `<p class="no-reviews">Sem avaliações disponíveis.</p>`;

    return reviews
        .map((rev) => {
            // Gera as estrelas preenchidas e vazias dinamicamente
            const solidStars = `<i class="fa-solid fa-star"></i>`.repeat(
                rev.rating,
            );
            const regularStars = `<i class="fa-regular fa-star"></i>`.repeat(
                5 - rev.rating,
            );

            return `
          <div class="review-subcard">
              <div class="review-meta">
                  <span>${rev.reviewerName}</span>
                  <span class="review-rating">${solidStars}${regularStars}</span>
              </div>
              <p class="review-text">"${rev.comment}"</p>
          </div>
      `;
        })
        .join("");
    if (!reviews || reviews.length === 0)
        return `<p class="no-reviews">Sem avaliações disponíveis.</p>`;
    return reviews
        .map(
            (rev) => `
        <div class="review-subcard">
            <div class="review-meta">
                <span>${rev.reviewerName}</span>
                <span class="review-rating">${"★".repeat(rev.rating)}${"☆".repeat(5 - rev.rating)}</span>
            </div>
            <p class="review-text">"${rev.comment}"</p>
        </div>
    `,
        )
        .join("");
}

function renderCategories(products) {
    const container = document.getElementById("categories-filter");
    // Extrai categorias unicamente mapeadas da lista principal
    const categories = ["Todos", ...new Set(products.map((p) => p.category))];

    container.innerHTML = categories
        .map(
            (cat) => `
        <button class="btn-category ${cat === "Todos" ? "active" : ""}" data-category="${cat}">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
    `,
        )
        .join("");
}

function setupSearchAndFilters() {
    const searchInput = document.getElementById("search-input");
    const categoryContainer = document.getElementById("categories-filter");
    let currentCategory = "Todos";

    const filterAction = () => {
        const query = searchInput.value.toLowerCase().trim();
        const filtered = allProducts.filter((p) => {
            const matchesCategory =
                currentCategory === "Todos" || p.category === currentCategory;
            const matchesSearch =
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query);
            return matchesCategory && matchesSearch;
        });
        renderGallery(filtered);
    };

    searchInput.addEventListener("input", filterAction);

    categoryContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("btn-category")) return;

        document
            .querySelectorAll(".btn-category")
            .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");

        currentCategory = e.target.getAttribute("data-category");
        filterAction();
    });
}

function toggleFlip(id) {
    const card = document.getElementById(`card-${id}`);
    if (card) card.classList.toggle("is-flipped");
}

function addToCart(id) {
    // Busca o produto no array carregado da API
    const product = allProducts.find((p) => p.id === id);
    if (!product) return;

    const existing = cart.find((item) => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail, // Requisito: Exibir thumbnail na pág de carrinho
            quantity: 1,
        });
    }
    saveCartToStorage();
    updateCartCounter();
    alert(`${product.title} foi adicionado ao seu carrinho!`);
}

/* ==================================================== CART LOGIC ==================================================== */
function initCartPage() {
    renderCart();
    setupModal();
}

function renderCart() {
    const container = document.getElementById("cart-items-container");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-cart-msg">Seu carrinho está vazio. Visite a galeria de produtos para iniciar suas adições!</p>`;
        updateCartTotal(0);
        return;
    }

    cart.forEach((item) => {
        const itemCard = document.createElement("article");
        itemCard.classList.add("cart-item-card");
        itemCard.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-thumb" loading="lazy">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.title}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-qty-controls">
                <button class="btn-qty" onclick="changeQuantity(${item.id}, -1)" aria-label="Remover uma unidade">-</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="btn-qty" onclick="changeQuantity(${item.id}, 1)" aria-label="Adicionar uma unidade">+</button>
            </div>
        `;
        container.appendChild(itemCard);
    });

    const calculatedTotal = cart.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0,
    );
    updateCartTotal(calculatedTotal);
}

function changeQuantity(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter((i) => i.id !== id);
    }
    saveCartToStorage();
    updateCartCounter();
    renderCart();
}

function updateCartTotal(total) {
    document.getElementById("cart-total-value").textContent =
        `$${total.toFixed(2)}`;
}

function setupModal() {
    const btnCheckout = document.getElementById("btn-checkout");
    const modal = document.getElementById("checkout-modal");
    const closeModal = document.getElementById("close-modal");
    const modalMsg = document.getElementById("modal-message-text");

    btnCheckout.addEventListener("click", () => {
        if (cart.length === 0) {
            alert(
                "Adicione itens ao carrinho antes de prosseguir com a finalização.",
            );
            return;
        }

        const total = cart.reduce(
            (acc, curr) => acc + curr.price * curr.quantity,
            0,
        );

        // Mensagem Customizada para o Usuário
        modalMsg.innerHTML = `Sua compra no valor total de <strong>$${total.toFixed(2)}</strong> está sendo processada com segurança pelo nosso sistema de pagamentos.`;

        // Ativação do estado do Modal
        modal.classList.add("is-active");
        modal.setAttribute("aria-hidden", "false");

        // Limpa o estado local pós fechamento simulado de compra
        cart = [];
        saveCartToStorage();
        renderCart();
        updateCartCounter();
    });

    const hideModal = () => {
        modal.classList.remove("is-active");
        modal.setAttribute("aria-hidden", "true");
    };

    closeModal.addEventListener("click", hideModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) hideModal();
    });
}

/* ==================================================== CART COUNTER LOGIC ==================================================== */
function updateCartCounter() {
    const counterElement = document.getElementById("cart-counter");
    if (!counterElement) return;

    // Calcula a quantidade total de itens (somando as quantidades individuais)
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    counterElement.textContent = totalItems;

    // Opcional visual: esconde o contador se o carrinho estiver zerado
    counterElement.style.display = totalItems > 0 ? "flex" : "none";
}
