export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscPopup);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscPopup);
}

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

export function setupPopupCloseHandlers(popup) {
  const popupContent = popup.querySelector(".popup__content");
  const buttonClose = popup.querySelector(".popup__close");
  buttonClose.addEventListener("click", () => {
    closeModal(popup);
  });
  popup.addEventListener("click", (evt) => {
    if (!popupContent.contains(evt.target)) {
      closeModal(popup);
    }
  });
}
