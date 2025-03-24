import {token} from "./settings.js";
import displayHome from "./displayHome.js";

async function fetchAPI(path) {
    const url = `https://api.themoviedb.org/3/${path}?language=fr-FR`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            window.location.href = "404.html";
            return null;
        }
        const json = await response.json();
        return json;
    } catch (err) {
        window.location.href = "404.html";
    }
}

async function fetchTrending(sortBy) {
    const json = await fetchAPI(`trending/all/${sortBy}`);
    displayHome(json, "#tendances");
}

async function fetchTV(sortBy) {
    const json = await fetchAPI(`tv/${sortBy}`);
    displayHome(json, "#populaires");
}

async function fetchMovie(sortBy = "popular") {
    const json = await fetchAPI(`movie/${sortBy}`);
    displayHome(json, "#movies_populaires");
}


async function fetchSearch(query) {
    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=fr-FR`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        const json = await res.json();
        displayHome({results: json.results.slice(0, 12)}, "#search-results-container");
    } catch (err) {
        console.error("Erreur lors de la recherche :", err);
    }
}

export {fetchMovie, fetchTrending, fetchTV, fetchSearch, fetchAPI};