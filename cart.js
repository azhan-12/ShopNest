    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const cartClose = document.querySelector("#cart-close");

    cartIcon.addEventListener("click", () => cart.classList.add("active"));
    cartClose.addEventListener("click", () => cart.classList.remove("active"));

    const cartContent = document.querySelector(".cart-content");
    const cartItemCountBadge = document.querySelector(".cart-item-count");

    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";

    const updateCartCount = () => {
      const cartBoxes = cartContent.querySelectorAll(".cart-box");
      let totalItems = 0;
      cartBoxes.forEach(cartBox => {
        const quantity = parseInt(cartBox.querySelector(".number").textContent);
        totalItems += quantity;
      });
      if (totalItems > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = totalItems;
      } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
      }
    };

    const updateTotalPrice = () => {
      const totalPriceElement = document.querySelector(".total-price");
      const cartBoxes = cartContent.querySelectorAll(".cart-box");
      let total = 0;
      cartBoxes.forEach(cartBox => {
        const price = parseFloat(cartBox.querySelector(".cart-price").textContent.replace("$", ""));
        const quantity = parseInt(cartBox.querySelector(".number").textContent);
        total += price * quantity;
      });
      totalPriceElement.textContent = `$${total.toFixed(2)}`;
    };

    const addToCart = productBox => {
      const productImgSrc = productBox.querySelector("img").src;
      const productTitle = productBox.querySelector(".product-title").textContent;
      const productPrice = productBox.querySelector(".price").textContent;

      const cartItems = cartContent.querySelectorAll(".cart-product-title");
      for (let item of cartItems) {
        if (item.textContent === productTitle) {
          alert("This item is already in the cart.");
          return;
        }
      }

      const cartBox = document.createElement("div");
      cartBox.classList.add("cart-box");
      cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
          <h2 class="cart-product-title">${productTitle}</h2>
          <span class="cart-price">${productPrice}</span>
          <div class="cart-quantity">
            <button id="decrement">-</button>
            <span class="number">1</span>
            <button id="increment">+</button>
          </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
      `;
      cartContent.appendChild(cartBox);

      cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateTotalPrice();
        updateCartCount();
      });

      cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = parseInt(numberElement.textContent);
        if (event.target.id === "decrement" && quantity > 1) {
          quantity--;
          if (quantity === 1) {
            decrementButton.style.color = "#999";
          }
        } else if (event.target.id === "increment") {
          quantity++;
          decrementButton.style.color = "#333";
        }
        numberElement.textContent = quantity;
        updateTotalPrice();
        updateCartCount();
      });

      updateTotalPrice();
      updateCartCount();
    };

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", e => {
        const productBox = e.target.closest(".product-box");
        addToCart(productBox);
      });
    });

    const buyNowButton = document.querySelector(".btn-buy");
    buyNowButton.addEventListener("click", () => {
      const cartBoxes = cartContent.querySelectorAll(".cart-box");
      if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
      }
      cartBoxes.forEach(cartBox => cartBox.remove());
      updateTotalPrice();
      updateCartCount();
      alert("Thank you for your purchase!");
    });


// const cartIcon = document.querySelector("#cart-icon");
// const cart = document.querySelector(".cart");
// const cartClose = document.querySelector("#cart-close");

// cartIcon.addEventListener("click", () => cart.classList.add("active"));
// cartClose.addEventListener("click", () => cart.classList.remove("active"));

// const cartContent = document.querySelector(".cart-content");
// const cartItemCountBadge = document.querySelector(".cart-item-count");

// cartItemCountBadge.style.visibility = "hidden";
// cartItemCountBadge.textContent = "";

// const updateCartCount = () => {
//   const cartBoxes = cartContent.querySelectorAll(".cart-box");
//   let totalItems = 0;

//   cartBoxes.forEach(cartBox => {
//     const quantity = parseInt(cartBox.querySelector(".number").textContent);
//     totalItems += quantity;
//   });

//   if (totalItems > 0) {
//     cartItemCountBadge.style.visibility = "visible";
//     cartItemCountBadge.textContent = totalItems;
//   } else {
//     cartItemCountBadge.style.visibility = "hidden";
//     cartItemCountBadge.textContent = "";
//   }
// };

// const updateTotalPrice = () => {
//   const totalPriceElement = document.querySelector(".total-price");
//   const cartBoxes = cartContent.querySelectorAll(".cart-box");
//   let total = 0;

//   cartBoxes.forEach(cartBox => {
//     const price = parseFloat(cartBox.querySelector(".cart-price").textContent.replace("$", ""));
//     const quantity = parseInt(cartBox.querySelector(".number").textContent);
//     total += price * quantity;
//   });

//   totalPriceElement.textContent = `$${total.toFixed(2)}`;
// };

// const addToCart = productBox => {
//   const productImgSrc = productBox.querySelector("img").src;
//   const productTitle = productBox.querySelector(".product-title").textContent;
//   const productPrice = productBox.querySelector(".price").textContent;

//   const cartItems = cartContent.querySelectorAll(".cart-product-title");
//   for (let item of cartItems) {
//     if (item.textContent === productTitle) {
//       alert("This item is already in the cart.");
//       return;
//     }
//   }

//   const cartBox = document.createElement("div");
//   cartBox.classList.add("cart-box");
//   cartBox.innerHTML = `
//     <img src="${productImgSrc}" class="cart-img">
//     <div class="cart-detail">
//       <h2 class="cart-product-title">${productTitle}</h2>
//       <span class="cart-price">${productPrice}</span>
//       <div class="cart-quantity">
//         <button id="decrement">-</button>
//         <span class="number">1</span>
//         <button id="increment">+</button>
//       </div>
//     </div>
//     <i class="ri-delete-bin-line cart-remove"></i>
//   `;
//   cartContent.appendChild(cartBox);

//   cartBox.querySelector(".cart-remove").addEventListener("click", () => {
//     cartBox.remove();
//     updateTotalPrice();
//     updateCartCount();
//   });

//   cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
//     const numberElement = cartBox.querySelector(".number");
//     const decrementButton = cartBox.querySelector("#decrement");
//     let quantity = parseInt(numberElement.textContent);

//     if (event.target.id === "decrement" && quantity > 1) {
//       quantity--;
//       if (quantity === 1) {
//         decrementButton.style.color = "#999";
//       }
//     } else if (event.target.id === "increment") {
//       quantity++;
//       decrementButton.style.color = "#333";
//     }

//     numberElement.textContent = quantity;
//     updateTotalPrice();
//     updateCartCount();
//   });

//   updateTotalPrice();
//   updateCartCount();
// };

// // Buy Now
// const buyNowButton = document.querySelector(".btn-buy");
// buyNowButton.addEventListener("click", () => {
//   const cartBoxes = cartContent.querySelectorAll(".cart-box");

//   if (cartBoxes.length === 0) {
//     alert("Your cart is empty. Please add items to your cart before buying.");
//     return;
//   }

//   cartBoxes.forEach(cartBox => cartBox.remove());
//   updateTotalPrice();
//   updateCartCount();

//   alert("Thank you for your purchase!");
// });



// Fetch products and display
const productList = document.getElementById("product-list");

fetch('products.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h2 class="product-title">${product.title}</h2>
        <div class="rating-stars">${renderStars(product.rating)}</div>
        <div class="price-and-cart">
          <span class="price">$${product.price}</span>
          <i class="ri-shopping-bag-line add-cart"></i>
        </div>
      `;

      productList.appendChild(productBox);
    });

    // Add event listeners after rendering
    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));

  function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let starsHTML = "";
  for (let i = 0; i < fullStars; i++) starsHTML += '<i class="fa-solid fa-star"></i>';
  if (halfStar) starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = 0; i < emptyStars; i++) starsHTML += '<i class="fa-regular fa-star"></i>';

  return starsHTML;
}

         //   tshirt json

  const tProductList = document.getElementById("tproduct-list");

fetch('tshirts.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

     productBox.innerHTML = `
  <div class="img-box">
    <img src="${product.image}" alt="${product.title}">
  </div>
  <h2 class="product-title">${product.title}</h2>
  <div class="rating-stars">${renderStars(product.rating)}</div>
  <div class="price-and-cart">
    <span class="price">$${product.price}</span>
    <i class="ri-shopping-bag-line add-cart"></i>
  </div>
`;


      tProductList.appendChild(productBox);
    });

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));



         //   Jeans json

  const jProductList = document.getElementById("jproduct-list");

fetch('jeans.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h2 class="product-title">${product.title}</h2>
        <div class="rating-stars">${renderStars(product.rating)}</div>
        <div class="price-and-cart">
          <span class="price">$${product.price}</span>
          <i class="ri-shopping-bag-line add-cart"></i>
        </div>
      `;

      jProductList.appendChild(productBox);
    });

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));



           //   shoe json

  const sProductList = document.getElementById("sproduct-list");

fetch('shoes.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h2 class="product-title">${product.title}</h2>
        <div class="rating-stars">${renderStars(product.rating)}</div>
        <div class="price-and-cart">
          <span class="price">$${product.price}</span>
          <i class="ri-shopping-bag-line add-cart"></i>
        </div>
      `;

      sProductList.appendChild(productBox);
    });

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));



           //   Watches json

  const wProductList = document.getElementById("wproduct-list");

fetch('watches.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h2 class="product-title">${product.title}</h2>
        <div class="rating-stars">${renderStars(product.rating)}</div>
        <div class="price-and-cart">
          <span class="price">$${product.price}</span>
          <i class="ri-shopping-bag-line add-cart"></i>
        </div>
      `;

      wProductList.appendChild(productBox);
    });

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));


           //   kurta json

  const kProductList = document.getElementById("kproduct-list");

fetch('kurti.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h2 class="product-title">${product.title}</h2>
        <div class="rating-stars">${renderStars(product.rating)}</div>
        <div class="price-and-cart">
          <span class="price">$${product.price}</span>
          <i class="ri-shopping-bag-line add-cart"></i>
        </div>
      `;

      kProductList.appendChild(productBox);
    });

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));


            //   frock json

  const fProductList = document.getElementById("fproduct-list");

fetch('frock.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h2 class="product-title">${product.title}</h2>
        <div class="rating-stars">${renderStars(product.rating)}</div>
        <div class="price-and-cart">
          <span class="price">$${product.price}</span>
          <i class="ri-shopping-bag-line add-cart"></i>
        </div>
      `;

      fProductList.appendChild(productBox);
    });

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));


            //   perfume json

  const pProductList = document.getElementById("pproduct-list");

fetch('perfume.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h2 class="product-title">${product.title}</h2>
        <div class="rating-stars">${renderStars(product.rating)}</div>
        <div class="price-and-cart">
          <span class="price">$${product.price}</span>
          <i class="ri-shopping-bag-line add-cart"></i>
        </div>
      `;

      pProductList.appendChild(productBox);
    });

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));


  
            //   women shoe json

  const wsProductList = document.getElementById("wsproduct-list");

fetch('wshoe.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h2 class="product-title">${product.title}</h2>
        <div class="rating-stars">${renderStars(product.rating)}</div>
        <div class="price-and-cart">
          <span class="price">$${product.price}</span>
          <i class="ri-shopping-bag-line add-cart"></i>
        </div>
      `;

      wsProductList.appendChild(productBox);
    });

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));



            //   women watch json

  const wwProductList = document.getElementById("wwproduct-list");

fetch('wwatch.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
        <div class="img-box">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h2 class="product-title">${product.title}</h2>
        <div class="rating-stars">${renderStars(product.rating)}</div>
        <div class="price-and-cart">
          <span class="price">$${product.price}</span>
          <i class="ri-shopping-bag-line add-cart"></i>
        </div>
      `;

      wwProductList.appendChild(productBox);
    });

    document.querySelectorAll(".add-cart").forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  })
  .catch(error => console.error("Error loading products:", error));
