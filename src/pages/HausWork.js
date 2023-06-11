/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import "bootstrap-icons/font/bootstrap-icons.css";

function HausWork() {
  const [workers, setWorkers] = useState([]);

  const getAllUsers = async () => {
    try {
      const userss = await userService.getUsers();
      const workers = userss.filter((user) => user.role !== "user");
      setWorkers(workers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleButtonClick = async (prole) => {
    try {
      const userss = await userService.getUsers();
      const workers = userss.filter((user) => user.role === prole);
      setWorkers(workers);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <div className="row">
      <div className="col-lg-4">
        <nav className="sidebar mt-5 ms-5">
          <div>
            <div>
              <button
                type="button"
                class="selected_button m-2"
                value="cleaner"
                onClick={(e) => handleButtonClick(e.target.value)}
              >
                Cleaner
              </button>
            </div>
            <div>
              <button
                type="button"
                class="selected_button m-2"
                value="electrician"
                onClick={(e) => handleButtonClick(e.target.value)}
              >
                Electrician
              </button>
            </div>
            <div>
              <button
                type="button"
                class="selected_button m-2"
                value="painter"
                onClick={(e) => handleButtonClick(e.target.value)}
              >
                Painter
              </button>
            </div>
            <div>
              <button
                type="button"
                class="selected_button m-2"
                value="waterman"
                onClick={(e) => handleButtonClick(e.target.value)}
              >
                Waterman
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="col-8 d-flex flex-wrap justify-content-center">
        {workers?.map((worker) => (
          <div className="card bg-white text-white p-0 mt-5 ms-5 col-lg-3 ">
            <div className="text-center m-3">
              {/* Resim ekleme yapilacak */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                className=" w-50 card-img-top rounded-circle "
                alt="Profile"
              />
            </div>
            <div className="card-body">
              <p className="card-text text-dark">
                Name:{" "}
                <b>
                  {worker.firstName} {worker.lastName}
                </b>
              </p>
              <hr className="text-white"></hr>
              <p className="card-text text-dark">
                Email: <b>{worker.email}</b>
              </p>
              <hr className="text-white"></hr>
              <p className="card-text text-dark">
                Profession: <b>{worker.role}</b>
              </p>
              <hr className="text-white"></hr>
              <div className="d-flex justify-content-between">
                <div></div>
                <button className="text-primary bg-transparent border-0 px-3 rounded-2 fs-1">
                  <i class="bi bi-chat-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HausWork;
