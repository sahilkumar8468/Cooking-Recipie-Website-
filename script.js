const searchBtn=document.querySelector('.searchBtn');
const searchBox=document.querySelector('.search-box');
const recipeContainer=document.querySelector('.recipe-container');
const recipeBtn=document.querySelector('.recipe-close-btn');
const recipeDetailContent=document.querySelector('.recipe-detail-content');

const fetchRecipes=async (query)=>{
    try {
        
   
    recipeContainer.innerHTML="Fetching Recipes....";
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const  response=await data.json();
    // console.log(response.meals[0]);

    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
         <img src="${meal.strMealThumb}" >
         <h3>${meal.strMeal}</h3>
         <p><span>${meal.strArea}</span> Dish </p>
         <p>Belongs to   <span> ${meal.strCategory} </span> Category </p>
        `   

        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);
button.addEventListener('click',()=>{
    openRecipePopup(meal);
})        
        recipeContainer.appendChild(recipeDiv);
        
    });
} catch (error) {
    recipeContainer.innerHTML=`<div class="error">
    <img src="404.png">
    <h2>Error in fetching Recipes....</h2>
    </div>`;

}
}


// Function to Fetch ingredients and measurements
const fetchIngredients=(meal)=>{
    let ingredientslist="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientslist +=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break
        }
    }
    return ingredientslist;
}



        // Adding EventListener to Recipe Button
        const openRecipePopup=(meal)=>{
            recipeDetailContent.innerHTML=`
            <h2 class="recipeName">${meal.strMeal}</h2>
            <h3 class="ingredientList-h3">Ingredents:</h3>
            <ul class="ingredientList">${fetchIngredients(meal)}</ul>
            <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
            </div>
            `
            recipeDetailContent.parentElement.style.display="block";
        }

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search Box.</h2>`
        return"";
    }
    fetchRecipes(searchInput);

    // console.log('button clicked');
})


recipeBtn.addEventListener('click',()=>{
    recipeDetailContent.parentElement.style.display="none"
})