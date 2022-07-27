import axios from "axios";
import { addCard } from "../addCard";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("adding cards", () => {
  let response: object;

  beforeEach(() => {
    response = {
      data: { message: "Success"},
    };
  });

  it("Should add one card", () => {
    mockedAxios.post.mockResolvedValueOnce(response);

    document.body.innerHTML =
      '<div class="tasks"> </div>' +
      '<form class="task-create">' +
      '<input id="task-text" type="text" />' +
      '<button id="add">Add</button> ' +
      "</form>";

    const order = (
      [...document.getElementsByClassName("tasks")] as Element[]
    )[0];
    const input = document.getElementById("task-text") as HTMLInputElement;
    const button = document.getElementById("add") as HTMLButtonElement;

    input.value = "321";

    const expecting: HTMLDivElement = document.createElement("div");
    expecting.innerHTML =
      '<div class="task " id="0">' +
      `<input type="checkbox" /> <div> ${input.value.slice(0, 16)} </div> 
          <div class="task__inner">
          <div class="actions">
            <img src="./img/close.png" alt="close" id="close"/>
            <img src="./img/delete.png" alt="delete" id="delete" />
           </div>
           <textarea cols="30" rows="10">${input.value}</textarea>
            <button id="apply">apply</button>
          </div>` +
      "</div>";
    addCard(order);

    button.click();

    expect(mockedAxios.post).toBeCalledTimes(1);

    console.log(order.innerHTML);

    // expect(tasks).toBeDefined();

    // expect(tasks.innerHTML.replace(/ /g, "")).toBe(
    //   expecting.innerHTML.replace(/ /g, "")
    // );
  });
});
