import axios from "axios";

const task = [...document.getElementsByClassName("task")] as Element[];

console.log(task[0].children)


for (let i = 0; i < task.length; i++) {
  task[i].addEventListener("click", () => {
    task[i].children[2].className += " active";
  });

  // the close button
  task[i].children[2].children[0].children[0].addEventListener("click", (e) => {
    task[i].children[2].className = "task__inner";

    e.stopPropagation();
  });

  // the delete button
  task[i].children[2].children[0].children[1].addEventListener("click", () => {
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
  });

  // the apply button
  task[i].children[2].children[2].addEventListener("click", (e) => {
    e.preventDefault();

    const textArea = task[0].children[2].children[1] as HTMLTextAreaElement;

    axios
      .post("/changeCard", {
        order: task[i].id,
        task: textArea.value,
      })
      .then((res) => {
        if (res.data.message === "Success") {
          const text: string = textArea.value;

          const titleCard = task[0].children[1] as HTMLDivElement;

          titleCard.innerText = `${text.slice(0, 16)}`;

          textArea.value = text;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
