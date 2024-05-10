import { getEachMovieInfo } from "./api.js";


// для рендеринга фильмов, во время поиска
export async function renderMovies(searchResults) {
    if (searchResults) {
        document.querySelector('.popular').classList.add('remove');
        document.querySelector('.recently').classList.add('remove');
        const searchResult = document.querySelector('.search-results');
        searchResult.classList.remove('remove');
        const moviesCard = document.querySelectorAll('.movies__cards');
        moviesCard[2].innerHTML = '';
        searchResults.forEach(async result => {
            let searchRating = await getEachMovieInfo(result.imdbID);
            const el = `
            <div class="movies__card" data-id=${result.imdbID}>
                <img class="poster" src=${result.Poster} alt="Poster">
                <p>${result.Title}</p>
                <div class="rating">
                <img src="./images/common/Star.svg" alt="rating">
                <span>${searchRating.imdbRating}</span>
                </div>
            </div>
   `
            moviesCard[2].insertAdjacentHTML('afterbegin', el);
        })
    }
    
    setTimeout(async () => {
        const movieCard = document.querySelectorAll('.movies__card');
        await renderMovieCardModal(movieCard);
    }, 500)
}


// для рендеринга модалки
export async function renderMovieCardModal(movieCard) {
    movieCard.forEach(async movie => {

        movie.addEventListener('click', async () => {

            const info = await getEachMovieInfo(movie.getAttribute('data-id'))
            const modal = document.querySelector('.modal');
            modal.classList.remove('remove');
            document.body.style.overflow = 'hidden';

            const modalHTML = `
            <button class="modal-close-btn">
            <img src="/images/common/Button.svg" alt="">
            </button>
            <img class='modal-poster' src=${info.Poster} alt="">
            <div class="content">
            <h1>${info.Title}</h1>
            <div class="modal-btns">
        <button>
            <img src="./images/modal/play-ico.svg" alt="">
            <span>Смотреть</span></button>
        <button>
            <img src="./images/modal/Favorite.svg" alt="">
        </button>
        <button>
            <img src="./images/modal/Share.svg" alt="">
        </button>
    </div>
    <div class="rating-and-year">
        <span>
            <img src="./images/modal/Star.svg" alt="">
            <span>${info.imdbRating}</span>
        </span>
        <span>${info.Year}</span>
    </div>
    <div class="age-constraint">16+</div>
    <nav class="modal-nav">
        <ul>
        ${info.Genre.split(', ').map(el =>
                `<li>${el}</li>`
            ).join('')
                }
        </ul>
    </nav>
    <p>${info.Actors}</p>
    <p>${info.Plot}</p>
    </div>
    `
            modal.innerHTML = modalHTML
            const modalCloseBtn = document.querySelector('.modal-close-btn');
            modalCloseBtn.addEventListener('click', () => {
                modal.classList.add('remove')
                document.body.style.overflow = '';
            })
        })
    })
}