import { useState, useEffect } from "react";
import userService from "../services/userService";
import { getMessages } from "../services/contactService";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const getAllUsers = async () => {
    try {
      const users = await userService.getUsers();
      if (users) {
        setUsers(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsersMessages = async () => {
    try {
      const messages = await getMessages();
      if (messages) {
        setMessages(messages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
    getAllUsersMessages();
  }, []);

  const mergedArray = messages.map((message) => {
    const user = users.find((user) => user.id === message.UserId);
    if (user) {
      return { ...user, ...message };
    } else {
      return null;
    }
  });

  console.log("Birleştirilmiş Array:", mergedArray);

  return (
    <div className="container mt-3">
      <div className="row justify-content-md-center">
      {mergedArray?.map((person) => (
        <div class="card-contact col col-lg-2 col-12">
          <div class="additional">
            <div class="user-card d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column align-items-center">
                <div className="level center">{person?.role}</div>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={`http://localhost:8000/api/v1/dashboard/image?email=${person?.email}`}
                    className=" w-50 rounded-circle "
                    alt="Profile"
                  />
                </div>
                <div class="points center">{person?.phoneNumber}</div>
              </div>
            </div>
            <div class="more-info">
              <h1>
                {person?.firstName} {person?.lastName}
              </h1>
              <div class="stats">
                <div>
                  <div class="title">
                    <p>{person?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="general">
            <h5>{person?.title}</h5>
            <p>{person?.content}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
    
  );
}
