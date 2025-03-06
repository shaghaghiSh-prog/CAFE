let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let searchBtn = document.querySelector('#search-btn');
let cartBtn = document.querySelector('#cart-btn');
let cartItemsContainer = document.querySelector('.cart-items-container');

// Toggle menu and navbar
menu.onclick = () => {
    menu.classList.toggle('fa-trash');
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItemsContainer.classList.remove('active');
}

searchBtn.onclick = () => {
    searchForm.classList.toggle('active');
    cartItemsContainer.classList.remove('active');
    navbar.classList.remove('active');
    menu.classList.remove('fa-trash');
}

cartBtn.onclick = () => {
    cartItemsContainer.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
    menu.classList.remove('fa-trash');
}

window.onscroll = () => {
    menu.classList.remove('fa-trash');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItemsContainer.classList.remove('active');
}

// Products data
const products = [
    {
        id: 1,
        name: "Espresso",
        price: 2.99,
        category: "espresso",
        image: "image/menu-1.png",
        description: "Rich and bold single shot of pure coffee essence.",
        rating: 4.5,
    },
    {
        id: 2,
        name: "Latte",
        price: 3.99,
        category: "latte",
        image: "image/menu-2.png",
        description: "Smooth espresso with steamed milk and a light layer of foam.",
        rating: 4.2,
    },
    {
        id: 3,
        name: "Cappuccino",
        price: 3.49,
        category: "cappuccino",
        image: "image/menu-3.png",
        description: "Perfect balance of espresso, steamed milk, and foamed milk.",
        rating: 4.7,
    },
    {
        id: 4,
        name: "Mocha",
        price: 4.49,
        category: "mocha",
        image: "image/menu-4.png",
        description: "Espresso with rich chocolate and steamed milk.",
        rating: 4.6,
    },
    {
        id: 5,
        name: "Americano",
        price: 2.99,
        category: "espresso",
        image: "image/menu-5.png",
        description: "Espresso diluted with hot water for a milder flavor.",
        rating: 4.3,
    },
    {
        id: 6,
        name: "Macchiato",
        price: 3.29,
        category: "espresso",
        image: "image/menu-6.png",
        description: "Espresso with a small amount of foamed milk on top.",
        rating: 4.4,
    },
    {
        id: 7,
        name: "Flat White",
        price: 3.79,
        category: "latte",
        image: "image/menu-1.png",
        description: "Rich espresso with velvety microfoam.",
        rating: 4.5,
    },
    {
        id: 8,
        name: "Caramel Latte",
        price: 4.29,
        category: "latte",
        image: "image/menu-2.png",
        description: "Sweet caramel syrup mixed with espresso and milk.",
        rating: 4.3,
    },
    {
        id: 9,
        name: "Vanilla Cappuccino",
        price: 3.99,
        category: "cappuccino",
        image: "image/menu-3.png",
        description: "Cappuccino with a hint of vanilla flavor.",
        rating: 4.6,
    },
    {
        id: 10,
        name: "White Chocolate Mocha",
        price: 4.79,
        category: "mocha",
        image: "image/menu-4.png",
        description: "Delicious blend of white chocolate and espresso.",
        rating: 4.7,
    },
    {
        id: 11,
        name: "Ristretto",
        price: 2.79,
        category: "espresso",
        image: "image/menu-5.png",
        description: "Short shot of espresso with a rich flavor.",
        rating: 4.4,
    },
    {
        id: 12,
        name: "Hazelnut Latte",
        price: 4.49,
        category: "latte",
        image: "image/menu-6.png",
        description: "Latte with a nutty hazelnut flavor.",
        rating: 4.5,
    },
];


// function search() {
//     console.log("hi")
//     let input = document.querySelector("#search-box").value.toUpperCase();

//     let filter = products.filter(products => products.name.includes(input));

//     console.log(filter);
    
//     displayProducts(filter);
// }




document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('search-box');
    const searchBtn = document.getElementById('search-btn');

    function search() {
        const input = searchBox.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(input) || 
            product.category.toLowerCase().includes(input)
        );
        displayProducts(filteredProducts);
    }

    searchBox.addEventListener('input', search);
    searchBtn.addEventListener('click', search);

    // Modify the displayProducts function to accept an array of products
    function displayProducts(productsToDisplay = products) {
        const productContainer = document.querySelector(".box-container");
        productContainer.innerHTML = "";

        productsToDisplay.forEach((product) => {
            const productElement = document.createElement("div");
            productElement.classList.add("box");
            productElement.innerHTML = `
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="category-tag">${product.category}</span>
                </div>
                <div class="content">
                    <h3>${product.name}</h3>
                    <p class="description">${product.description}</p>
                    <div class="price-rating">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <div class="rating">
                            ${generateStarRating(product.rating)}
                        </div>
                    </div>
                    <button class="category-btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productContainer.appendChild(productElement);
        });

        attachAddToCartListeners();
    }

    // Initial display of all products
    displayProducts();
});








let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display products based on category
function displayProducts(category = "all") {
    const productContainer = document.querySelector(".box-container");
    productContainer.innerHTML = "";

    products.forEach((product) => {
        if (category === "all" || product.category === category) {
            const productElement = document.createElement("div");
            productElement.classList.add("box");
            productElement.innerHTML = `
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="category-tag">${product.category}</span>
                </div>
                <div class="content">
                    <h3>${product.name}</h3>
                    <p class="description">${product.description}</p>
                    <div class="price-rating">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <div class="rating">
                            ${generateStarRating(product.rating)}
                        </div>
                    </div>
                    <button class=" category-btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productContainer.appendChild(productElement);
        }
    });

    attachAddToCartListeners();
}

// Generate star rating
function generateStarRating(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= rating ? "filled" : ""}">★</span>`;
    }
    return stars;
}

// Attach event listeners to add to cart buttons
function attachAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // If the product is already in the cart, show a different alert
        showAlert("You have already added this product before. If you want to increase the count, please go to the shopping cart.");
        
    } else {
        // If the product isn't in the cart, add it
        cart.push({ ...product, quantity: 1 });
       
        showAlert("Product added to cart!");
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to show the alert with a custom message
function showAlert(message) {
    const alert = document.getElementById('alert');
    alert.textContent = message; // Set the alert message
    alert.style.display = 'block';
    alert.style.opacity = '1';
    alert.style.transform = 'translateY(0)'; // Move into place

    // Hide the alert after 4 seconds
    setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-20px)'; // Move up slightly during fade-out
        setTimeout(() => {
            alert.style.display = 'none';
        }, 1000); // Wait for fade-out transition (1 second)
    }, 4000); // Show for 4 seconds
}



// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('#cart-count');
    const cartTotalPrice = document.querySelector('#cart-total-price');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">$${item.price.toFixed(2)}</div>
                <div class="quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <span class="fas fa-trash remove-item" data-id="${item.id}"></span>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price * item.quantity;
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotalPrice.textContent = total.toFixed(2);

    attachRemoveFromCartListeners();
    attachIncreaseDecreaseListeners();
}

// Attach event listeners for removing items from cart
function attachRemoveFromCartListeners() {
    const removeButtons = document.querySelectorAll('.cart-item .fa-trash');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove item from cart
function removeFromCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Attach event listeners for increase and decrease buttons
function attachIncreaseDecreaseListeners() {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');

    increaseButtons.forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
}

// Increase product quantity
function increaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Decrease product quantity
function decreaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            removeFromCart(event);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Attach category filter listeners
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        const category = event.target.getAttribute('data-category');
        displayProducts(category);
    });
});



// Initial display of products and cart
displayProducts();
updateCartDisplay();

// Swiper initialization for reviews (if you want to keep it)
var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
    },
});
