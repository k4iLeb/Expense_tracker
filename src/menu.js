import main_Chicken_Cream from "./images/main_Chicken_Cream.png";
import main_Game_Over from "./images/main_Game_Over.png";
import main_Koala_Kong from "./images/main_Koala_Kong.png";
import main_Pavarotti from "./images/main_Pavarotti.png";
import sauce_bbq from "./images/sauce_bbq.png";
import sauce_blue_mayo from "./images/sauce_blue_mayo.png";
import sauce_jack_jack from "./images/sauce_jack_jack.png";
import sauce_Jackaroo from "./images/sauce_Jackaroo.png";
import starter_Cheese_balls from "./images/starter_Cheese_balls.png";
import starter_Onion_rings from "./images/starter_Onion_rings.png";

const menu = (() => {
  const obj = {
    title: "Menu",
    content: {
      sauces: [
        {
          title: "Bbq",
          desc: "Dip. Homemade",
          price: "0,70€",
          pic: sauce_bbq,
        },
        {
          title: "Blue Mayo",
          desc: "Dip. Homemade",
          price: "0,70€",
          pic: sauce_blue_mayo,
        },
        {
          title: "Jack Jack sauce",
          desc: "Dip. Homemade",
          price: "0,70€",
          pic: sauce_jack_jack,
        },
        {
          title: "Jackaroo",
          desc: "Dip. Homemade",
          price: "0,70€",
          pic: sauce_Jackaroo,
        },
      ],
      starters: [
        {
          title: "Onion Rings",
          desc: "6 pieces. Marinated for 24 hours & breaded with our secret recipe. Served with ring sauce.",
          price: "3,50€",
          pic: starter_Onion_rings,
        },

        {
          title: "Cheese Balls",
          desc: "6 pieces. Crispy cheese balls with aged gouda. Served with sweet chili sauce.",
          price: "3,50€",
          pic: starter_Cheese_balls,
        },
      ],
      main: [
        {
          title: "Chicken Cream",
          desc: "Handmade buttery brioche bun, two handmade pieces of breaded chicken, vanilla ice cream, hot honey.",
          price: "5,10€",
          pic: main_Chicken_Cream,
        },

        {
          title: "Pavarotti",
          desc: "Handmade buttery brioche bun, two 100% beef patties, double goat cheese, sautéed mushrooms, caramelized onions, truffle mayonnaise.",
          price: "5,90€",
          pic: main_Pavarotti,
        },

        {
          title: "Koala Kong",
          desc: "Handmade buttery brioche bun, two pieces of fresh hand-breaded fried chicken breast, double cheddar, double smoked bacon, double fried egg, onion, iceberg lettuce, spicy mayo, jalapeños, sweet chili.",
          price: "5,90€",
          pic: main_Koala_Kong,
        },

        {
          title: "Game Over",
          desc: "Handmade brioche bun with 2 handmade 100% beef patties, 2 handmade pieces of breaded chicken, double cheddar, double smoked bacon, tomato, iceberg lettuce, mayonnaise & BBQ sauce.",
          price: "6,90€",
          pic: main_Game_Over,
        },
      ],
    },
  };

  const render = () => {
    const content = document.querySelector("#content");
    content.innerHTML = "";

    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = obj.title;
    content.append(title);

    Object.keys(obj.content).forEach((cat) => {
      const category = document.createElement("div");
      category.classList.add("category");
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      category.append(categoryTitle);
      content.append(category);
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card-list");

      obj.content[cat].forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardDiv = document.createElement("div");
        const titleSpan = document.createElement("span");
        titleSpan.classList.add("title");
        titleSpan.textContent = item.title;
        const priceSpan = document.createElement("span");
        priceSpan.classList.add("price");
        priceSpan.textContent = item.price;
        const cardP = document.createElement("p");
        cardP.textContent = item.desc;
        const cardImg = document.createElement("img");
        cardImg.src = item.pic;

        cardDiv.append(titleSpan, priceSpan);

        card.append(cardDiv, cardP, cardImg);
        cardContainer.append(card);
        content.append(cardContainer);
      });
    });
  };

  return { render };
})();

export { menu };
