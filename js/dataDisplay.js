let homeRowCard = document.querySelector("#data");
let mealDetails = document.querySelector("#detailsContent");

export default class UserInterfaceHandler{
    displayHomeData(data){
        let container = ``;
        for (let i = 0; i < data.length; ++i) {
            container +=
                `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div data-id="${data[i].idMeal}" role="button" class="h-100 card">
                        <div class="card-body">
                            <figure>
                                <img class="object-fit-cover w-100" src="${data[i].strMealThumb}" alt="${data[i].strMeal}">
                                <div class="overlay text-center">
                                    <h5 class="fs-5 text-white">${data[i].strMeal}</h5>
                                </div>
                            </figure>
                            </div>
                    </div>
                </div>`
        }

        homeRowCard.innerHTML = container;
    }

    displayDetails(meal){

        let ingredients = "";

        for (let i = 0; i < 20; i++) {
            if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-light m-1 py-1 px-2">${
                meal[`strMeasure${i}`]
            } ${meal[`strIngredient${i}`]}</li>`;
            }
        }

        let tags = meal.strTags?.split(",") ?? [];

        console.log(tags);

        let tagsStr = "";

        for (let i = 0; i < tags.length; i++) {
            tagsStr += `
            <li class="alert alert-light m-1 py-1 px-2">${tags[i]}</li>`;
        }



        let container = 
        `
             <div class="col-md-4">
                    <img class="w-100" src="${meal.strMealThumb}" alt="image details">
                    <h3>Title: ${meal.strMeal}</h3>
                </div>
                <div class="col-md-8">
                    <p>
                        Instructions: <span class="badge">${meal.strInstructions}</span>
                    </p>

                    <p>
                        Area: <span class="badge">${meal.strArea}</span>
                    </p>
                    <p>
                        Catedory: <span class="badge">${meal.strCategory}</span>
                    </p>
                    <p>
                        Recipes:
                       <ul class="list-unstyled d-flex g-3 flex-wrap">
                            ${ingredients}
                        </ul>
                    </p>

                    <p>
                        Tags: <span class="badge">${meal.tagsStr}</span>
                    </p>

                    <a class="btn btn-outline-success" href ="${meal.strSource}" target="_blank">Source</a>
                    <a class="btn btn-outline-warning" href ="${meal.strYoutube}" target="_blank">Youtube</a>
                </div>`;

        mealDetails.innerHTML = container;   
    }
}