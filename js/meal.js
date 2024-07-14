import UserInterfaceHandler from "./dataDisplay.js";
import Details from "./details.js";

let home =  document.querySelector("#home");
let details =  document.querySelector(".details");
let loading =  document.querySelector(".loading");

export default class Meal{

    constructor(){
        this.getMealsByName("");

        this.ui = new UserInterfaceHandler();
    }

    async getMealsByName(name) {
        loading.classList.remove("d-none");

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            this.ui.displayHomeData(result.meals.slice(0 , 20));
            this.addItemsEvent();
        } catch (error) {
            console.error(error);
        }
        finally{
            loading.classList.add("d-none");
        }
    }

    addItemsEvent(){
        document.querySelectorAll(".card").forEach((item)=>{
            item.addEventListener("click",()=>{
                const id = item.getAttribute("data-id");
                this.showDetails(id);
            });
        });
    }

    showDetails(id){
        const theDetails = new Details(id);
        home.classList.add("d-none");
        details.classList.remove("d-none");
    }
}