import {fetchMovie, fetchSearch, fetchTrending, fetchTV} from "./fetch.js";

const trendingByDay = document.querySelector("#day");
const trendingByWeek = document.querySelector("#week");
const tvTopRated = document.querySelector("#top_rated");
const tvPopular = document.querySelector("#popular");
const movieTopRated = document.querySelector("#movie_top_rated");
const moviePopular = document.querySelector("#movie_popular");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

trendingByDay.addEventListener("click", () => {
    trendingByWeek.classList.remove("active");
    fetchTrending("day");
    trendingByDay.classList.add("active");
});

trendingByWeek.addEventListener("click", () => {
    trendingByDay.classList.remove("active");
    fetchTrending("week");
    trendingByWeek.classList.add("active");
});

tvTopRated.addEventListener("click", () => {
    tvTopRated.classList.add("active");
    fetchTV("top_rated");
    tvPopular.classList.remove("active");
});

tvPopular.addEventListener("click", () => {
    tvTopRated.classList.remove("active");
    fetchTV("popular");
    tvPopular.classList.add("active");
});

movieTopRated.addEventListener("click", () => {
    movieTopRated.classList.add("active");
    fetchMovie("top_rated");
    moviePopular.classList.remove("active");
});

moviePopular.addEventListener("click", () => {
    movieTopRated.classList.remove("active");
    fetchMovie("popular");
    moviePopular.classList.add("active");
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchSearch(searchInput.value);
        addSearchResultsSection();
    }
});

searchButton.addEventListener("click", () => {
    fetchSearch(searchInput.value);
    addSearchResultsSection();
});

function addSearchResultsSection() {
    if (!document.querySelector("#search-results")) {
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper-pop";
        wrapper.id = "search-results";

        const movieTemplate = `
            <div class="movie">
                <img src="img/filmatic.svg" alt="" />
                <div class="score"><p></p></div>
                <h5></h5>
                <p></p>
            </div>
        `;

        const movieItems = Array(12).fill(movieTemplate).join('');

        wrapper.innerHTML = `
            <div class="tendances-container container">
                <div class="title-filter" id="title-search-results">
                    <h2>Résultats de la recherche</h2>
                    <button id="close-search-results" class="close-btn">&#10005;</button>
                </div>
                <div class="grid-tendances" id="search-results-container">
                    ${movieItems}
                </div>
            </div>
        `;

        const tendancesContainer = document.querySelector(".wrapper");
        tendancesContainer.parentNode.insertBefore(wrapper, tendancesContainer);

        toggleSections('search-results');

        document.querySelector("#close-search-results").addEventListener("click", () => {
            document.querySelector("#search-results").remove();
            toggleSections('populaires');
        });
    }
}

function toggleSections(sectionToShow) {
    const allSections = document.querySelectorAll('.section');
    allSections.forEach((section) => {
        if (section.id === sectionToShow) {
            section.classList.remove('hide');
        } else {
            section.classList.add('hide');
        }
    });
}