import axios from "axios";
import { checkStorage } from "./checkStorage";

import "../styles/reset.css";
import "../styles/reg.css";

checkStorage();

const login = document.getElementById("username") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

const button = document.getElementById("reg") as HTMLButtonElement;

button.addEventListener("click", (e) => {
  e.preventDefault();

  axios
    .post("/reg", {
      login: login.value,
      password: password.value,
    })
    .then((res) => {
      if (res.data.message === "Success") {
        sessionStorage.setItem("userId", res.data.id);

        window.location.replace("/main");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
