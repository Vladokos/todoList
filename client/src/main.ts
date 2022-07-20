const tasksHolder = (
  [...document.getElementsByClassName("tasks")] as Element[]
)[0];
// const tasks = [...document.getElementsByClassName("task")] as Element[];
// const taskSorted = [...tasks] as Element[];

///way with one variable
const tasks = [...document.getElementsByClassName("task")].map((e) => {
  return e;
});

console.log(tasks);

///

for (let i = 0; i < tasks.length; i++) {
  tasks[i].childNodes[1].addEventListener("change", (e) => {
    const status: boolean = (e.target as HTMLInputElement).checked;

    if (status) {
      const maxId: string = tasks[tasks.length - 1].id;

      // const id: string = (e.target as HTMLInputElement).parentNode

      console.log((e.target as HTMLHtmlElement).parentElement);
      tasks[i].className += "completed";

      tasks[i].id = maxId;


      for (let j = i + 1; j < tasksHolder.children.length; j++) {
        tasksHolder.children[j].id = (Number(tasks[j].id) - 1).toString();
      }

      tasksHolder.appendChild(tasks[i]);

      // console.log(tasks);
    } else {
      // console.log(tasksHolder.children);
      // for (let j = tasksHolder.children.length - 1; j >= 0; j--) {
      //   const id: number = Number(tasksHolder.children[j].id);
      //   if (tasksHolder.children[j].classList.contains("completed")) {
      //     tasksHolder.children[j].id = (id + 1).toString();
      //   } else {
      //     tasks[i].id = (id + 1).toString();
      //     tasksHolder.insertBefore(tasks[i], tasksHolder.children[j + 1]);
      //     break;
      //   }
      // }
      // tasks[i].className = tasks[i].className.replace(/completed/g, "");
    }
  });
}

// for (let i = 0; i < tasks.length; i++) {
//   tasks[i].childNodes[1].addEventListener("change", (e) => {
//     const status: boolean = (e.target as HTMLInputElement).checked;

//     if (status) {
//       const id: number = Number(tasks[i].id);

//       tasks[i].className += "completed";

//       tasks[i].id = taskSorted[taskSorted.length - 1].id;

//       for (let j = id + 1; j < tasks.length; j++) {
//         console.log(taskSorted[j]);
//         taskSorted[j].id = (Number(taskSorted[j].id) - 1).toString();
//       }

//       taskSorted.sort((a, b) => {
//         if (a.id < b.id) {
//           return -1;
//         } else {
//           return 1;
//         }
//       });

//       // tasksHolder.removeChild(taskSorted[taskSorted.length - 1]);
//       tasksHolder.appendChild(taskSorted[taskSorted.length - 1]);

//       // taskSorted.sort((a, b) => {
//       //   if (a.id < b.id) {
//       //     return -1;
//       //   } else {
//       //     return 1;
//       //   }
//       // });
//     } else {
//       for (let j = taskSorted.length - 1; j >= 0; j--) {
//         if (!taskSorted[j].classList.contains("completed")) {
//           tasks[i].id = (Number(taskSorted[j].id) + 1).toString();
//           tasksHolder.insertBefore(tasks[i], taskSorted[j + 1]);

//           break;
//         }
//       }

//       tasks[i].className = tasks[i].className.replace(/completed/g, "");

//       // for (let j = taskSorted.length - 1; j >= 0; j--) {
//       //   if (taskSorted[j].classList.contains("completed")) {
//       //     taskSorted[j].id = (Number(taskSorted[j].id) + 1).toString();
//       //   }
//       // }
//     }
//   });
// }
