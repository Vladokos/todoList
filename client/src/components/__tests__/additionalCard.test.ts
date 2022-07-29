import axios from "axios";
import { additionalCard } from "../additionalCard";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test addition functions", () => {
  let response: object;

  beforeEach(() => {
    response = {
      data: { message: "Success" },
    };

    document.body.innerHTML = '<div class="tasks"> </div>';
  });
  it("Should add to one card class 'active' ", () => {
    addCard(1);

    additionalCard();

    const card = (
      [...document.getElementsByClassName("task")] as HTMLDivElement[]
    )[0];

    card.click();

    expect(card).toBeDefined();
    expect(card.children[2].className).toEqual("task__inner active");
  });
  it("Should add and remove class 'active'", () => {
    addCard(1);

    additionalCard();

    const card = (
      [...document.getElementsByClassName("task")] as HTMLDivElement[]
    )[0];
    const closeButton = card.children[2].children[0]
      .children[0] as HTMLImageElement;

    card.click();

    expect(card).toBeDefined();
    expect(card.children[2].className).toEqual("task__inner active");

    closeButton.click();

    expect(card).toBeDefined();
    expect(card.children[2].className).toEqual("task__inner");
  });
  it("Should delete the card", async () => {
    mockedAxios.post.mockResolvedValueOnce(response);

    addCard(1);

    const tasks = (
      [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
    )[0];
    const card = (
      [...document.getElementsByClassName("task")] as HTMLDivElement[]
    )[0];
    const deleteButton = card.children[2].children[0]
      .children[1] as HTMLImageElement;

    additionalCard();

    expect(tasks.children[0]).toBeDefined();

    await Promise.resolve(deleteButton.click());

    expect(mockedAxios.post).toBeCalledTimes(1);

    expect(tasks.children[0]).not.toBeDefined();
  });
  it("Should change the card", async () => {
    mockedAxios.post.mockResolvedValueOnce(response);

    addCard(1);

    const card = (
      [...document.getElementsByClassName("task")] as HTMLDivElement[]
    )[0];
    const titleCard = card.children[1] as HTMLDivElement;
    const textArea = card.children[2].children[1] as HTMLTextAreaElement;
    const applyButton = card.children[2].children[2] as HTMLButtonElement;

    textArea.value = "New values and some more text";

    const expectTitle = textArea.value.slice(0, 16);

    additionalCard();

    await Promise.resolve(applyButton.click());

    expect(mockedAxios.post).toBeCalledTimes(1);

    expect(titleCard.innerText).toEqual(expectTitle);
    expect(textArea.value).toEqual("New values and some more text");
  });
});

const addCard = async (amount: number) => {
  if (amount) {
    const tasksHolder = (
      [...document.getElementsByClassName("tasks")] as HTMLDivElement[]
    )[0];
    for (let i = 0; i < amount; i++) {
      tasksHolder.innerHTML += `<div class="task " id="${i}">
        <input type="checkbox" />
        <div>
            change text
        </div>
        <div class="task__inner">
          <div class="actions">
            <img src="./img/close.png" alt="close" id="close"/>
            <img src="./img/delete.png" alt="delete" id="delete" />
          </div>
          <textarea cols="30" rows="10"></textarea>
          <button id="apply">apply</button>
        </div>
      </div>`;
    }
  }
};
