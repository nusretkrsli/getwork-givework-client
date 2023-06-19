import { useState, useEffect } from 'react';
import userService from '../services/userService';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  

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

  useEffect(() => {
    getAllUsers();
  }, []);
 console.log(users)
  return (
    <div className="container bg-white">
      <h1 className="my-4">User Management</h1>
      
    </div>
  );
}
