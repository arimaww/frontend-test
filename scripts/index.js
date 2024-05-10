import { getMoviesByTitle } from './api.js'
import { renderMovieCardModal, renderMovies } from './render.js';


const searchInput = document.querySelectorAll('.search-event');
const searchBtn = document.querySelector('.search-btn');
const searchMobile = document.querySelector('.search-mobile');
const headerContainer = document.querySelector('.header-container');
const searchMobileInput = document.querySelector('.search-mobile-input');
const removeBtn = document.querySelector('.remove-btn');
const clearInput = document.querySelector('.clear-input');

searchInput.forEach(el => {
    el.addEventListener('input', async (event) => {
        const searchResults = await getMoviesByTitle(event.currentTarget.value);
        await renderMovies(searchResults)
    })
})

clearInput.addEventListener('click', () => {
    searchMobileInput.value = '';
    removeBtn.style.opacity = 0;
})

searchMobileInput.addEventListener('input', (event) => {
    if (event.currentTarget.value !== '')
        removeBtn.style.opacity = 0;
    removeBtn.style.opacity = 1;
})

removeBtn.addEventListener('click', () => {
    searchMobileInput.value = '';
    removeBtn.style.opacity = 0;
})


searchBtn.addEventListener("click", () => {
    headerContainer.classList.add('remove');
    searchMobile.classList.remove('remove');
})

// прячем десктопный header и показываем mobile
window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) {
        searchMobile.classList.add('remove');
        headerContainer.classList.remove('remove');
    }
})

// вешаем, при клике, на каждый movie модалку 
document.addEventListener('DOMContentLoaded', async () => {
    const movieCard = document.querySelectorAll('.movies__card');
    await renderMovieCardModal(movieCard);
})