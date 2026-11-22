(function () {
  "use strict";

  const form = document.querySelector("#contact-form");
  if (!form) return;

  const loading = form.querySelector(".loading");
  const errorMessage = form.querySelector(".error-message");
  const sentMessage = form.querySelector(".sent-message");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    loading.classList.add("d-block");
    errorMessage.classList.remove("d-block");
    sentMessage.classList.remove("d-block");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Your message could not be sent. Please try again.");
      }

      sentMessage.classList.add("d-block");
      form.reset();
    } catch (error) {
      errorMessage.textContent = error.message || "Your message could not be sent. Please try again.";
      errorMessage.classList.add("d-block");
    } finally {
      loading.classList.remove("d-block");
    }
  });
})();
