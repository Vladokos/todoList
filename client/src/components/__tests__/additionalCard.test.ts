import axios from "axios";
import { additionalCard } from "../additionalCard";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test addition functions", () => {
  beforeEach(() => {
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
