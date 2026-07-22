emailjs.init("lyHZ4lwOClK9GRm__");
const services = [
  {
    icon: "fa-solid fa-shirt",
    name: "Dry Cleaning",
    price: 200,
    isAdded: false,
  },
  {
    icon: "fa-solid fa-basket-shopping",
    name: "Wash & Fold",
    price: 100,
    isAdded: false,
  },
  {
    icon: "fa-solid fa-fire",
    name: "Ironing",
    price: 30,
    isAdded: false,
  },
  {
    icon: "fa-solid fa-spray-can-sparkles",
    name: "Stain Removal",
    price: 500,
    isAdded: false,
  },
  {
    icon: "fa-solid fa-couch",
    name: "Leather & Suede Cleaning",
    price: 650,
    isAdded: false,
  },
  {
    icon: "fa-solid fa-person-dress",
    name: "Wedding Dress Cleaning",
    price: 2800,
    isAdded: false,
  },
];

const serviceList = document.querySelector(".service-list");
const cartItems = document.querySelector(".cart-items");
const emptycartItems = document.querySelector(".empty-cart");
const totalAmount = document.getElementById("total-amount");

function renderServices() {
  serviceList.innerHTML = "";

  services.forEach((service, index) => {
    let button;

    if (service.isAdded === true) {
      button = `
    <button class="add-btn" onClick="toggleCart(${index})">
       Remove Item <i class="fa-solid fa-trash"></i>
    </button>
    `;
    } else {
      button = `
      <button class="add-btn" onClick="toggleCart(${index})">
        Add Item <i class="fa-solid fa-cart-shopping"></i>
      </button>
      `;
    }

    serviceList.innerHTML += `
    <div class="service">
      <div class="service-info">
          <i class="${service.icon}"></i>
          <h3>${service.name}</h3>
          <span>₹${service.price}</span>
      </div>
     
        ${button}
      
    </div>  
  `;
  });
}

function toggleCart(index) {
  services[index].isAdded = !services[index].isAdded;
  renderServices();
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;

  const addItems = services.filter((service) => {
    return service.isAdded === true;
  });

  if (addItems.length === 0) {
   emptycartItems.style.display = "block";
  } else {
    emptycartItems.style.display = "none";
  }

  addItems.forEach((service) => {
    cartItems.innerHTML += `
      <div class="cart-items-list">
        <h4>${service.name}</h4>
        <span>₹${service.price}</span>
      </div>
    `;
    total = total + service.price;
  });

  totalAmount.innerText = ` ₹${total}`;
}
 renderServices();
  renderCart();

const form = document.getElementById("booking-form")
const message = document.getElementById("form_validation")
const inputName = document.getElementById("fullname")
const email = document.getElementById("email");
const phone = document.getElementById("phone");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Check HTML validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Get selected services
  const addedItems = services.filter(service => service.isAdded);

  // Don't allow empty bookings
  if (addedItems.length === 0) {
    alert("Please add at least one service.");
    return;
  }

  // Create service list
  const serviceNames = addedItems
    .map(service => service.name)
    .join(", ");

  // Calculate total
  const total = addedItems.reduce((sum, service) => {
    return sum + service.price;
  }, 0);

  // Data to send
  const templateParams = {
    user_name: inputName.value,
    user_email: email.value,
    phone: phone.value,
    services: serviceNames,
    total: total,
  };

  emailjs
    .send(
      "service_4td8he8",
      "template_tikhqsk",
      templateParams
    )
    .then(() => {

      message.innerHTML = `
        <p style="color:green;font-weight:bold;">
          ${inputName.value}, your order has been submitted successfully.
          A confirmation email has been sent.
        </p>
      `;

      services.forEach((service) => {
        service.isAdded = false;
      });

      renderServices();
      renderCart();
      form.reset();

    })
    .catch((error) => {
    console.log("EmailJS Error:", error);

    if (error.text) {
        console.log("Error Text:", error.text);
    }

    if (error.status) {
        console.log("Status:", error.status);
    }

    alert("Failed to send email.");
});
});