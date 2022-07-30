import axios from "axios";

export const additionalCard = () => {
  const task = [...document.getElementsByClassName("task")] as HTMLDivElement[];

  for (let i = 0; i < task.length; i++) {
    // card (open additional menu)
    task[i].addEventListener("click", (e) => {
      if (e.target === task[i].children[0]) return;

      task[i].children[2].className += " active";
    });

    // the close button
    task[i].children[2].children[0].children[0].addEventListener(
      "click",
      (e) => {
        task[i].children[2].className = "task__inner";

        e.stopPropagation();
      }
    );

    // the delete button
    task[i].children[2].children[0].children[1].addEventListener(
      "click",
      () => {
        axios
          .post("/removeCard", {
            order: task[i].id,
          })
          .then((res) => {
            if (res.data.message === "Success") {
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
          order: task[i].id,
          task: textArea.value,
        })
        .then((res) => {
          if (res.data.message === "Success") {
            const text: string = textArea.value;

            const titleCard = task[i].children[1] as HTMLDivElement;

            titleCard.innerText = `${text.slice(0, 16)}`;

            textArea.value = text;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
};
