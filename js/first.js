let recipesRow = document.getElementById('recipesRow');
let recipeDetailsContent = document.getElementById('recipeDetails');
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');
let allRecipes = [];
let recipeDetails = {};

async function getAllRecipes(term){
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    allRecipes = await apiResponse.json();
    allRecipes = allRecipes.recipes;
    console.log(allRecipes);
    displayAllRecipes();

};

function displayAllRecipes(){
    data = ``;
    for(let i = 0; i < allRecipes.length; i++){

        let myId = "'"+allRecipes[i].recipe_id+"'";
        
        data += ` <div class="col-md-4">
        <div class="recipe" onclick="getRecipeDetails(${myId})">
            <img src="${allRecipes[i].image_url}" class="w-100" alt="">
            <h3 class="color-mine">${allRecipes[i].title}</h3>
            <p class="font-weight-bolder">${allRecipes[i].publisher}</p>
            <p class="font-weight-bolder">${allRecipes[i].recipe_id}</p>
        </div>
    </div>`
    };
    recipesRow.innerHTML = data;
};



async function getRecipeDetails(id){
    let recipeApi = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails = await recipeApi.json();
    recipeDetails = recipeDetails.recipe;
    
    console.log(recipeDetails);
    displayRecipeDetails();


}

function displayRecipeDetails(){
    data1 = ``;
    for (let x of recipeDetails.ingredients) {
        data1 +=`<li class="mb-1">${x}</li>`;
    };
    data = `<div>
    <img src="${recipeDetails.image_url}" class="w-100 rounded" alt="">
    <ul class="mt-4 font-weight-bolder">
    ${data1}
    </ul>
</div>`;

recipeDetailsContent.innerHTML = data;

};
searchBtn.addEventListener('click', function(){
    getAllRecipes(searchInput.value);
});