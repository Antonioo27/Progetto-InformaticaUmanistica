document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-bar");
    const sortButtonFilm = document.querySelector(".btnFilm"); // Bottone di ordinamento
    const sortButtonDate = document.querySelector(".btnDate"); // Bottone di ordinamento
    const sortIcon = document.getElementById("sortIcon"); // Icona dell'ordinamento
    const filmContainer = document.querySelector(".film-container"); // Contenitore delle card
    let ascendingOrder = true; // Flag per alternare tra ascendente e discendente

    function getVisibleMovies() {
        return Array.from(filmContainer.querySelectorAll(".film-card"))
            .filter(card => card.style.display !== "none"); // Prende solo i film visibili
    }

    function sortMovies(type) {
        const visibleMovies = getVisibleMovies();
    
        if (type === "film") {
            // Ordina i film visibili per titolo
            visibleMovies.sort((a, b) => {
                const titleA = a.querySelector("h3").innerText.toLowerCase();
                const titleB = b.querySelector("h3").innerText.toLowerCase();
                return ascendingOrder ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
            });
        } else {
            visibleMovies.sort((a, b) => {
                const dateA = parseInt(a.querySelector(".film-date").innerText.toLowerCase());
                const dateB = parseInt(b.querySelector(".film-date").innerText.toLowerCase());
                return ascendingOrder ? dateA - dateB : dateB - dateA;
            });
        }
    
        // Riaggiunge le card ordinate al contenitore
        visibleMovies.forEach(card => filmContainer.appendChild(card));
    
        // Cambia l'icona dell'ordinamento senza rimuoverla
        if (sortIcon) {
            sortIcon.classList.toggle("fa-sort-alpha-down", ascendingOrder);
            sortIcon.classList.toggle("fa-sort-alpha-up", !ascendingOrder);
        }
    
        // Alterna l'ordine per il prossimo clic
        ascendingOrder = !ascendingOrder;
    }
    
    

    // Assegna l'evento di ordinamento al pulsante
    sortButtonDate.addEventListener("click", () => sortMovies("date"));
    sortButtonFilm.addEventListener("click", () => sortMovies("film"));

    // Filtraggio in base all'input della barra di ricerca
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase().trim();
        let hasResults = false;

        document.querySelectorAll(".film-card").forEach(card => {
            const title = card.querySelector("h3").innerText.toLowerCase();
            if (title.includes(searchText)) {
                card.style.display = "flex";
                card.style.opacity = "1";
                hasResults = true;
            } else {
                card.style.display = "none";
                card.style.opacity = "0";
            }
        });

        // Dopo il filtro, riapplica l'ordinamento ai risultati visibili
        sortMovies("film");
    });
});
