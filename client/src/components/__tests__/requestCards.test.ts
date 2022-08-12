import axios from "axios";
import { requestCards } from "../requestCards";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test requestCards", () => {
  let response: object;
  let tasks: HTMLDivElement;

  const cards: Array<object> = [
    {
      _id: "62f1772c29694ad7b37d2766",
      order: 0,
      task: "test",
      status: false,
      userId: "62cc68ae3755492ad0f2a84e",
    },
    {
      _id: "62f2e95fb61eb7d53fb273c6",
      order: 1,
      task: "test2",
      status: false,
      userId: "62cc68ae3755492ad0f2a84e",
    },
  ];

  beforeEach(() => {
    mockedAxios.get.mockClear();

    sessionStorage.setItem("userId", "1");

    response = {
      data: { message: "Success", cards },
    };

    document.body.innerHTML = '<div class="tasks"> </div>';

    tasks = (
      [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
    )[0];
  });

  it("Should add two cards", async () => {
    mockedAxios.get.mockResolvedValueOnce(response);

    const parent: HTMLDivElement = document.createElement("div");

    requestCards(() => {});

    await Promise.resolve(
      document.dispatchEvent(new Event("DOMContentLoaded"))
    );

    createExpecting(cards, parent);

    expect(mockedAxios.get).toBeCalledTimes(1);

    expect(tasks).toBeDefined();

    expect(tasks.innerHTML.replace(/ /g, "")).toBe(
      parent.innerHTML.replace(/ /g, "")
    );
  });
});
const createExpecting = (response: Array<any>, parent: HTMLDivElement) => {
  for (let i = 0; i < response.length; i++) {
    parent.innerHTML += `
    <div class="${response[i]._id} task " id=${response[i].order}>
     <input type="checkbox" /> 
     <div> ${response[i].task.slice(0, 16)} </div>
      <div class="task__inner">
        <div class="actions">
         <img src="./img/close.png" alt="close" id="close"/>
         <img src="./img/delete.png" alt="delete" id="delete" />
        </div>
        <textarea cols="30" rows="10">${response[i].task}</textarea>
        <button id="apply">apply</button>
      </div> 
      <div></div>
    </div>`;
  }
};
