import axios from "axios";

export const additionalCard = () => {
  const userId: string | null = sessionStorage.getItem("userId");

  const task = [...document.getElementsByClassName("task")] as HTMLDivElement[];

  for (let i = 0; i < task.length; i++) {
    const cardId: string = task[i].className.split(" ")[0];

    // card (open additional menu)
    task[i].addEventListener("click", (e) => {
      if (e.target === task[i].children[0]) return;

      //support for firefox
      task[i].parentElement!.style.overflowY = "hidden";

      //background
      if (e.target === task[i].children[3]) {
        task[i].children[3].className = " ";

        task[i].parentElement!.style.overflowY = "auto";

        return (task[i].children[2].className = "task__inner");
      }

      task[i].children[2].className += " active";
      task[i].children[3].className = "background";
    });

    // the close button
    task[i].children[2].children[0].children[0].addEventListener(
      "click",
      (e) => {
        task[i].children[2].className = "task__inner";
        task[i].children[3].className = " ";

        task[i].parentElement!.style.overflowY = "auto";

        e.stopPropagation();
      }
    );

    // the delete button
    task[i].children[2].children[0].children[1].addEventListener(
      "click",
      (e) => {
        e.preventDefault();

        axios
          .post("/removeCard", {
            userId,
            cardId,
          })
          .then((res) => {
            if (res.data.message === "Success") {
              task[i].parentElement!.style.overflowY = "auto";

              task[i].parentElement?.removeChild(task[i]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );

    // the apply button
    task[i].children[2].children[2].addEventListener("click", (e) => {
      e.preventDefault();

      const textArea = task[i].children[2].children[1] as HTMLTextAreaElement;

      axios
        .post("/changeCard", {
          cardId,
          task: textArea.value,
        })
        .then((res) => {
          if (res.data.message === "Success") {
            const text: string = textArea.value;

            const titleCard = task[i].children[1] as HTMLDivElement;

            titleCard.innerText = `${text.slice(0, 16)}`;

            textArea.value = text;

            task[i].children[3].className = "background";
            task[i].children[2].className = "task__inner";

            task[i].parentElement!.style.overflowY = "auto";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
};
