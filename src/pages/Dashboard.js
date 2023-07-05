/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateForm from "../components/UpdateForm";
import userService from "../services/userService";
import { api } from "../services/httpService";

function Dashboard() {
  const [isChecked, setIschecked] = useState(false);
  const [member, setMember] = useState([]);
  const [userImage, setUserImage] = useState();
  const { logout } = useAuth0();
  const { user } = useContext(UserContext);
  if (!user) {
    return null;
  }

  const getAllMember = async () => {
    try {
      const allMember = await userService.getUsers();
      setMember(allMember);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedMember = member.filter((person) => person.id === user.id);

  const handeleCheckBox = () => {
    setIschecked(!isChecked);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/v1/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("It has been deleted successfully.");

          logout({ logoutParams: { returnTo: window.location.origin } });
        } else {
          throw new Error("An error occurred while deleting the record.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", userImage);
    try {
      const response = await api.put(
        `/dashboard/image?email=${selectedMember[0]?.email}`,
        formData
      );
      getUserImage();
      return response.data; 
    } 
    catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const getUserImage = async () => {
    try {
      const response = await api.get(`/dashboard/image?email=${user?.email}`);
      setUserImage();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <Container className="mb-5 d-flex justify-content-around">
      <div className="mt-5 ms-5 col-lg-3">
        {isChecked ? <UpdateForm /> : ""}
      </div>

      <div className="card profil-card bg-white text-white p-0 mt-5 ms-5 col-lg-3 ">
        <div className="image-section text-center m-3">
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={`http://localhost:8000/api/v1/dashboard/image?email=${user?.email}`}
              className="w-50 card-img-top rounded-circle"
              alt="Profile"
            />
            <div style={{ position: "absolute", right: 100, bottom: 33 }}>
              <button
                type="button"
                className="image-button btn btn-primary text-primary bg-transparent border-0"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="bi bi-plus-circle-fill me-1 mb-5 fs-4"></i>
              </button>
            </div>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Modal title
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div>
                      <label className="update_label">
                        Image:
                        <br />
                        <input
                          className="update_form"
                          type="file"
                          name="profileImage"
                          onChange={(e) => {
                            setUserImage(e.currentTarget.files[0]);
                          }}
                        />
                      </label>
                      <br />
                      <button
                        onClick={(e) => {
                          updateImage(e);
                        }}
                        className=" button text-primary border-0 px-2 py-1 rounded-2 text-white mt-5"
                        data-bs-dismiss="modal"
                      >
                        update Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body bg-primary">
          <p className="card-text">
            Name:{" "}
            <b>
              {selectedMember[0]?.firstName} {selectedMember[0]?.lastName}
            </b>
          </p>
          <hr className="text-white"></hr>
          <p className="card-text">
            Email: <b>{selectedMember[0]?.email}</b>
          </p>
          <hr className="text-white"></hr>
          <p className="card-text">
            Phone: <b>{selectedMember[0]?.phoneNumber}</b>
          </p>
          <hr className="text-white"></hr>
          <p className="card-text">
            Profession: <b>{selectedMember[0]?.role}</b>
          </p>
          <hr className="text-white"></hr>
          <div className="d-flex justify-content-between">
            <button
              onClick={() => handleDelete(user?.id)}
              className="text-danger border-0 px-4 py-3 rounded-2"
            >
              <i className="bi bi-archive-fill"></i>
            </button>
            <button
              onClick={(e) => {
                handeleCheckBox();
              }}
              className="text-primary border-0 px-4 py-3 rounded-2"
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
