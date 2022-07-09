import axios from "axios";

const login = document.getElementById("username") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

const button = document.getElementById("reg") as HTMLButtonElement;

button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(button);
  // axios
  //   .post("/login", {
  //     login,
  //     password,
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   }).catch((err) => {
  //       console.log(err);
  //   });
});
