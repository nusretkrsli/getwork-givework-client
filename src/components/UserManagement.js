import { useState, useEffect } from 'react';
import userService from '../services/userService';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const roles = ['worker', 'admin', 'user']

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

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const handleSave = async () => {
    await userService.updateUserRoles(users)
    window.location.reload();
  }
  return (
    <div className="container bg-white">
      <h1 className="my-4">User Management</h1>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>

                <select
                  className="form-select"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  {roles.map((role,index) => (
                    <option key={index} value={role}>{role}</option>
                  ))}

                </select>


              </td>
              <td>{user.birthday}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn btn-primary mb-3' onClick={handleSave}>Save </button>
    </div>
  );
}
