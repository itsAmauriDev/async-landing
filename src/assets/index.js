const URL_API =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.API_KEY,
    "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  },
};

const container = document.querySelector("#content");

(async (url) => {
  try {
    const response = await fetch(`${url}?number=3`, options);
    const data = await response.json();

    let recipesData = "";

    data.recipes.map((recipe) => {
      const itemData = `
    <div class="lg:flex rounded-lg overflow-hidden">
      <div class="w-full flex flex-col gap-y-2 lg:w-2/5">
        <img
          src=${recipe.image}
          alt=${recipe.title}
          class="w-full h-full object-cover"
        />
      </div>
      <div class="w-full flex flex-col gap-y-3 p-3 border-2 lg:w-3/5">
        <h3 class="text-xl font-bold text-gray-700">
          ${recipe.title}
        </h3>
        <ul class="flex gap-x-4 gap-y-2 text-sm flex-wrap">
          <li class="flex gap-x-1">
            <img src="./assets/img/time.svg" alt="time" />${
              recipe.readyInMinutes
            } minutes
          </li>
          <li class="flex gap-x-1">
            <img src="./assets/img/servings.svg" alt="servings" />${
              recipe.servings
            }
            servings
          </li>
          <li class="flex gap-x-1">
            <img src="./assets/img/heart.svg" alt="likes" />${
              recipe.aggregateLikes
            } likes
          </li>
        </ul>
        <ul class="grid text-sm py-2 md:grid-cols-2">
          ${recipe.extendedIngredients
            .map((ingredient) => {
              return `<li>${ingredient.original}</li>`;
            })
            .toString()
            .replaceAll(">,", ">")}
        </ul>
        <p>${recipe.instructions}</p>
        <p class="text-xs italic text-gray-400">
          Source:
          <a
            href=${recipe.sourceUrl}
            >${recipe.sourceName}</a
          >
        </p>
      </div>
    </div>
    `;
      recipesData += itemData;
    });
    container.innerHTML = recipesData;
  } catch (error) {
    console.error(error.message);
    const errorMsg = `
    <div
      class="flex flex-col gap-y-3 items-center justify-center h-56 text-xl font-medium"
    >
      <p>Ooops! Sorry an error ocurred</p>
      <img
        class="w=full h-28"
        src="./assets/img/sad-face.svg"
        alt="sad face"
      />
      <p>Try again later</p>
    </div>
    `;
    container.innerHTML = errorMsg;
  }
})(URL_API);
