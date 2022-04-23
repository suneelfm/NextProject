import { Button, Grid, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import todoStyles from "../../styles/Todo.module.css";
import styles from "../../styles/Login.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TodoPage(props) {
  const [input, setinput] = useState("");
  const [message, setmessage] = useState("");
  const [todolist, settodolist] = useState({ data: [] });
  const [isModify, setisModify] = useState(false);
  const [modificationid, setmodificationid] = useState(null);
  const [toastMessage, settoastMessage] = useState({});

  const basicURL = "https://asmita-mern.herokuapp.com";
  const getToDoList = async () => {
    await axios
      .get(`https://asmita-mern.herokuapp.com/todo/get`)
      .then((response) => {
        settodolist(response);
      });
    //   .catch((err) =>
    //     toastMessage({ appearance: "error", message: `Error: ${err.message}` })
    //   );
  };

  useEffect(() => {
    getToDoList();
  }, []);

  const handleFrom = async (event) => {
    event.preventDefault();
    if (!isModify) {
      if (input.trim() !== "") {
        if (/^([a-zA-Z ]){1,250}$/.test(input)) {
          if (
            !todolist.data.some(
              (value) =>
                value.name !== undefined &&
                value.name.toUpperCase() === input.trim().toUpperCase()
            )
          ) {
            setmessage("");
            // setname([input.trim(), ...name]);
            let post = { name: input.trim() };
            await axios
              .post(`${basicURL}/todo/post`, post)
              .then((response) => {
                settoastMessage({
                  appearance: "success",
                  message: "Record has been saved succefully",
                });
                setTimeout(() => {
                  settoastMessage({});
                }, 2000);

                setinput("");
                getToDoList();
              })
              .catch((err) => {
                settoastMessage({
                  appearance: "error",
                  message: `Error: ${err}`,
                });
                setTimeout(() => {
                  settoastMessage({});
                }, 2000);
              });
          } else {
            setmessage("This ToDo is already exist.");
          }
        } else {
          setmessage("Please enter only alphabets with max. length 250.");
        }
      } else {
        setmessage("Please enter your ToDo.");
      }
    } else {
      if (input.trim() !== "") {
        if (/^([a-zA-Z ]){1,250}$/.test(input)) {
          let count = null;
          todolist.data.forEach((value, index) => {
            if (value.name !== undefined) {
              if (value.name.toUpperCase() === input.trim().toUpperCase()) {
                count = value._id;
              }
            }
          });
          if (count === null || count === modificationid) {
            await axios
              .post(`${basicURL}/todo/byid`, {
                _id: modificationid,
                name: input.trim(),
              })
              .then(() => {
                settoastMessage({
                  appearance: "success",
                  message: `Record has been updated succefully`,
                });
                setTimeout(() => {
                  settoastMessage({});
                }, 2000);
                setmessage("");
                setisModify(false);
                setinput("");
                getToDoList();
              })
              .catch((err) => {
                settoastMessage({
                  appearance: "error",
                  message: `Error: ${err}`,
                });
                setTimeout(() => {
                  settoastMessage({});
                }, 2000);
              });
          } else {
            setmessage("This ToDo is already exist.");
          }
        } else {
          setmessage("Please enter only alphabets with max. length 250.");
        }
      } else {
        setmessage("Please enter your ToDo.");
      }
    }
  };

  const deleteName = async (index) => {
    await axios
      .post(`${basicURL}/todo/delete`, { id: index })
      .then(() => {
        settoastMessage({
          appearance: "success",
          message: "Record has been deleted succefully",
        });
        setTimeout(() => {
          settoastMessage({});
        }, 2000);

        getToDoList();
      })
      .catch((err) => {
        settoastMessage({ appearance: "error", message: `Error: ${err}` });
        setTimeout(() => {
          settoastMessage({});
        }, 2000);
      });
  };

  const setForModification = (index, todo) => {
    setisModify(true);
    setinput(todo);
    setmodificationid(index);
  };
  return (
    <>
      <Grid container height={"calc(20px + 2vmin)"}>
        {toastMessage.appearance === "success" ? (
          <Grid className={todoStyles.success}>{toastMessage.message}</Grid>
        ) : toastMessage.appearance === "error" ? (
          <Grid className={todoStyles.error}>{toastMessage.message}</Grid>
        ) : (
          <></>
        )}
      </Grid>
      <form className={todoStyles.formcontainer} onSubmit={handleFrom}>
        <Grid container xs={12} style={{ overflow: "auto" }}>
          <Grid item xs={12} md={6}>
            <input
              tyle="text"
              value={input}
              onChange={(e) => setinput(e.target.value)}
              placeholder="Enter your task"
              className={styles.inputField}
            />
            <div className={styles.errorContainer}>{message}</div>
          </Grid>
          <Grid item xs={12} md={5} textAlign="center">
            <Button
              type="submit"
              name=""
              id=""
              variant="contained"
              className={todoStyles.button}
            >
              {isModify ? "Modify" : "Save"}
            </Button>
          </Grid>
        </Grid>
      </form>
      {todolist.data.length > 0 && (
        <form className={todoStyles.formcontainer}>
          <Grid
            container
            xs={12}
            style={{ overflow: "auto" }}
            justifyContent="center"
          >
            <Grid item xs={12} className={todoStyles.listHead}>
              Your Todo List
            </Grid>
            <Grid item xs={12} className={todoStyles.listArea}>
              {todolist.data.map((val, index) => (
                <Grid container key={index}>
                  <Grid item xs={6}>
                    <pre className={todoStyles.list}>{val.name}</pre>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Modify ToDo">
                      <FontAwesomeIcon
                        icon={faPen}
                        className={todoStyles.iconProp}
                        onClick={() => setForModification(val._id, val.name)}
                      />
                    </Tooltip>
                    <Tooltip title="Delete ToDo">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={todoStyles.iconProp}
                        onClick={() => deleteName(val._id)}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}

// TodoPage.getInitialProps = async function () {
//   debugger;
//   const res = await axios
//     .get(`https://asmita-mern.herokuapp.com/todo/get`)
//     .then((response) => {
//       return response;
//     });
//   const data = await res;
//   return {
//     data,
//   };
// };
