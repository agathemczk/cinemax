import {token} from "./settings.js";
import displayHome from "./displayHome.js";

export class fetchFromAPI {
    static async fetch(path, container) {
        const url = `https://api.themoviedb.org/3/${path}?language=fr-FR`;

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);

            const json = await res.json();
            displayHome(json, container);
        } catch (err) {
        }
    }

    static async fetchTrending(timeWindow = "day") {

        try {
            const moviesRes = await fetch(
                `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=fr-FR`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const movies = await moviesRes.json();
            const tvRes = await fetch(
                `https://api.themoviedb.org/3/trending/tv/${timeWindow}?language=fr-FR`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const tvShows = await tvRes.json();
            displayHome({results: [...movies.results, ...tvShows.results]}, "#tendances");

        } catch (err) {
            console.error("Erreur lors de la recherche :", err);
        }
    }


    static fetchTV(sortBy = "popular") {
        this.fetch(`tv/${sortBy}`, "#populaires");
    }

    static fetchMovie(sortBy = "popular") {
        this.fetch(`movie/${sortBy}`, "#movies_populaires");
    }


    static async fetchSearch(query) {
        console.log(`Recherche pour : ${query}`);
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

}
