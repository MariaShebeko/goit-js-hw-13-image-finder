import refs from "./js/refs";
import photoCardTemplate from "./templates/photoCard.hbs";
import PhotoAPIService from "./js/apiService";
import LoadMoreBtn from "./js/loadMoreBtn";
import { myNotice, myError } from "./js/pnotify";
const basicLightbox = require("basiclightbox");
import "./css/basicLightbox.min.css";
import "./css/styles.css";

const photosAPIService = new PhotoAPIService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", fetchPhotos);
refs.galleryContainer.addEventListener("click", onImageClick);

function onSearch(e) {
  e.preventDefault();

  clearGalleryContainer();
  photosAPIService.query = e.currentTarget.elements.query.value;

  if (photosAPIService.query === "") {
    return myNotice();
  }
  loadMoreBtn.show();
  photosAPIService.resetPage();
  fetchPhotos();
  clearInput(e);
}

function fetchPhotos() {
  loadMoreBtn.disable();
  photosAPIService.fetchPhotos().then(appendPhotosMarkup);
  loadMoreBtn.enable();
  const options = {
    top: null,
    behavior: "smooth",
  };
  options.top = window.pageYOffset + document.documentElement.clientHeight;
  setTimeout(() => {
    window.scrollTo(options);
  }, 1000);
}

function appendPhotosMarkup(data) {
  if (data.length === 0) {
    return myError();
  }

  refs.galleryContainer.insertAdjacentHTML(
    "beforeend",
    photoCardTemplate(data)
  );
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = "";
}

function clearInput(e) {
  e.currentTarget.elements.query.value = "";
}

function onImageClick(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.src}" width="800" height="600">`
  );
  instance.show();
}
