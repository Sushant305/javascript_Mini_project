const services = [
  {
    icon: "fa-solid fa-shirt",
    name: "Dry Cleaning",
    price: 200,
  },
  {
    icon: "fa-solid fa-basket-shopping",
    name: "Wash & Fold",
    price: 100,
  },
  {
    icon: "fa-solid fa-fire",
    name: "Ironing",
    price: 30,
  },
  {
    icon: "fa-solid fa-spray-can-sparkles",
    name: "Stain Removal",
    price: 500,
  },
  {
    icon: "fa-solid fa-couch",
    name: "Leather & Suede Cleaning",
    price: 650,
  },
  {
    icon: "fa-solid fa-person-dress",
    name: "Wedding Dress Cleaning",
    price: 2800,
  },
];

const serviceList = document.querySelector(".service-list");
services.forEach((service) => {
  serviceList.innerHTML += `
     <div class="service">

            <div class="service-info">

                <i class="${service.icon}"></i>

                <h3>${service.name}</h3>

                <span>₹${service.price}</span>

            </div>

            <button class="add-btn">
                Add Item
                <i class="fa-solid fa-cart-shopping"></i>
            </button>

        </div>
    `;
});

const addbtn = document.querySelectorAll(".add-btn");
const cartitems = document.querySelector(".cart-items");
const emptyCart = document.querySelector(".empty-cart");
const totalAmoount = document.getElementById("total-amount");

const cart = [];

addbtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    emptyCart.style.display = "none";

    const service = services[index];

    cart.push(service);

    cartitems.innerHTML += `
              <div class="cart-items-list">
                  <h4>${service.name}</h4>
                  <span>₹${service.price}</span>
              </div>
          `;

    const total = cart.reduce((sum, items) => {
      return sum + items.price;
    }, 0);

    totalAmoount.innerText = `₹${total}`;
  });
});

const form = document.querySelector("#booking-form");
const message = document.getElementById("form_validation");
const inputname = document.getElementById("fullname");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  cartitems.innerHTML = "";
  cart.length = 0;
  totalAmoount.innerText = "₹0";
  emptyCart.style.display = "block";

  const userName = inputname.value;

  message.innerHTML = `
  <p style="color:green;font-weight:bold;">
            ${userName}, your order is submitted successfully!
        </p>
  `;

  form.reset();
});
