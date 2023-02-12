import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

const items = [];

galleryItems.forEach((element) => {
  const galleryItem = document.createElement("div");
  galleryItem.classList.add("gallery__item");

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link");
  galleryLink.href = element.original;
  const galleryImg = document.createElement("img");

  galleryImg.classList.add("gallery__image");
  galleryImg.src = element.preview; //
  galleryImg.setAttribute("data-source", element.original);
  galleryImg.alt = element.description;

  galleryItem.append(galleryLink);
  galleryLink.append(galleryImg);
  items.push(galleryItem);
});

gallery.append(...items);
gallery.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }

  const imgSelected = e.target.getAttribute("data-source");

  const instance = basicLightbox.create(
    `
    <img src="${imgSelected}" width="800" height="600">
    `,

    {
      onShow: () => {
        document.addEventListener("keydown", closeModal);
      },

      onClose: () => {
        document.removeEventListener("keydown", closeModal);
      },
    }
  );

  instance.show();

  function closeModal(e) {
    if (e.key === "Escape") {
      instance.close();
    }
  }
});
