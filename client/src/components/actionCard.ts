import axios from "axios";

export const actionCard = () => {
  const userId: string | null = sessionStorage.getItem("userId");

  if (!userId) return window.location.replace("/login");

  const tasksHolder = (
    [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
  )[0];

  const tasks = [
    ...document.getElementsByClassName("task"),
  ] as HTMLDivElement[];

  for (let i = 0; i < tasks.length; i++) {
    tasks[i].children[0].addEventListener("change", (e) => {
      const status: boolean = (e.target as HTMLInputElement).checked;
      const children = tasksHolder.children;
      const id: number | null = Number(
        (e.target as HTMLHtmlElement).parentElement!.getAttribute("id")
      );
      if (status) {
        const maxId: string = children[children.length - 1].id;

        tasks[i].className += "completed";

        tasks[i].id = maxId;

        for (let j = id + 1; j < children.length; j++) {
          children[j].id = (Number(children[j].id) - 1).toString();
        }

        tasksHolder.appendChild(tasks[i]);
      } else {
        if (!tasks.every((e) => e.classList.contains("completed"))) {
          for (let j = id - 1; j >= 0; j--) {
            const id: number = Number(children[j].id);
            if (children[j].classList.contains("completed")) {
              children[j].id = (id + 1).toString();
            } else {
              tasks[i].id = (id + 1).toString();
              tasksHolder.insertBefore(tasks[i], children[j + 1]);
              break;
            }
          }
        } else {
          tasks[i].id = "0";

          for (let j = id - 1; j >= 0; j--) {
            const id: number = Number(children[j].id);
            children[j].id = (id + 1).toString();
          }

          tasksHolder.insertBefore(tasks[i], children[0]);
        }
        tasks[i].className = tasks[i].className.replace(/completed/g, "");
      }

      const sortedTasks: Array<any> = tasks.map((a) => {
        return { _id: a.className.split(" ")[0], order: a.id };
      });

      axios
        .post("/changeOrder", {
          userId,
          sortedTasks,
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
};
