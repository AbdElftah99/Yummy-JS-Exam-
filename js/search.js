import UserInterfaceHandler from "./dataDisplay.js";

const searchButton = $("#searchLink");
const searchArea = document.querySelector("#search");
const homeArea = document.querySelector("#home");
const coverArea = document.querySelector("#cover");

export default class Seach{
    constructor(){
        $("#search").fadeOut(0);
        $("#closeSearch").click(() => {
        $("#search").fadeOut(300);
        });

        $("#searchLink").click(() => {
        closeSideNav();
        $("#search").fadeIn(300);
        });


    }
}





async function searchByName(term) {
    this.ui = new UserInterfaceHandler();
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    response = await response.json();
  
    displayMeals(response.meals);
  
  }