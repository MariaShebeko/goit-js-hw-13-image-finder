const API_KEY = "23951703-436932e17dab2edd529d032c5";
const BASE_URL = "https://pixabay.com/api";

export default class PhotoAPIService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  fetchPhotos() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.incrementPage();
        return data.hits;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
