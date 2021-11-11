const carsDiv = document.querySelector(".cars");
const formSelect = document.querySelector(".form-select");
const infoDiv = document.querySelector(".selected-info");
const cardBody = document.querySelector(".card-body");
const cardTitle = document.querySelector(".card-title");
const cardText = document.querySelector(".card-text");
let structVals;

const generateInfoDiv = (brand) => {
  structVals.forEach((el) => {
    if (el.brand == brand) {
      infoDiv.classList.remove("d-none");
      cardTitle.innerText = `Тачка ${el.brand} ${el.model}`;
      cardText.innerText = `Цена: ${el.price}$`;
    }
  });
};

const getData = async (path) => {
  try {
    return await fetch(path).then((response) => response.json());
  } catch (error) {
    console.error(`Achtung! ${error.message}`);
    throw new Error(error.message);
  }
};

getData("./cars.json").then((struct) => {
  structVals = struct["cars"];
  let emptyElement = document.createElement("option");
  emptyElement.value = "";
  emptyElement.text = "Выберите машину";
  formSelect.append(emptyElement);
  struct["cars"].forEach((carEl) => {
    let optionElement = document.createElement("option");
    optionElement.value = carEl.brand;
    optionElement.text = carEl.brand;
    formSelect.append(optionElement);
  });
});

formSelect.addEventListener("change", (e) => {
  generateInfoDiv(e.target.value);
});
