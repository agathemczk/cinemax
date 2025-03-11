function display(json, container) {
    console.log(json);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const gridTendance = document.querySelector(container);
    if (!gridTendance) {
        console.error(`❌ Conteneur ${container} introuvable`);
        return;
    }

    json.results.slice(0, 4).forEach((film, index) => {
        if (!gridTendance.children[index]) return; // Évite l'erreur si pas assez d'enfants

        gridTendance.children[index].innerHTML = `
        <img src="https://www.themoviedb.org/t/p/w500${
            film.poster_path
        }" alt="" srcset='img/filmatic.svg' onload="this.srcset=''"/>
        <div class="score"><p>${Math.round(film.vote_average * 10)}%</p></div>
        <h5>${film.name ? film.name : film.title}</h5>
        <p>${new Date(
            film.first_air_date ? film.first_air_date : film.release_date
        ).toLocaleDateString("fr-FR", options)}</p>
        `;
    });
}

export default display;
