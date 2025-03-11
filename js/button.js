import { fetchFromAPI } from "./fetch.js";

const trendingByDay = document.querySelector("#day");
const trendingByWeek = document.querySelector("#week");
const tvTopRated = document.querySelector("#top_rated");
const tvPopular = document.querySelector("#popular");
const movieTopRated = document.querySelector("#movie_top_rated");
const moviePopular = document.querySelector("#movie_popular");

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
    fetchFromAPI.fetchMovie("top_rated"); // Films top rated
    moviePopular.classList.remove("active");
});

moviePopular.addEventListener("click", () => {
    movieTopRated.classList.remove("active");
    fetchFromAPI.fetchMovie("popular"); // Films populaires
    moviePopular.classList.add("active");
});

tvTopRated.addEventListener("click", () => {
    tvTopRated.classList.add("active");
    fetchFromAPI.fetchTV("top_rated"); // Séries top rated
    tvPopular.classList.remove("active");
});

tvPopular.addEventListener("click", () => {
    tvTopRated.classList.remove("active");
    fetchFromAPI.fetchTV("popular"); // Séries populaires
    tvPopular.classList.add("active");
});
