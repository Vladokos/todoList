export const clearListener = () => {

  const tasks = (
    [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
  )[0];

  const clone = tasks.cloneNode(true);

  tasks.parentNode?.replaceChild(clone, tasks);
};
