/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import {createMessage} from "../services/contactService";
import { UserContext } from "../contexts/UserContext";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ContactSvg from "../assets/ContactSvg";

function Contact() {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  if (!user) {
    return null;
  }

  const getAllUsers = async () => {
    try {
      const allUsers = await userService.getUsers();
      setUsers(allUsers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedUser = users?.filter((person) => person?.id === user?.id);

  const userId = selectedUser[0]?.id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      title,
      content,
    };
    try {
      const response = await createMessage(newMessage, userId);
      console.log("Message saved successfully:", response);
      let timerInterval;
      Swal.fire({
        title: "Message sent successfully!",
        html: "I will close in <b></b> milliseconds.",
        timer: 2300,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          navigate(0);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="container-contact d-flex justify-content-center align-items-center">
      <ContactSvg />
      <form onSubmit={handleSubmit}>
        <h1 className="title text-center mb-4">Talk to Us</h1>
        <div class="form-group-contact position-relative">
          <label for="title" class="d-block">
            <i className="icon" data-feather="user"></i>
          </label>
          <input
            type="text"
            id="title"
            class="form-control form-c ontrol-lg thick"
            placeholder="   Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group-contact message">
          <textarea
            id="content"
            className="form-control form-control-lg"
            rows="7"
            placeholder="Your Massege"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className=" button btn.btn-primary-contact text-white"
            tabIndex="-1"
          >
            Send message
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
