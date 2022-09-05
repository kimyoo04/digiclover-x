const cardsWrap = document.querySelector(".cards");

const card = document.createElement("div");
card.className = "card";
const cardCompany = document.createElement("div");
cardCompany.className = "card__company";
const cardName = document.createElement("div");
cardName.className = "card__name";
const cardPhone = document.createElement("div");
cardPhone.className = "card__phone";
const cardEmail = document.createElement("div");
cardEmail.className = "card__email";

card.appendChild(cardCompany);
card.appendChild(cardName);
card.appendChild(cardPhone);
card.appendChild(cardEmail);
cardsWrap.appendChild(card);
