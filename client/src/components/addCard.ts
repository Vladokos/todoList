import axios from "axios";

export const addCard = () => {
  const tasks = (
    [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
  )[0];

  const form = [
    ...document.getElementsByClassName("task-create"),
  ] as HTMLFormElement[];

  const input = form[0].children[0] as HTMLInputElement;
  const button = form[0].children[1] as HTMLButtonElement;

  button.addEventListener("click", (e) => {
    e.preventDefault();

    if (input.value.trim().length != 0) {
      const userId = sessionStorage.getItem("userId");

      axios
        .post("/addCard", {
          task: input.value,
          userId,
        })
        .then((res) => {
          if (res.data.message === "Success") {
            const idCard: string = res.data.id;

            const text: string = input.value;

            const card: HTMLElement = document.createElement("div");
            card.className = `${idCard} task `;
            card.id = tasks.children.length.toString(); //order

            card.innerHTML = `<input type="checkbox" /> <div> ${text.slice(
              0,
              16
            )} </div> 
          <div class="task__inner">
          <div class="actions">
            <img src="./img/close.png" alt="close" id="close"/>
            <img src="./img/delete.png" alt="delete" id="delete" />
           </div>
           <textarea cols="30" rows="10">${text}</textarea>
            <button id="apply">apply</button>
          </div>`;

            tasks.appendChild(card);

            const clone = tasks.cloneNode(true);

            tasks.parentNode?.replaceChild(clone, tasks);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
