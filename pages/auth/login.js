import { Button, Grid } from "@mui/material";
import styles from "../../styles/Login.module.css";

export default function Login() {
  return (
    <Grid container className={styles.loginBody}>
      <form className={styles.loginForm}>
        <Grid container justifyContent={"center"}>
          <h1>Login</h1>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          className={styles.filedContainer}
        >
          <input type={"text"} className={styles.inputField} />
        </Grid>
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
        >
          <Button className={styles.inputField} variant="contained">Login</Button>
        </Grid>
      </form>
    </Grid>
  );
}
