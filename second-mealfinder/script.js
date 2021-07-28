const search = document.querySelector(".search"),
  search_input = search.querySelector(".search_input"),
  search_btn = search.querySelector(".search_btn"),
  random = document.querySelector(".random"),
  notice = document.querySelector(".notice"),
  section = document.querySelector("section"),
  footer = document.querySelector("footer");
function bringValue(e) {
  e.preventDefault();
  const bring = search_input.value;
  search_input.value = "";
  if (bring.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${bring}`)
      .then((link) => link.json())
      .then((data) => {
        console.log(data);
        if (data === null) {
          notice.innerHTML = `There are no search result. Try again`;
        } else {
          notice.innerHTML = `Search results for '${bring}'`;
          //result가 있으면 이제 이 결과들 요리이름만 뽑아서 <div>를 만들고
          // 나열해준다.
          section.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
          <img src="${meal.strMealThumb}"/>
         <div class="meal_info" data-mealID="${meal.idMeal}">
         <span>${meal.strMeal}</span></div>
         </div>`
            )
            .join(""); //왜 join함수를 안쓰면 , 이 출력되는지는 알수없음..
        }
      });
  }
}
function makeMealToDom(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  footer.innerHTML = `<div class="selected_meal">
  <h1>${meal.strMeal}</h1>
  <img src = "${meal.strMealThumb}"/>
  <div class="single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
  ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}</div>
  <div class="ingredientsArr">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
  ${ingredients.map((ing) => `<li>${ing}</li>`).join("")} 
  </ul>
  </div>
  </div>`;
} //궁금한거 join("")이 없으면 ,가 들어가는데 왜인지..
function loadRandom(e) {
  notice.innerHTML = ``;
  section.innerHTML = ``;
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      makeMealToDom(meal);
    });
}
function showIngredients(e) {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal_info");
    } else {
      return false;
    }
  });
  let mealID;
  if (mealInfo) {
    mealID = mealInfo.getAttribute("data-mealid");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then((res) => res.json())
      .then((data) => {
        const meal = data.meals[0];
        makeMealToDom(meal);
      });
  }
}
function init() {
  search.addEventListener("submit", bringValue); //검색 결과를 가져올 때
  section.addEventListener("click", showIngredients); //검색 결과에 있는 요리들 중 하나를 클릭할 때
  random.addEventListener("click", loadRandom); //랜덤 버튼을 누를때
}
init();
