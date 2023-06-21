import React, { useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import axios from "axios";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setName, setAlert, setIsEditing, setList, setEditID } from "../features/todolist/todolistSlice";

const App = () => {
const { name, list, isEditing, alert, editID } = useSelector((state) => state.todolist )
  const dispatch = useDispatch()

console.log("your data: " + name + " " + list)
useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    saveList();
  }, [list]);

  const getList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/list");
      dispatch(setList(response.data));
      console.log(response.data)
    } catch (error) {
      console.log("Error fetching list:", error);
    }
  };

  const saveList = async () => {
    console.log(list)

    try {
      await axios.post("http://localhost:4000/list", list );
    console.log(list)
    } catch (error) {
      console.log("Error saving list:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please enter a value", "danger");
    } else if (name && isEditing) {
      dispatch(setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      ));
      showAlert(true, "Item changed", "success");
    } else {
      showAlert(true, "Item added", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      dispatch(setList([...list, newItem]));
    }
    dispatch(setName(""));
    dispatch(setEditID(null));
    dispatch(setIsEditing(false));
  };

  const showAlert = (show = false, msg = "", type = "") => {
    dispatch(setAlert({ show, msg, type }));
  };

  const clearItems = () => {
    showAlert(true, "Empty list", "danger");
    dispatch(setList([]));
  };

  const removeAlert = () => {
    showAlert(false, "", "");
  };

  const editItem = (id) => {
    dispatch(setIsEditing(true));
    const edit = list.find((item) => item.id === id);
    dispatch(setName(edit.title));
    dispatch(setEditID(id));
  };

  const removeItem = (id) => {
    showAlert(true, "Item removed", "danger");
    const newItems = list.filter((item) => {
      return item.id !== id;
    });
    dispatch(setList(newItems));
  };

  return (
    <section className="section-center">
      {alert.show && <Alert list={list} removeAlert={removeAlert} {...alert} />}
      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>Shopify list</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g. eggs"
            className="grocery"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          ></input>
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List editItem={editItem} removeItem={removeItem} items={list} />
          <button className="clear-btn" onClick={clearItems}>
            Clear items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
