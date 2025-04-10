const accessKey = "S4DgRGt7kv_-hFD7-nOSwqocLUc7Cn6lryiKtPjm-YA";

let formEle = document.getElementById("form")
let searchInput = document.getElementById("img-input")
let searchBtn = document.getElementById("search-btn")
let searchResults = document.getElementById("search-results")
let showMore = document.getElementById("show-more")

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json();
    const results = data.results;
    if (page === 1) {
        searchResults.innerHTML = "";

    }
    results.map((result) => {

        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result")

        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description

        let imageLink = document.createElement("a")
        imageLink.href = result.links.html;
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    })
    page++;
    if (page > 1) {
        showMore.style.display = "block"
    }


}

formEle.addEventListener("submit" , (event)=>{
    event.preventDefault();
    page = 1
    searchImages()
})

showMore.addEventListener("click", () =>{
    searchImages()
})