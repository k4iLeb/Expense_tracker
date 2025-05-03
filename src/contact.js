const contact = (() => {
  const obj = {
    title: "Contact",
    shops: [
      {
        name: "Pireas",
        street: "Sotiros Dios 45",
        postal: "185 34",
        area: "Pireas",
      },
      {
        name: "Kypseli",
        street: "Negri Fokionos 18",
        postal: "112 57",
        area: "Athina",
      },
      {
        name: "Neos Kosmos",
        street: "Kallirrois 73",
        postal: "117 45",
        area: "Athina",
      },
      {
        name: "Peristeri",
        street: "Paraskevopoulou 45",
        postal: "121 32",
        area: "Peristeri",
      },
    ],
  };

  const render = () => {
    const content = document.querySelector("#content");
    content.innerHTML = "";

    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = obj.title;
    content.append(title);

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-list");

    obj.shops.forEach((shop) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const name = document.createElement("h2");
      name.textContent = shop.name;
      const street = document.createElement("p");
      street.textContent = shop.street;
      const postal = document.createElement("p");
      postal.textContent = shop.postal;
      const area = document.createElement("p");
      area.textContent = shop.area;

      card.append(name, street, postal, area);
      cardContainer.append(card);
      content.append(cardContainer);
    });
  };

  return { render };
})();

export { contact };
