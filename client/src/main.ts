const tasksHolder = (
  [...document.getElementsByClassName("tasks")] as Element[]
)[0];
const tasks = [...document.getElementsByClassName("task")] as Element[];
const taskSorted = [...tasks] as Element[];

///way with one variable
// const t: Record<string, Element> = {};
//  [...document.getElementsByClassName("task")].map((e) => {
//   const id: string = e.id;

//   t[id] = e;
// });

// console.log(t);
///

for (let i = 0; i < tasks.length; i++) {
  tasks[i].childNodes[1].addEventListener("change", (e) => {
    const status: boolean = (e.target as HTMLInputElement).checked;

    if (status) {
      const id: number = Number(tasks[i].id);
      // console.log(id);
      tasks[i].className += "completed";

      // console.log(tasks);

      tasks[i].id = taskSorted[taskSorted.length - 1].id;

      for (let j = id + 1; j < tasks.length; j++) {
        taskSorted[j].id = (Number(taskSorted[j].id) - 1).toString();
      }

      taskSorted.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else {
          return 1;
        }
      });

      // console.log(taskSorted);

      tasksHolder.removeChild(taskSorted[taskSorted.length - 1]);
      tasksHolder.appendChild(taskSorted[taskSorted.length - 1]);
    } else {
      console.log(taskSorted);

      for (let j = taskSorted.length - 1; j >= 0; j--) {
        if (!taskSorted[j].classList.contains("completed")) {
          tasks[i].id = (Number(taskSorted[j].id) + 1).toString();
          tasksHolder.insertBefore(tasks[i], taskSorted[j + 1]);

          break;
        }
      }

      tasks[i].className = tasks[i].className.replace(/completed/g, "");

      // for (let j = taskSorted.length - 1; j >= 0; j--) {
      //   if (taskSorted[j].classList.contains("completed")) {
      //     taskSorted[j].id = (Number(taskSorted[j].id) + 1).toString();
      //   }
      // }
    }
  });
}
