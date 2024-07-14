
import Meal from "./meal.js";
import Search from "./searchM.js"
import UserInterfaceHandler from "./dataDisplay.js";
import Details from "./details.js";



// Side nav
const left = $(".side-nav-inner").innerWidth();
const countOfLis = document.querySelectorAll(".side-nav ul li").length;

$(".side-nav").css("left", -left);
$("#closeIcon").fadeOut(0);
$(".side-nav ul li").css("top", 150);



function closeSideNav() {
    $(".side-nav").css("left", -left);
    $("#closeIcon").fadeOut(0);
    $("#openIcon").fadeIn(0);
    $(".side-nav ul li").animate({top:150} , 100);
}

function openSideNav() {
    $(".side-nav").css("left", 0);
    $("#closeIcon").fadeIn(0);
    $("#openIcon").fadeOut(0);

    for (let i = 0; i < countOfLis; i++) {
        $(".side-nav ul li").eq(i).animate({top:0} , (i+1)*100);
        
    }
}

$(".menuIcon").on("click",
    () => {
        if ($(".side-nav").css("left") === "0px") {
            closeSideNav();
        }
        else{
            openSideNav();
        }
    }
)

///////////////////////////////////////
let meals = new Meal();

/////////////////////////////////////
const searchButton = $("#searchLink");
const searchArea = document.querySelector("#search");
const homeArea = document.querySelector("#home");
const coverArea = document.querySelector("#cover");
const categoriesArea = document.querySelector("#categories");
const areaArea = document.querySelector("#area");
const ingredientsArea = document.querySelector("#ingredients");
let categoriesList = document.getElementById("categoriesList");
let ingredientsList = document.getElementById("ingredientsList");
let loading =  document.querySelector(".loading");
let details =  document.querySelector(".details");

searchButton.on("click" ,
    () => {
        $("#search").fadeOut(0);
        $("#closeSearch").click(() => {
            $("#search").fadeOut(300);
        });

        closeSideNav();
        $("#search").fadeIn(300);
        let search = new Search();
    }
    )

////////////////////////////////////////////////////
let UI = new UserInterfaceHandler();

$("#mealDetails").fadeOut(0);
$("#categories").fadeOut(0);

$("#closeCategories").click(() => {
  $("#categories").fadeOut(300);
  $("#data").css("opacity", 1);
});

$("#categoriesLink").click(() => {
  getCategories();
  closeSideNav();
});

async function getCategoryMeals(category) {
    $("#loading").fadeIn(300);
  
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    response = await response.json();
  
    UI.displayHomeData(response.meals.slice(0, 20));
    addMealsItemsEvent();
  
    $("#loading").fadeOut(300);
}

  function addMealsItemsEvent(){
    document.querySelectorAll(".card").forEach((item)=>{
        item.addEventListener("click",()=>{
            const id = item.getAttribute("data-id");
            showDetailsofMeal(id);
        });
    });
}

function showDetailsofMeal(id){
    const theDetails = new Details(id);
    home.classList.add("d-none");
    details.classList.remove("d-none");
}

  async function getCategories() {
    $("#loading").fadeIn(300);
    coverArea.classList.add("d-none");
  
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    response = await response.json();
  
    displayCategories(response.categories);

    getCategoryMeals("Seafood");
  
    $("#loading").fadeOut(300);
  }
  
  function displayCategories(categories) {
    let container = "";
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        container += `
        <div class="col-sm-12 col-md-6 col-lg-4">
            <div data-id="${category.strCategory}" class="card rounded-2"  $('#data').css('opacity', '1'); $('#categories').fadeOut(300)">
            <img src="${category.strCategoryThumb}" alt="Category" />
            <div class="overlay text-center">
            <h4>${category.strCategory}</h4>
            <p>${category.strCategoryDescription.split(" ").slice(0, 20).join(" ")}...</p>
            </div>
            </div>
        </div>
        `;
    }
    categoriesList.innerHTML = container;

    addCategoryItemsEvent();
  
    $("#categories").fadeIn(300);
  }

  function addCategoryItemsEvent(){
    document.querySelectorAll("#categories .card").forEach((item)=>{
        item.addEventListener("click",()=>{
            const id = item.getAttribute("data-id");
            showDetailsOfCategory(id);
        });
    });
}

function showDetailsOfCategory(id){
    coverArea.classList.remove("d-none");
    categoriesArea.classList.add("d-none");
    loading.classList.add("d-none");
    getCategoryMeals(id);
}
  

//////////////////////////////////////////////////////////////
$("#area").fadeOut(0);

$("#closeArea").click(() => {
  $("#area").fadeOut(300);
  $("#data").css("opacity", 1);
});

$("#areaLink").click(() => {
  getArea();
  closeSideNav();
});

// // <==================================================>

async function getArea() {
  $("#loading").fadeIn(300);

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();

  displayArea(respone.meals);

  $("#loading").fadeOut(300);
}

async function getAreaMeals(area) {
  $("#loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  UI.displayHomeData(response.meals.slice(0, 20));

  $("#loading").fadeOut(300);
}

function displayArea(area) {
  let container = "";
  for (let i = 0; i < area.length; i++) {
    let data = area[i];
    container += `
    <div class="col-md-3">
        <div data-id="${data.strArea}" class="card rounded-2 text-center py-3" $('#data').css('opacity', '1'); $('#area').fadeOut(300)">
            <i class="fa-solid fa-earth-americas fa-3x mb-3"></i>
            <h4 class="mb-0">${data.strArea}</h4> 
        </div>
    </div>
    `;
  }
    areaList.innerHTML = container;

    addAreaItemsEvent();

  $("#area").fadeIn(300);
}

function addAreaItemsEvent(){
    document.querySelectorAll("#area .card").forEach((item)=>{
        item.addEventListener("click",()=>{
            const id = item.getAttribute("data-id");
            showDetailsOfArea(id);
        });
    });
}

function showDetailsOfArea(id){
    areaArea.classList.add("d-none");
    getAreaMeals(id);
}

//////////////////////////////////////////////////
$("#ingredients").fadeOut(0);

$("#closeIngredients").click(() => {
  $("#ingredients").fadeOut(300);
  $("#data").css("opacity", 1);
});

$("#ingredientsLink").click(() => {
  getIngredients();
  closeSideNav();
});

// // <==================================================>

async function getIngredients() {
  $("#loading").fadeIn(300);

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();

  displayIngredients(respone.meals.slice(0, 20));

  $("#loading").fadeOut(300);
}

async function getIngredientsMeals(ingredients) {
  $("#loading").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  UI.displayHomeData(response.meals.slice(0, 20));

  $("#loading").fadeOut(300);
}

function displayIngredients(ingredient) {
  let container = "";
    for (let i = 0; i < ingredient.length; i++) {
        let data = ingredient[i];
        container += `
        <div class="col-md-3">
            <div data-id="${data.strIngredient}"  class="card rounded-2" $('#data').css('opacity', '1'); $('#ingredients').fadeOut(300)">
                <img src="https://www.themealdb.com/images/ingredients/${data.strIngredient}.png" alt="ingredient" />
                <div class="overlay text-center">
                    <h4>${data.strIngredient}</h4>
                    <p>${data.strDescription.split(" ").slice(0, 20).join(" ")}...</p>
                </div>
            </div>
        </div>
        `;
    }
    ingredientsList.innerHTML = container;

    addIngredientsItemsEvent();

  $("#ingredients").fadeIn(300);
}

function addIngredientsItemsEvent(){
    document.querySelectorAll("#ingredients .card").forEach((item)=>{
        item.addEventListener("click",()=>{
            const id = item.getAttribute("data-id");
            showDetailsOfIngredients(id);
        });
    });
}

function showDetailsOfIngredients(id){
    ingredientsArea.classList.add("d-none");
    getIngredientsMeals(id);
}


///////////////////////////////////////////////
$("#contact").fadeOut(0);

$("#contact input").keyup(() => {
  inputsValidation();
});

$("#nameWarning").fadeOut(0);
$("#emailWarning").fadeOut(0);
$("#phoneWarning").fadeOut(0);
$("#ageWarning").fadeOut(0);
$("#passwordWarning").fadeOut(0);
$("#rePasswordWarning").fadeOut(0);

$("#closeContact").click(() => {
  $("#contact").fadeOut(300);
  $("#data").css("opacity", 1);
});

$("#contactUs").click(() => {
  closeSideNav();
  $("#data").css("opacity", 0.3);
  $("#contact").fadeIn(300);
});

let submitBtn = document.getElementById("submitBtn");

function inputsValidation() {
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.classList.remove("disabled");
    $("#submitBtn").css("cursor", "pointer");
  } else {
    submitBtn.classList.add("disabled");
    $("#submitBtn").css("cursor", "not-allowed");
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test($("#uName").val());
}

$("#uName").keyup(() => {
  if (nameValidation()) {
    $("#nameWarning").fadeOut(300);
  } else {
    $("#nameWarning").fadeIn(300);
  }
});

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("email").value
  );
}

$("#email").keyup(() => {
  if (emailValidation()) {
    $("#emailWarning").fadeOut(300);
  } else {
    $("#emailWarning").fadeIn(300);
  }
});

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phone").value
  );
}

$("#phone").keyup(() => {
  if (phoneValidation()) {
    $("#phoneWarning").fadeOut(300);
  } else {
    $("#phoneWarning").fadeIn(300);
  }
});

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("age").value
  );
}

$("#age").on("keyup" , () => {
  if (ageValidation()) {
    $("#ageWarning").fadeOut(300);
  } else {
    $("#ageWarning").fadeIn(300);
  }
});

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("password").value
  );
}

$("#password").on("keyup" ,() => {
  if (passwordValidation()) {
    $("#passwordWarning").fadeOut(300);
  } else {
    $("#passwordWarning").fadeIn(300);
  }
});

function repasswordValidation() {
  return (
    document.getElementById("rePassword").value ===
    document.getElementById("password").value
  );
}

$("#rePassword").keyup(() => {
  if (repasswordValidation()) {
    $("#rePasswordWarning").fadeOut(300);
  } else {
    $("#rePasswordWarning").fadeIn(300);
  }
});
