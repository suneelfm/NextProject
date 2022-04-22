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
    if (userName.trim() === "" && password.trim() === "") {
      setError("Please enter your correct usename and password.");
    } else {
      const res = await signIn("credentials", {
        userName: userName,
        password: password,
        redirect: false,
      });
      if (res.ok) {
        router.push(router.query.callbackUrl || "/");
      } else {
        setError("Please check your credentials and try again.");
      }
    }
  };
  return (
    <Grid container className={styles.loginBody}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Grid container justifyContent={"center"}>
          <h1>Login</h1>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          className={styles.errorContainer}
        >
          {error}
        </Grid>
        <label className={styles.labels}>Username:</label>
        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
        >
          <input
            type={"text"}
            value={userName}
            placeholder="Enter your User Name"
            className={styles.inputField}
            onChange={(e) => setuserName(e.target.value)}
          />
        </Grid>
        <label className={styles.labels}>Password:</label>
        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
        >
          <input
            type={"password"}
            value={password}
            placeholder="Enter your Password"
            className={styles.inputField}
            onChange={(e) => setpassword(e.target.value)}
          />
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
