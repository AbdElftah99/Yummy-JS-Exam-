import UserInterfaceHandler from "./dataDisplay.js";

let closeBtn = $(".btn-close");
let home = document.querySelector("#home");
let cover = document.querySelector("#cover");
let details = document.querySelector(".details");
let loading = document.querySelector(".loading");

export default class Details{

    constructor(id){
        this.ui = new UserInterfaceHandler();

        closeBtn.on("click",
            () =>{
            details.classList.add("d-none");
            home.classList.remove("d-none");
        });

        this.getDetails(id);
    }

    async getDetails(id) {
        loading.classList.remove("d-none");
        cover.classList.add("d-none");

        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            this.ui.displayDetails(result.meals[0]);
        } catch (error) {
            console.error(error);
        }
        finally{
            loading.classList.add("d-none");
        }
    }
}