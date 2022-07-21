import axios from "axios";

const order = ([...document.getElementsByClassName("tasks")] as Element[])[0];

const form = [
  ...document.getElementsByClassName("task-create"),
] as HTMLFormElement[];

const input = form[0][0] as HTMLInputElement;
const button = form[0][1] as HTMLButtonElement;

button.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value.trim().length != 0) {
    axios
      .post("/addCard", {
        order: order.children.length,
        task: input.value,
      })
      .then((res) => {
        if (res.data.message === "Success") {
          const card = document.createElement("div");
          card.className = "task ";
          card.id = order.children.length.toString();

          card.innerHTML = ` <input type=\"checkbox\" /> <div> ${input.value.slice(
            0,
            16
          )} </div>`;

          order.appendChild(card);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
