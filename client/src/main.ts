const tasks = [...document.getElementsByClassName("task")] as Element[];

for (let i = 0; i < tasks.length; i++) {
  tasks[i].childNodes[1].addEventListener("change", (e) => {
    const status: boolean = (e.target as HTMLInputElement).checked;

    if (status) {
      tasks[i].className += "completed";
    } else {
      tasks[i].className = tasks[i].className.replace(/completed/g, "");
    }
  });
}
