import { requestCards } from "./components/requestCards";
import { actionCard } from "./components/actionCard";
import { addCard } from "./components/addCard";
import { additionalCard } from "./components/additionalCard";
import { checkStorage } from "./checkStorage";

import "../styles/reset.css";
import "../styles/main.css";

import "../img/close.png";
import "../img/delete.png";

checkStorage();

const newListeners = (): void => {
  actionCard();
  additionalCard();
};

requestCards(newListeners);

addCard(newListeners);
