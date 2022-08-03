import { requestCards } from "./components/requestCards";
import { actionCard } from "./components/actionCard";
import { addCard } from "./components/addCard";
import { additionalCard } from "./components/additionalCard";
import { clearListener } from "./components/clearListener";

requestCards();

const tasks = (
  [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
)[0];

addCard();

tasks.addEventListener("DOMNodeInserted", () => {

  // clearListener();
  console.log('a');



  actionCard();
  additionalCard();

});
