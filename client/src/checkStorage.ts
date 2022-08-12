import axios from "axios";

export const checkStorage = () => {
  const userId: string | null = sessionStorage.getItem("userId");

  if (userId) {
    axios
      .post("/checkUser", { userId })
      .then((res) => {
        if (
          res.data.message === "Success" &&
          window.location.pathname !== "/main"
        ) {
          window.location.replace("/main");
        }
      })
      .catch((error) => {
        sessionStorage.clear();

        window.location.replace("/register");
      });
  }
};
