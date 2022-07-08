import axios from "axios";

const login = document.getElementById("username") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

const button = document.getElementById("login") as HTMLButtonElement;

button.addEventListener("click", () => {
  axios
    .post("/login", {
      login,
      password,
    })
    .then((res) => {
      console.log(res);
    }).catch((err) => {
        console.log(err);
    });
});
