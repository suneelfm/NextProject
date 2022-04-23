import axios from "axios";
import React, { useEffect } from "react";
import TodoPage from "../../components/todo/todoPage";

export default function Todo(props) {
  return <TodoPage data={props} />;
}

export async function getServerSideProps() {
  const res = await axios.get(`https://asmita-mern.herokuapp.com/todo/get`);
  const data = res.data;
  return {
    props: { data }, // will be passed to the page component as props
  };
}
