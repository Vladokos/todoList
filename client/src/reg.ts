import axios from "axios";

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
        sessionStorage.setItem("Username", login.value);

        window.location.replace("/main");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
