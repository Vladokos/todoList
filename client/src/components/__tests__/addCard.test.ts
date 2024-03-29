import axios from "axios";
import { addCard } from "../addCard";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("adding cards", () => {
  let response: object;
  let order: HTMLDivElement;
  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    mockedAxios.post.mockClear();

    sessionStorage.setItem('userId', '1');


    // start body
    document.body.innerHTML =
      "<section>" +
      '<div class="tasks"> </div>' +
      '<form class="task-create">' +
      '<input id="task-text" type="text" />' +
      '<button id="add">Add</button> ' +
      "</form>" +
      "</section>";

    response = {
      data: { message: "Success", id: 10 },
    };

    order = (
      [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
    )[0];
    input = document.getElementById("task-text") as HTMLInputElement;
    button = document.getElementById("add") as HTMLButtonElement;
  });

  it("Should add one card", async () => {
    mockedAxios.post.mockResolvedValueOnce(response);

    const expecting: HTMLDivElement = document.createElement("div");

    addCard(() => {});

    await createExpecting(10, input, button, expecting, 1, ["321"]);

    expect(mockedAxios.post).toBeCalledTimes(1);

    expect(order).toBeDefined();

    // compare cards with deleting white space
    expect(order.innerHTML.replace(/ /g, "")).toBe(
      expecting.innerHTML.replace(/ /g, "")
    );
  });
  it("Should add two cards", async () => {
    mockedAxios.post.mockResolvedValue(response);

    const expecting: HTMLDivElement = document.createElement("div");

    addCard(() => {});

    await createExpecting(10, input, button, expecting, 2, ["321", "123"]);

    expect(mockedAxios.post).toBeCalledTimes(2);

    expect(order).toBeDefined();

    expect(order.innerHTML.replace(/ /g, "")).toBe(
      expecting.innerHTML.replace(/ /g, "")
    );
  });
  it("Should add three cards", async () => {
    mockedAxios.post.mockResolvedValue(response);

    const expecting: HTMLDivElement = document.createElement("div");

    addCard(() => {});

    await createExpecting(10, input, button, expecting, 3, [
      "321",
      "123",
      "asdasdasasdasdasdasd",
    ]);

    expect(mockedAxios.post).toBeCalledTimes(3);

    expect(order).toBeDefined();

    expect(order.innerHTML.replace(/ /g, "")).toBe(
      expecting.innerHTML.replace(/ /g, "")
    );
  });
  it("Should add zero cards", async () => {
    mockedAxios.post.mockResolvedValue(response);

    const expecting: HTMLDivElement = document.createElement("div");

    addCard(() => {});

    await createExpecting(10, input, button, expecting, 0, []);

    expect(mockedAxios.post).toBeCalledTimes(0);

    expect(order).toBeDefined();

    expect(order.innerHTML.replace(/ /g, "")).toBe(
      expecting.innerHTML.replace(/ /g, "")
    );
  });
});
// create card and imitate click on the button
const createExpecting = async (
  id: number,
  input: HTMLInputElement,
  button: HTMLButtonElement,
  parent: HTMLElement,
  amount: number,
  text: string[]
) => {
  if ((amount || amount === 0) && text) {
    for (let i = 0; i < amount; i++) {
      input.value = text[i];

      const slicedText: string = text[i].slice(0, 16);

      parent.innerHTML += `<div class="${id} task " id="${i}"> <input type="checkbox" /> <div> ${slicedText} </div> 
          <div class="task__inner">
             <div class="actions">
              <img src="./img/close.png" alt="close" id="close"/>
              <img src="./img/delete.png" alt="delete" id="delete" />
             </div>
             <textarea cols="30" rows="10">${text[i]}</textarea>
             <button id="apply">apply</button>
          </div>
        <div></div></div>`;
        
      await Promise.resolve(button.click());
    }
  }
};
