let searchInputEl = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let message = document.getElementById('msg');
let headingEl = document.getElementById("h1");
let spinnerEl = document.getElementById("spinner");
let searchResults1 = document.createElement("div");


searchResults1.classList.add("search1");

function createresults(search_results) {
    spinnerEl.classList.add("d-none");

    if (search_results.length < 1) {
        message.textContent = "No results found";
        message.classList.add("msg")
        headingEl.textContent = "";
    } else {
        message.textContent = "";
        headingEl.textContent = "Popular Books";
        searchResults.appendChild(headingEl);
        for (let eachItem of search_results) {

            let image = eachItem.imageLink;
            let author = eachItem.author;

            let searchResults11 = document.createElement("div");
            searchResults11.classList.add("search");

            let imageEl = document.createElement("img");
            imageEl.classList.add("img");
            imageEl.setAttribute("src", image);
            searchResults11.appendChild(imageEl);

            let textEl = document.createElement("p");
            textEl.textContent = author;
            textEl.classList.add("text")
            searchResults11.appendChild(textEl);
            searchResults1.appendChild(searchResults11);
            searchResults.appendChild(searchResults1);
        }
    }
}

function findresults(event) {
    if (event.key === "Enter") {
        message.textContent = "";
        spinnerEl.classList.remove("d-none");
        searchResults1.textContent = "";
        headingEl.textContent = "";
        let searchInput = searchInputEl.value;
        let options = {
            method: "GET"
        };

        let url = "https://apis.ccbp.in/book-store?title=" + searchInput;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                createresults(search_results);
            });
    }
}



searchInputEl.addEventListener("keydown", findresults);