import axios from "axios";
import { actionCard } from "../actionCard";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Test sorting cards", () => {
  let response: object;
  let tasks: HTMLDivElement;

  beforeEach(() => {
    mockedAxios.post.mockClear();

    sessionStorage.setItem("userId", "1");

    document.body.innerHTML = "";
    document.body.innerHTML += `<div class="tasks">
    <div class="1 task " id="0">
    <input type="checkbox" /> 
    <div> some text </div>
     <div class="task__inner">
       <div class="actions">
        <img src="./img/close.png" alt="close" id="close"/>
        <img src="./img/delete.png" alt="delete" id="delete" />
       </div>
       <textarea cols="30" rows="10"></textarea>
       <button id="apply">apply</button>
     </div> 
     <div></div>
   </div>
   <div class="2 task " id="1">
   <input type="checkbox" /> 
   <div>  some text </div>
    <div class="task__inner">
      <div class="actions">
       <img src="./img/close.png" alt="close" id="close"/>
       <img src="./img/delete.png" alt="delete" id="delete" />
      </div>
      <textarea cols="30" rows="10"></textarea>
      <button id="apply">apply</button>
    </div> 
    <div></div>
  </div>
  <div class="3 task " id="2">
  <input type="checkbox" /> 
  <div>  some text </div>
   <div class="task__inner">
     <div class="actions">
      <img src="./img/close.png" alt="close" id="close"/>
      <img src="./img/delete.png" alt="delete" id="delete" />
     </div>
     <textarea cols="30" rows="10"></textarea>
     <button id="apply">apply</button>
   </div> 
   <div></div>
 </div>
</div>`;

    tasks = (
      [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
    )[0];

    response = {
      data: { message: "Success" },
    };
  });

  it("Should change pos of  first card", async () => {
    mockedAxios.post.mockResolvedValueOnce(response);

    const task = (
      [...document.getElementsByClassName("task")] as HTMLDivElement[]
    )[0];
    (task.children[0] as HTMLInputElement).checked = true;

    const parent: HTMLDivElement = document.createElement("div");

    actionCard();

    createExpecting([2, 3, 1], parent, [1]);

    await Promise.resolve(task.children[0].dispatchEvent(new Event("change")));

    expect(tasks.innerHTML.replace(/\s/g, "")).toBe(
      parent.innerHTML.replace(/\s/g, "")
    );

    expect(mockedAxios.post).toBeCalledTimes(1);
  });
  it("Should change pos of  second card", async () => {
    mockedAxios.post.mockResolvedValueOnce(response);

    const task = (
      [...document.getElementsByClassName("task")] as HTMLDivElement[]
    )[1];
    (task.children[0] as HTMLInputElement).checked = true;

    const parent: HTMLDivElement = document.createElement("div");

    actionCard();

    createExpecting([1, 3, 2], parent, [2]);

    await Promise.resolve(task.children[0].dispatchEvent(new Event("change")));

    expect(tasks.innerHTML.replace(/\s/g, "")).toBe(
      parent.innerHTML.replace(/\s/g, "")
    );

    expect(mockedAxios.post).toBeCalledTimes(1);
  });
  it("Should change state of third card", async () => {
    mockedAxios.post.mockResolvedValueOnce(response);

    const task = (
      [...document.getElementsByClassName("task")] as HTMLDivElement[]
    )[2];
    (task.children[0] as HTMLInputElement).checked = true;

    const parent: HTMLDivElement = document.createElement("div");

    actionCard();

    createExpecting([1, 2, 3], parent, [3]);

    await Promise.resolve(task.children[0].dispatchEvent(new Event("change")));

    expect(tasks.innerHTML.replace(/\s/g, "")).toBe(
      parent.innerHTML.replace(/\s/g, "")
    );

    expect(mockedAxios.post).toBeCalledTimes(1);
  });
  it("Should add change pos first and second card", async () => {
    mockedAxios.post.mockResolvedValue(response);

    const task = [
      ...document.getElementsByClassName("task"),
    ] as HTMLDivElement[];
    (task[0].children[0] as HTMLInputElement).checked = true;
    (task[1].children[0] as HTMLInputElement).checked = true;

    const parent: HTMLDivElement = document.createElement("div");

    actionCard();

    createExpecting([3, 1, 2], parent, [1, 2]);

    await Promise.resolve(
      task[0].children[0].dispatchEvent(new Event("change"))
    );
    await Promise.resolve(
      task[1].children[0].dispatchEvent(new Event("change"))
    );

    expect(tasks.innerHTML.replace(/\s/g, "")).toBe(
      parent.innerHTML.replace(/\s/g, "")
    );

    expect(mockedAxios.post).toBeCalledTimes(2);
  });
  it("Should a two cards be active and then one card back to initial state", async () => {
    mockedAxios.post.mockResolvedValue(response);

    const task = [
      ...document.getElementsByClassName("task"),
    ] as HTMLDivElement[];
    (task[0].children[0] as HTMLInputElement).checked = true;
    (task[1].children[0] as HTMLInputElement).checked = true;

    const parent: HTMLDivElement = document.createElement("div");

    actionCard();

    createExpecting([3, 2, 1], parent, [1]);

    await Promise.resolve(
      task[0].children[0].dispatchEvent(new Event("change"))
    );
    await Promise.resolve(
      task[1].children[0].dispatchEvent(new Event("change"))
    );
    (task[1].children[0] as HTMLInputElement).checked = false;
    await Promise.resolve(
      task[1].children[0].dispatchEvent(new Event("change"))
    );

    expect(tasks.innerHTML.replace(/\s/g, "")).toBe(
      parent.innerHTML.replace(/\s/g, "")
    );

    expect(mockedAxios.post).toBeCalledTimes(3);
  });
});

const createExpecting = (
  idTask: Array<number>,
  parent: HTMLDivElement,
  completed: Array<number>
) => {
  if (!idTask || !parent) return;

  for (let i = 0; i < idTask.length; i++) {
    parent.innerHTML += `
    <div class="${idTask[i]} task ${
      completed.find((a) => a === idTask[i]) ? "completed" : ""
    } " id="${i}">
    <input type="checkbox" /> 
    <div>  some text </div>
    <div class="task__inner">
      <div class="actions">
       <img src="./img/close.png" alt="close" id="close"/>
       <img src="./img/delete.png" alt="delete" id="delete" />
      </div>
      <textarea cols="30" rows="10"></textarea>
      <button id="apply">apply</button>
    </div> 
    <div></div>
  </div>`;
  }
};
