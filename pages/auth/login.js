import { Button, Grid } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    const res = await signIn("Credentials", {
      userName: userName,
      password: password,
      redirect: false,
    });
    debugger;
    if (res.ok) {
      router.push(router.query.callbackUrl || "/");
    } else {
      setError("Please check your credentials and try again");
    }
  };
  return (
    <Grid container className={styles.loginBody}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        {error !== "" && (
          <Grid
            container
            justifyContent={"center"}
            className={styles.errorContainer}
          >
            {error}
          </Grid>
        )}
        <Grid container justifyContent={"center"}>
          <h1>Login</h1>
        </Grid>
        <label className={styles.labels}>Username:</label>
        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
        >
          <input type={"text"} className={styles.inputField} />
        </Grid>
        <label className={styles.labels}>Password:</label>
        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
        >
          <input type={"password"} className={styles.inputField} />
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
          mt={"calc(5px + 2vmin)"}
        >
          <Button
            type="submit"
            className={styles.inputField}
            variant="contained"
          >
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
