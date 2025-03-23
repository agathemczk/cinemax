import {fetchMovie, fetchSearch, fetchTrending, fetchTV} from "./fetch.js";

fetchTrending("day");
fetchTV("top_rated");
fetchMovie("top_rated");
fetchSearch();