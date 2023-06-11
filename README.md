# local-storage-favorites
An app for favoriting Rick and Morty characters and saving them to local storage. 

Please visit the deployed version of this project via [Netlify here](https://local-storage-favorites.netlify.app/). 

## App Objective
Create a web app for viewing characters from the Rick and Morty API. This app allows the user to add and remove characters from their favorites and view a list of their favorites, as well as browse the full list of characters available from the API. 

## Learning Objective
Become familiar with adding, removing, and editing items in your browser's local storage. Fetch and render data from an external API.

## App Functionality
Similar to the pokedex, this app will fetch characters from the Rick and Morty API and render them as cards in a list, displaying the name, image, etc of each character (there is a lot of data available from this API, you can choose what data you want to display to the user). 
Example: ![image](https://user-images.githubusercontent.com/25269980/209225130-3f1300a1-8b70-4a9c-b960-c22fe149db2d.png)

Additonally, a button should render with each character so that the user can add that character to their favorites. This button should be the image of a star or heart that changes appearance when a character is selected as a favorite, making it clear to the user the character has been favorited.
![image](https://user-images.githubusercontent.com/25269980/209225624-5c229cd9-489d-4d21-8d18-393804df0e52.png)

A list of the user's favorites should render in a section at the top/side of the page, above the general list of characters. When a character is favorited, it should be added to this section. The user shoud be able to remove the character from their favorites by reselecting the favorite icon on the card. 

## Deployment + Local Replication 
This app was developed locally using the VS Code Live Server extension. For a deployed version of the site please visit the following netlify link: [local storage favorites](local-storage-favorites.netlify.app). 

