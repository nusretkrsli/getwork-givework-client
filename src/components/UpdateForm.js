/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import { api } from "../services/httpService";
import { UserContext } from "../contexts/UserContext";

const UpdateForm = () => {
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const { user } = useContext(UserContext);
  if (!user) {
    return null;
  }

  const getUser = async () => {
    try {
      const response = await api.get(`/users/profile/${user.email}`);
      setCurrentUser(response.data);
      return response.data; //user object
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePerson = async () => {
    const updatedUser = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      birthday: currentUser.birthday,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
      role: currentUser.role,
    };
    try {
      const response = await api.put(
        `/dashboard/dashboard?email=${user.email}`,
        { updatedUser }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form>
      <label className="update_label">
        First Name:
        <br />
        <input
          className="update_form"
          type="text"
          name="firstName"
          value={currentUser.firstName}
          onChange={handleChange}
        />
      </label>
      <br />

      <label className="update_label">
        Last Name:
        <br />
        <input
          className="update_form"
          type="text"
          name="lastName"
          value={currentUser?.lastName}
          onChange={handleChange}
        />
      </label>
      <br />

      <label className="update_label">
        Birthday:
        <br />
        <input
          className="update_form"
          type="date"
          name="birthday"
          value={currentUser?.birthday}
          onChange={handleChange}
        />
      </label>
      <br />

      <label className="update_label">
        Email:
        <br />
        <input
          className="update_form"
          type="email"
          name="email"
          value={currentUser?.email}
          onChange={handleChange}
        />
      </label>
      <br />

      <label className="update_label">
        Phone Number:
        <br />
        <input
          className="update_form"
          type="tel"
          name="phoneNumber"
          maxLength={10}
          value={currentUser?.phoneNumber}
          onChange={handleChange}
        />
      </label>
      <br />

      <label className="update_label">
        Role:
        <br />
        <input
          className="update_form"
          type="text"
          name="role"
          value={currentUser.role}
          onChange={handleChange}
        />
      </label>
      <br />

      <button
        type="submit"
        className="submit-btn mt-3 px-5 py-2 bg-primary rounded-3 border-0 text-white"
        onClick={updatePerson}
      >
        <b>UPDATE</b>
      </button>
    </form>
  );
};

export default UpdateForm;
