import axios from "axios";
import React, { useEffect } from "react";
import TodoPage from "../../components/todo/todoPage";

export default function Todo(props) {
  useEffect(() => {
    console.log(props);
  }, []);

  return <TodoPage data={props} />;
}

// export async function getStaticProps() {
//   const res = await axios.get(`https://asmita-mern.herokuapp.com/todo/get`);
//   const data = res.data;
//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

export async function getServerSideProps() {
  const res = await axios.get(`https://asmita-mern.herokuapp.com/todo/get`);
  const data = res.data;
  return {
    props: { data }, // will be passed to the page component as props
  };
}
