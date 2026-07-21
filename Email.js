const form = document.getElementById("booking-form");
const message = document.getElementById("form_validation");
const nameInput = document.getElementById("fullname");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Check if all required fields are filled
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const userName = nameInput.value;

    // Show success message
    message.innerHTML = `
        <p style="color: green; font-weight: bold;">
            ${userName}, your order is submitted successfully!
        </p>
    `;

    // Clear all input fields
    form.reset();
});