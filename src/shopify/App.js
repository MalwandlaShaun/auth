import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import axios from "axios";
import "./index.css";

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    saveList();
  }, [list]);

  const getList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/list");
      setList(response.data);
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
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      showAlert(true, "Item changed", "success");
    } else {
      showAlert(true, "Item added", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
    }
    setName("");
    setEditID(null);
    setIsEditing(false);
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearItems = () => {
    showAlert(true, "Empty list", "danger");
    setList([]);
  };

  const removeAlert = () => {
    showAlert(false, "", "");
  };

  const editItem = (id) => {
    setIsEditing(true);
    const edit = list.find((item) => item.id === id);
    setName(edit.title);
    setEditID(id);
  };

  const removeItem = (id) => {
    showAlert(true, "Item removed", "danger");
    const newItems = list.filter((item) => {
      return item.id !== id;
    });
    setList(newItems);
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
            onChange={(e) => setName(e.target.value)}
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
