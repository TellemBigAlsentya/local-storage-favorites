// ARM BUTTONS + ASSIGN GLOBAL VARIABLES 
//
const RickAndMortyAPI = 'https://rickandmortyapi.com/api/character/';
let favoriteArray = [];
let currentPageInfo = '';
const searchInput = document.getElementById('filter-search');
const favoriteBar = document.getElementById('favorite-container');
const cardContainer = document.getElementById('card-container');
const nextPage = document.getElementById('next-page');
const prevPage = document.getElementById('previous-page');
window.addEventListener('Asynchronous data fetching', ()=> {
    let window = document.querySelector('*');
    window.style.cursor = 'wait';
});
searchInput.addEventListener('search', searchForCharacterCards);
nextPage.addEventListener('click', fetchNextPage); 
prevPage.addEventListener('click', fetchPrevPage);

// ON LOAD - GET DATA 

appInit();

async function appInit(){
    fetchFavoritesInLocalStorage();
    await getFirstCharacters();  
}

async function getFirstCharacters() {
    const APIfetch = await fetch(`${RickAndMortyAPI}?page=1`);
    const APIresponse = await APIfetch.json();
    currentPageInfo = APIresponse.info;
    // ON LOAD - SHOW DATA 
    createCharacterCards(APIresponse.results); 
    let nextPageNumber = document.getElementById('nextPageNumber');
    nextPageNumber.innerText = currentPageInfo.next.slice(-1); 
}

// feed this function an array of character objects -> creates DOM elements: cards, pagination elements, and a
// display for when no data is received/able to be rendered based on search input
function createCharacterCards(array) {
    if(Array.isArray(array)) {
        for(let i = 0; i < array.length; i++) {
            let newCard = document.createElement('div');
            newCard.classList.add('characterCard'); 
            newCard.addEventListener('click', doThisOnClick);
            let cardTitle = document.createElement('div');
            cardTitle.classList.add('characterNames');
            let cardImg = document.createElement('img');
            let favoriteIcon = document.createElement('img');
            let cardText = document.createElement('ul'); 
            let textSpecies = document.createElement('li');
            let textStatus = document.createElement('li');
            let textLocation = document.createElement('li');
            if(checkFaves(`${array[i].id}`)) {
                favoriteIcon.src = 'img/favorite-heart.svg';
                favoriteIcon.classList.add('favorited');
            } else {favoriteIcon.src = 'img/not-favorite-heart.svg';}
            favoriteIcon.classList.add('favoriteButton');
            newCard.id = array[i].id;
            cardTitle.innerText = `${array[i].name}`;
            cardImg.src = array[i].image; 
            textSpecies.innerText = `Species: ${array[i].species}`;
            textStatus.innerText = `Status: ${array[i].status}`;
            textLocation.innerText = `Location: ${array[i].location.name}`;
            cardContainer.appendChild(newCard);
            newCard.appendChild(cardImg);
            newCard.appendChild(cardTitle);
            newCard.appendChild(favoriteIcon);
            newCard.appendChild(cardText);
            cardText.appendChild(textSpecies);
            cardText.appendChild(textStatus);
            cardText.appendChild(textLocation);

        }
        // else statement that fills the card-container with an error message 
    } else {
        console.error('this is not an array');
        let emptyBoard = document.createElement('div');
        let emptyBoardText = document.createElement('p');
        emptyBoard.classList.add('noCharacterCards');
        emptyBoardText.innerText = 'There are no characters that match your search parameters';
        cardContainer.appendChild(emptyBoard);
        emptyBoard.appendChild(emptyBoardText); 
    }
}

//EVENT LISTENER CALLBACK FUNCTIONS
 
async function fetchNextPage() {
    const APIfetch = await fetch(currentPageInfo.next);
    const APIresponse = await APIfetch.json();
    currentPageInfo = APIresponse.info;
    prevPage.classList.remove('hidden');
    clearDOMElements();
    createCharacterCards(APIresponse.results);
    let nextPageNumber = document.getElementById('nextPageNumber');
    let prevPageNumber = document.getElementById('prevPageNumber');

    nextPageNumber.innerText = currentPageInfo.next.split('?page=')[1];
    prevPageNumber.innerText = currentPageInfo.prev.split('?page=')[1];
}

async function fetchPrevPage() {
    const APIfetch = await fetch(currentPageInfo.prev);
    const APIresponse = await APIfetch.json();
    currentPageInfo = APIresponse.info;
    if(!currentPageInfo.prev) {
        prevPage.classList.add('hidden');
    }
    clearDOMElements();
    createCharacterCards(APIresponse.results);
    let nextPageNumber = document.getElementById('nextPageNumber');
    let prevPageNumber = document.getElementById('prevPageNumber');
    nextPageNumber.innerText = currentPageInfo.next.split('?page=')[1];
    if(currentPageInfo.prev) {prevPageNumber.innerText = currentPageInfo.prev.split('?page=')[1];}
}

// SEARCH CALL BACK FUNCTION 
//    needs to get data with search input as parameter then call the render character 
//    card/DOM element function with that data

async function searchForCharacterCards(event) {
    let searchValue = event.target.value.toUpperCase();
    if(!searchValue == '') {
        nextPage.classList.add('hidden');
    } else {nextPage.classList.remove('hidden');}
    let APISearch = await fetch(`${RickAndMortyAPI}?name=${searchValue}`); 
    let APIResults = await APISearch.json(); 
    clearDOMElements();
    createCharacterCards(APIResults.results);
}

// GET FAVROITES 

function fetchFavoritesInLocalStorage() {
    //check first to see if LS favorite key has any values
    if(localStorage.favorites) {
        let favoriteIDs = window.localStorage.getItem('favorites');
        let myArray = favoriteIDs.split(','); 
        myArray.forEach(id => favoriteArray.push(id));
        //returns a string of favorited cards id's
        getFavoriteData(favoriteIDs);} 
    else {console.log('local storage has no saved favorites');}
}

// the endpoint options here are either an object or an array of objects  
async function getFavoriteData(characterID) {
    let APIfetch = await fetch(`${RickAndMortyAPI}${characterID}`);
    let APIresponse = await APIfetch.json(); 
    if(!APIresponse.length) {
        pinFavorite(APIresponse); 
    } else if(APIresponse.length) {
        APIresponse.forEach(characterObj => pinFavorite(characterObj));
    } else {console.error('this APIfetch is not returning the correct data type');}
}

// SHOW FAVORITES -> CREATE DOM ELEMENTS

function pinFavorite(characterObj) {
    let favoriteCard = document.createElement('div');
    favoriteCard.classList.add('favoriteCard');
    favoriteCard.id = `favorite-card-${characterObj.id}`;
    let favoriteCardImg = document.createElement('img');
    favoriteCardImg.src = characterObj.image;
    let favoriteCardName = document.createElement('div');
    favoriteCardName.innerText = characterObj.name; 
    let favoritePin = document.createElement('img');
    favoritePin.src = 'img/thumb-tack.svg';
    favoriteBar.appendChild(favoriteCard);
    favoriteCard.appendChild(favoriteCardImg);
    favoriteCard.appendChild(favoriteCardName);
    favoriteCard.appendChild(favoritePin);
}
//callback function for event listener on card
// on click, we want the heart to turn red, the favorite cards id be saved to the local storage object and the fav card to be rendered 
function doThisOnClick(event) {
    if(!event.target.classList.contains('favoriteButton')) {
        return;
    }
    // on click, toggle the heart display 
    changeHeartDisplay(event);
    let characterID = this.id;
    //debugger;
    if(!checkFaves(characterID)) {
        // add the id of the selected fav to the session favorite array
        favoriteArray.push(characterID); 
        // save the characer id to LS list 
        window.localStorage.setItem('favorites', `${favoriteArray}`); 
        // render favorite card using pinFav function -> needs an object 
        getFavoriteData(characterID); 
    } else { 
        // if the character id is already present: remove the id from the fav array, update local storage, destroy DOM elem 
        favoriteArray = favoriteArray.filter(x => x !== characterID); 
        localStorage.setItem('favorites', `${favoriteArray}`);
        let unFavoriteCard = document.getElementById(`favorite-card-${characterID}`);
        favoriteBar.removeChild(unFavoriteCard); 
    }
}

// HELPER FUNCTIONS

function clearDOMElements() {
    cardContainer.innerHTML = '';
}
function changeHeartDisplay(event) {
    event.target.classList.toggle('favorited');
    if(event.target.classList.contains('favorited')) {
        event.target.src = 'img/favorite-heart.svg';
    } else { 
        event.target.src = 'img/not-favorite-heart.svg';
    } 
}
function checkFaves(id) {
    return Boolean(favoriteArray.find(elem => elem == id));
}

