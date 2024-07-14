import UserInterfaceHandler from "./dataDisplay.js";

const searchButton = $("#searchLink");
const searchArea = document.querySelector("#search");
const homeArea = document.querySelector("#home");
const coverArea = document.querySelector("#cover");
let loading =  document.querySelector(".loading");


export default class Search{
    constructor(){
        coverArea.classList.add("d-none");
        homeArea.classList.add("d-none");
        searchArea.classList.remove("d-none");

        this.ui = new UserInterfaceHandler();

        document.querySelector("#name").addEventListener("keyup",()=>{
            this.searchByName(document.querySelector("#name").value);
        });

        document.querySelector("#fLetter").addEventListener("keyup",()=>{
            this.searchByFirstLetter(document.querySelector("#fLetter").value);
        });
    }
    
    async searchByName(term) {
        loading.classList.remove("d-none");

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
        const options = {
            method: 'GET',
        };

        try {
            const response  = await fetch(url, options);
            const result    = await response.json();

            searchArea.classList.add("d-none");
            this.ui.displayHomeData(result.meals.slice(0 , 20));
            coverArea.classList.remove("d-none");
            homeArea.classList.remove("d-none");
        } catch (error) {
            console.error(error);
        }
        finally{
            loading.classList.add("d-none");
        }
  }

  async searchByFirstLetter(firstLetter) {
    loading.classList.remove("d-none");

    const url = `www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const options = {
        method: 'GET',
    };

    try {
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
          );
        let  result = await response.json();

        searchArea.classList.add("d-none");
        this.ui.displayHomeData(result.meals.slice(0 , 20));
        coverArea.classList.remove("d-none");
        homeArea.classList.remove("d-none");
    } catch (error) {
        console.error(error);
    }
    finally{
        loading.classList.add("d-none");
    }
}
}





