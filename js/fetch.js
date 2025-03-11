import { token, key } from "./settings.js";
import displayHome from "./displayHome.js";

export class fetchFromAPI {
    static async fetch(path, container) {
        const url = `https://api.themoviedb.org/3/${path}?language=fr-FR`;
        console.log("🔍 Vérification de l'URL :", url); // Ajout debug

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
            console.log("📩 Réponse API :", json); // Debug pour voir le retour API
            displayHome(json, container);
        } catch (err) {
            console.error("❌ Erreur lors de la récupération des données :", err);
        }
    }

    static async fetchTrending(timeWindow = "day") {
        console.log("📡 Fetching Trending Movies & TV Shows...");

        try {
            // Récupération des films tendances
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
            displayHome({ results: [...movies.results, ...tvShows.results] }, "#tendances");

        } catch (err) {
            console.error("❌ Erreur lors de la récupération des tendances :", err);
        }
    }


    static fetchTV(sortBy = "popular") {
        console.log("📡 Fetching TV Shows...");
        this.fetch(`tv/${sortBy}`, "#movies_populaires"); // Utilisation du paramètre
    }

    static fetchMovie(sortBy = "popular") {
        console.log("📡 Fetching Movies...");
        this.fetch(`movie/${sortBy}`, "#populaires"); // Utilisation du paramètre
    }

}
