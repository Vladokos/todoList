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
      console.log(res);

    })
    .catch((err) => {
      console.log(err);
      
    });
});
