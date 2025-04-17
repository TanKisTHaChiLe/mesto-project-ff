export function openModal(popap) {
  popap.classList.add("popup_is-opened");
  const editForm = document.forms["edit-profile"];
  if (editForm) {
    editForm.elements.name.value =
      document.querySelector(".profile__title").textContent;
      editForm.elements.description.value = document.querySelector(
      ".profile__description"
    ).textContent;
  }
}

export function closeModal(popap) {
  popap.classList.remove("popup_is-opened");
  const form = popap.querySelector("form");
  if (form) {
    form.reset();
  }
}
