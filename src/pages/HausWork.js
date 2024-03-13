/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import "bootstrap-icons/font/bootstrap-icons.css";


function HausWork() {
  const [workers, setWorkers] = useState([]);

  const getAllUsers = async () => {
    try {
      const userss = await userService.getUsers();
      const workers = userss.filter((user) => user.role !== "user" && user.role !== "admin" );
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

  const handleClickChat = (pNumber) => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(pNumber)}`;
    window.location.href = whatsappUrl;
  };
  return (
    <div className="row justify-content-center">
      <div className="col-lg-2 ">
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
      <div className="col-9 d-flex flex-wrap justify-content-center">
        {workers?.map((worker) => (
          <div className="card profil-card bg-white text-white p-0 mt-5 ms-4 col-lg-3 ">
            <div className="text-center m-3">
              {/* Resim ekleme yapilacak */}
              <img
                src={`http://localhost:8000/api/v1/dashboard/image?email=${worker?.email}`}
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
                <button onClick={()=>handleClickChat(worker.phoneNumber)} className="invisible-button">
                <span id="boot-icon" class="bi bi-whatsapp" ></span>
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
