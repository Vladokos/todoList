import axios from "axios";

export const checkStorage = () => {
  const userId: string | null = sessionStorage.getItem("userId");

  const pathLink: string = window.location.pathname;

  if (userId) {
    axios
      .post("/checkUser", { userId })
      .then((res) => {
        if (res.data.message === "Success" && pathLink !== "/main") {
          window.location.replace("/main");
        }
      })
      .catch((error) => {
        sessionStorage.clear();

        if (pathLink !== "/main") window.location.replace(pathLink);

        window.location.replace("/register");
      });
  } else if (pathLink !== "/register" && pathLink !== "/login") {
    window.location.replace("/register");
  }
};
