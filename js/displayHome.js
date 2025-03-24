/*function display(json, container) {
    console.log(json);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const gridTendance = document.querySelector(container);

    if (!gridTendance) {
        return;
    }

    const filmsToDisplay = json.results.slice(0, 12);

    filmsToDisplay.forEach((film, index) => {
        if (!gridTendance.children[index]) return;

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

        gridTendance.children[index].addEventListener("click", () => {
            window.location.href = `/focus.html?type=${film.name ? "tv" : "movie"}&id=${film.id}`;
        });
    });
}*/

function display(json, container) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const gridTendance = document.querySelector(container);
    if (!gridTendance) {
        return;
    }

    gridTendance.innerHTML = "";

    json.results.slice(0, 4).forEach((film) => {
        const card = document.createElement("div");
        card.className = "movie";
        card.innerHTML = `
            <img src="https://www.themoviedb.org/t/p/w500${
            film.poster_path
        }" alt="" />
            <div class="score"><p>${Math.round(film.vote_average * 10)}%</p></div>
            <h5>${film.name ? film.name : film.title}</h5>
            <p>${new Date(
            film.first_air_date ? film.first_air_date : film.release_date
        ).toLocaleDateString("fr-FR", options)}</p>
        `;

        card.addEventListener("click", () => {
            const id = film.id;
            const type = film.media_type || (film.first_air_date ? "tv" : "movie");
            window.location.href = `focus.html?id=${id}&type=${type}`;
        });

        gridTendance.appendChild(card);
    });
}

export default display;
