// Fetching the products data from the dummyjson API with a limit of 6 items,
// skipping the first 100, and selecting only title, price, and thumbnail fields.
fetch(
  "https://dummyjson.com/products?limit=6&skip=100&select=title,price,thumbnail"
)
  .then((res) => res.json()) // Parsing the response as JSON
  .then((data) => {
    const products = data.products; // Extracting the products array from the response data
    const container = document.querySelector(".product-container"); // Selecting the container to display products
    const cartItemsContainer = document.querySelector(".cart-items"); // Selecting the container to display cart items

    // Retrieving the cart from localStorage, or initializing as an empty array if not found
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to save the current state of the cart to localStorage
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Looping through each product to create the product card in the UI
    products.forEach((product) => {
      const card = document.createElement("div"); // Creating a div for each product card
      card.classList.add("product-card"); // Adding a class for styling

      const img = document.createElement("img"); // Creating an image element for the product thumbnail
      img.src = product.thumbnail; // Setting the image source to the product thumbnail
      img.alt = product.title; // Setting the alt text for the image to the product title

      const title = document.createElement("h3"); // Creating a heading element for the product title
      title.textContent = product.title; // Setting the text content to the product title

      const price = document.createElement("p"); // Creating a paragraph element for the product price
      price.textContent = `$${product.price.toFixed(2)}`; // Formatting the price with two decimals

      const text = document.createElement("h3"); // Creating a heading element for the "Add to Cart" text
      text.textContent = "Add to cart"; // Setting the text to "Add to cart"

      const AddToCart = document.createElement("div"); // Creating a div for the "Add to Cart" button
      AddToCart.classList.add("button"); // Adding a class for styling the button

      // Appending all elements to the product card
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);
      AddToCart.appendChild(text);
      card.appendChild(AddToCart);

      // Appending the product card to the container in the DOM
      container.appendChild(card);

      // Adding an event listener to handle adding the product to the cart when clicked
      AddToCart.addEventListener("click", () => {
        cart.push(product); // Adding the selected product to the cart array
        saveCart(); // Saving the updated cart to localStorage
        updateCartDisplay(); // Updating the cart display
      });
    });

    // Function to update the cart display in the DOM
    function updateCartDisplay() {
      cartItemsContainer.innerHTML = ""; // Clearing the current cart items display

      // Looping through each item in the cart and creating a cart item display
      cart.forEach((item) => {
        const cartItem = document.createElement("div"); // Creating a div for each cart item
        cartItem.classList.add("cart-item"); // Adding a class for styling

        const img = document.createElement("img"); // Creating an image element for the cart item thumbnail
        img.src = item.thumbnail; // Setting the image source to the item thumbnail
        img.alt = item.title; // Setting the alt text for the image to the item title

        const title = document.createElement("h3"); // Creating a heading element for the cart item title
        title.textContent = item.title; // Setting the text content to the item title

        const price = document.createElement("p"); // Creating a paragraph element for the cart item price
        price.textContent = `$${item.price.toFixed(2)}`; // Formatting the price with two decimals

        const deleteItem = document.createElement("div"); // Creating a div for the "Delete" button
        deleteItem.textContent = "Delete"; // Setting the text to "Delete"
        deleteItem.classList.add("delete-button"); // Adding a class for styling the delete button

        // Appending all elements to the cart item div
        cartItem.appendChild(img);
        cartItem.appendChild(title);
        cartItem.appendChild(price);
        cartItem.appendChild(deleteItem);

        // Appending the cart item to the cart items container in the DOM
        cartItemsContainer.appendChild(cartItem);

        // Adding an event listener to handle item removal from the cart
        deleteItem.addEventListener("click", () => {
          const indexToRemove = cart.findIndex(
            (cartProduct) => cartProduct.id === item.id // Finding the index of the item to remove from the cart
          );

          // If the item is found in the cart, remove it
          if (indexToRemove !== -1) {
            cart.splice(indexToRemove, 1); // Removing the item from the cart array
            saveCart(); // Saving the updated cart to localStorage
            updateCartDisplay(); // Updating the cart display
          }
        });

        // Selecting the "Remove All" button element
        const RemoveAll = document.querySelector(".remove-all");

        // Adding an event listener to handle the removal of all items from the cart
        RemoveAll.addEventListener("click", () => {
          cart.splice(0, cart.length); // Clearing the entire cart array
          saveCart(); // Saving the empty cart to localStorage
          updateCartDisplay(); // Updating the cart display
        });
      });

      // Calculating the total price of all items in the cart
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice += item.price; // Summing the prices of all items
      });

      // Selecting the total price element in the cart and updating its text
      const totalPriceElement = document.querySelector(".cart h2 span");
      totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`; // Displaying the total price with two decimals
    }

    // Calling the updateCartDisplay function to show the current cart state
    updateCartDisplay();
  })
  .catch((err) => console.error("Error fetching products:", err)); // Catching and logging any errors in fetching the products

// Selecting the elements for opening and closing the side menu
let openSide = document.querySelector(".header i ");
let closeSide = document.querySelector(".burger i ");

// Adding an event listener to open the side menu when the open button is clicked
openSide.addEventListener("click", () => {
  document.body.classList.toggle("open"); // Toggling the "open" class on the body to show/hide the side menu
});

// Adding an event listener to close the side menu when the close button is clicked
closeSide.addEventListener("click", () => {
  document.body.classList.remove("open"); // Removing the "open" class from the body to hide the side menu
});
