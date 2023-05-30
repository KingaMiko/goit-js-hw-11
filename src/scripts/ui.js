import pingPixabay from './pixabay.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.js';

let lightbox = null;
const loadedPhotos = [];

async function drawPhotos({ photos, page }) {
  const photoContainer = document.querySelector('.gallery');
  if (page === '1') {
    photoContainer.innerHTML = '';
    loadedPhotos.length = 0;
  }

  const newPhotos = photos.filter(photo => !loadedPhotos.includes(photo.id));
  const gallery = newPhotos.map(photo => {
    loadedPhotos.push(photo.id);

    const container = document.createElement('div');
    container.classList.add('photo-card');

    const a = document.createElement('a');
    a.href = photo.largeImageURL;
    a.classList.add('photo-link');
    container.appendChild(a);

    const img = document.createElement('img');
    img.classList.add('photo');
    img.src = photo.webformatURL;
    img.alt = photo.tags;
    img.setAttribute('loading', 'lazy');
    a.appendChild(img);

    const figCaption = document.createElement('div');
    figCaption.classList.add('info');
    container.appendChild(figCaption);

    const likes = document.createElement('p');
    likes.classList.add('info-item');
    likes.innerHTML = `<b>Likes</b><p>${photo.likes}</p>`;
    figCaption.appendChild(likes);

    const views = document.createElement('p');
    views.classList.add('info-item');
    views.innerHTML = `<b>Views</b><p>${photo.views}</p>`;
    figCaption.appendChild(views);

    const comments = document.createElement('p');
    comments.classList.add('info-item');
    comments.innerHTML = `<b>Comments</b><p>${photo.comments}</p>`;
    figCaption.appendChild(comments);

    const downloads = document.createElement('p');
    downloads.classList.add('info-item');
    downloads.innerHTML = `<b>Downloads</b><p>${photo.downloads}</p>`;
    figCaption.appendChild(downloads);

    return container;
  });

  photoContainer.append(...gallery);

  if (page !== '1') {
    const { height: cardHeight } = document
      .querySelector('.gallery .photo-card')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery .photo-link', {
      overlay: 'my-overlay-class',
      scrollZoom: false,
      captionsData: 'alt',
      animationSpeed: 300,
      fadeSpeed: 300,
    });
  } else {
    lightbox.refresh();
  }
}

function destroyLightbox() {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export async function loadPhotos({ q, page }) {
  const photos = await pingPixabay({ q, page });
  if (photos.error) {
    destroyLightbox();
    return;
  }

  drawPhotos({ photos, page });
  return;
}
