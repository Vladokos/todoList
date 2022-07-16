const tasks = [...document.getElementsByClassName("task")] as Element[];

for (let i = 0; i < tasks.length; i++) {
  tasks[i].childNodes[1].addEventListener("change", (e) => {
    const status: boolean = (e.target as HTMLInputElement).checked;

    const card = e.composedPath()[1] as HTMLDivElement;

    if (status) {
      tasks[i].className += "completed";
      console.log(i);
      for (let j = i - 1; j >= 0; j--) {
        console.log(tasks[j]);    
      }

    } else {
      tasks[i].className = tasks[i].className.replace(/completed/g, "");
    }
  });
}
