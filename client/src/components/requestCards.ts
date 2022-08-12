import axios from "axios";

export const requestCards = (newListeners: Function) => {
  document.addEventListener("DOMContentLoaded", () => {
    const userId: string | null = sessionStorage.getItem("userId");

    const tasks = (
      [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
    )[0];

    axios
      .get(`/getCards/${userId}`)
      .then((res) => {
        if (res.data.message === "Success") {
          const cards: Array<any> = res.data.cards;

          cards.sort((a, b) => {
            if (a.order > b.order) {
              return 1;
            } else {
              return -1;
            }
          });
          for (let i = 0; i < cards.length; i++) {
            tasks.innerHTML += `
            <div class="${cards[i]._id} task " id=${cards[i].order}>
             <input type="checkbox" /> 
             <div> ${cards[i].task.slice(0, 16)} </div>
              <div class="task__inner">
                <div class="actions">
                 <img src="./img/close.png" alt="close" id="close"/>
                 <img src="./img/delete.png" alt="delete" id="delete" />
                </div>
                <textarea cols="30" rows="10">${cards[i].task}</textarea>
                <button id="apply">apply</button>
              </div> 
              <div></div>
            </div>`;
          }

          newListeners();
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  });
};
