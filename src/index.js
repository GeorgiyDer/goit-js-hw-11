import './сss/styles.css';
import ApiService from './js/fetch';
import Notiflix from 'notiflix';

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    searchBtn: document.querySelector('#searchBtn'),
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryDiv: document.querySelector('.gallery'),
}

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearchForm)
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn)


refs.loadMoreBtn.style.visibility = "hidden"
let total = 0;

function onSearchForm(e) {
    e.preventDefault();
    
    apiService.value = e.currentTarget.elements.searchQuery.value;
    
    apiService.resetPage()

    apiService.fetchImg().then(response => {
        // console.log(response.data)
        if (response.data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            return
        } 
        
        const markupTorender = makeImgCard(response.data.hits);
        clearDivGallery()
        makeRender(markupTorender);
        refs.loadMoreBtn.style.visibility = "visible"
        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        
    })
    
    
}


function onLoadMoreBtn(e) { 
    
    apiService.fetchImg().then(response => {
        
        const markupTorender = makeImgCard(response.data.hits);
        makeRender(markupTorender);
        
        total += response.data.hits.length
        
        if (total >= (response.data.totalHits - response.data.hits.length)) { 
            refs.loadMoreBtn.style.visibility = "hidden";
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
        console.log(total);
    })
    
}


function makeImgCard(hits) { 
    const markupCard = []
    for (let i = 0; i < hits.length; i++) {
        const markup = `
        <div class="photo-card">
            <a class="gallery__item" href="${hits[i].largeImageURL}">
                <img class="gallery__image" src="${hits[i].webformatURL}" alt="${hits[i].tags}" title="${hits[i].tags}" loading="lazy" />
            </a>
            
            <div class="info">
                <p class="info-item"><b>Likes:</b>${hits[i].likes}</p>
                <p class="info-item"><b>Views:</b>${hits[i].views}</p>
                <p class="info-item"><b>Comments:</b>${hits[i].comments}</p>
                <p class="info-item"><b>Downloads:</b>${hits[i].downloads}</p>       
            </div>
        </div>`
        markupCard.push(markup)
    }
    return markupCard.join('')
}
function makeRender(markupTorender) {
    refs.galleryDiv.insertAdjacentHTML("beforeend", markupTorender);
    
}

function clearDivGallery() { 
    refs.galleryDiv.innerHTML = "";
}




// new SimpleLightbox('.gallery a');
// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });