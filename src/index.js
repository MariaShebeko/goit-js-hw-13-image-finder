import refs from "./js/refs";
import photoCardTemplate from "./templates/photoCard.hbs";
import PhotoAPIService from "./js/apiService";
import LoadMoreBtn from "./js/loadMoreBtn";

const photoesAPIService = new PhotoAPIService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", fetchPhotoes);

function onSearch(e) {
  e.preventDefault();

  clearGalleryContainer();
  photoesAPIService.query = e.currentTarget.elements.query.value;

  if (photoesAPIService.query === "") {
    return alert("Enter smth");
  }
  loadMoreBtn.show();
  photoesAPIService.resetPage();
  fetchPhotoes();
}

function fetchPhotoes() {
  loadMoreBtn.disable();
  photoesAPIService.fetchPhotoes().then(appendFotoesMarkup);
  loadMoreBtn.enable();
}

function appendFotoesMarkup(data) {
  refs.galleryContainer.insertAdjacentHTML(
    "beforeend",
    photoCardTemplate(data)
  );
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = "";
}
