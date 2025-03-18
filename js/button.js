import {fetchFromAPI} from "./fetch.js";

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
    fetchFromAPI.fetchTrending("day");
    trendingByDay.classList.add("active");
});

trendingByWeek.addEventListener("click", () => {
    trendingByDay.classList.remove("active");
    fetchFromAPI.fetchTrending("week");
    trendingByWeek.classList.add("active");
});

movieTopRated.addEventListener("click", () => {
    movieTopRated.classList.add("active");
    fetchFromAPI.fetchMovie("top_rated");
    moviePopular.classList.remove("active");
});

moviePopular.addEventListener("click", () => {
    movieTopRated.classList.remove("active");
    fetchFromAPI.fetchMovie("popular");
    moviePopular.classList.add("active");
});

tvTopRated.addEventListener("click", () => {
    tvTopRated.classList.add("active");
    fetchFromAPI.fetchTV("top_rated");
    tvPopular.classList.remove("active");
});

tvPopular.addEventListener("click", () => {
    tvTopRated.classList.remove("active");
    fetchFromAPI.fetchTV("popular");
    tvPopular.classList.add("active");
});


searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchFromAPI.fetchSearch(searchInput.value);
        addSearchResultsSection();
    }
});

searchButton.addEventListener("click", () => {
    fetchFromAPI.fetchSearch(searchInput.value);
    addSearchResultsSection();
});

function addSearchResultsSection() {
    if (!document.querySelector("#search-results")) {
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper-pop";
        wrapper.id = "search-results";
        wrapper.innerHTML = `
   <div class="tendances-container container" >
    <div class="title-filter" id="title-search-resutlts"> <!-- ancien id = title-tendance -->
      <h2>Résulats de la recherche</h2>
      <button id="close-search-results" class="close-btn">&#10005;</button>
    </div>
    
    <div class="grid-tendances" id="search-results-container">  <!-- ancien id = tendances -->
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>
      <div class="movie">
        <img src="img/filmatic.svg" alt="" />
        <div class="score"><p></p></div>
        <h5></h5>
        <p></p>
      </div>      
    </div>
  </div>
</div>        
        `;
        const tendancesContainer = document.querySelector(".wrapper");
        tendancesContainer.parentNode.insertBefore(wrapper, tendancesContainer);

        // Masquer toutes les sections et afficher uniquement les résultats de recherche
        toggleSections('search-results');

        const closeBtn = document.querySelector("#close-search-results");
        closeBtn.addEventListener("click", () => {
            const searchResultsSection = document.querySelector("#search-results");
            if (searchResultsSection) {
                searchResultsSection.remove();
            }
            toggleSections('populaires'); // Revenir à la section populaire ou autre
        });
    }
}

/* function toggleSections(sectionToShow) {
    const allSections = document.querySelectorAll('.section');
    allSections.forEach((section) => {
        if (section.id === sectionToShow) {
            section.classList.remove('hide');
        } else {
            section.classList.add('hide');
        }
    });
} */