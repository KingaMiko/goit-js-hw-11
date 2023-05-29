import { API_PATH, DEFAULT_PIXABAY_PARAMS } from './config.js';
import Notiflix from 'notiflix';

export default async function pingPixabay({ q = '', page = '1' }) {
  try {
    const querystring = new URLSearchParams({
      ...DEFAULT_PIXABAY_PARAMS,
      page,
      q,
    });

    const response = await fetch(`${API_PATH}?${querystring}`);
    if (!response.ok) {
      if (response.status === 400) {
        return [];
      }
      return { error: response.status };
    }

    const { hits: photos, totalHits } = await response.json();

    if (page !== '1' && photos.length === 0) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }

    if (photos.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if ((page === '1') & (q !== '')) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    return photos;
  } catch (e) {
    return { error: e.toString() };
  }
}
