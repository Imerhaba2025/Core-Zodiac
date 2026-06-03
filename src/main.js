const businessPhoneNumber = "15551234567";
const chatCard = document.querySelector("#chat-card");
const openButton = document.querySelector("#open-chat");
const closeButton = document.querySelector("#close-chat");
const messageInput = document.querySelector("#custom-message");
const whatsappLink = document.querySelector("#whatsapp-link");
const quickReplies = document.querySelectorAll("[data-message]");

function buildWhatsAppUrl(message) {
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${businessPhoneNumber}?text=${encodedMessage}`;
}

function syncWhatsAppLink() {
  whatsappLink.href = buildWhatsAppUrl(messageInput.value);
}

function setWidgetOpen(isOpen) {
  chatCard.classList.toggle("is-hidden", !isOpen);
  openButton.setAttribute("aria-expanded", String(isOpen));
}

quickReplies.forEach((reply) => {
  reply.addEventListener("click", () => {
    messageInput.value = reply.dataset.message;
    syncWhatsAppLink();
    messageInput.focus();
  });
});

messageInput.addEventListener("input", syncWhatsAppLink);
openButton.addEventListener("click", () => setWidgetOpen(true));
closeButton.addEventListener("click", () => setWidgetOpen(false));

syncWhatsAppLink();
