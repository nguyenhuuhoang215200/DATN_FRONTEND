import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import UserService from "../../services/UserService";

class UserManage extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    try {
      let response = await UserService.getAllUsers("ALL");
      if (response && response.data) {
        this.setState({ users: response.data.users });
      }
      console.log("data", response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }

  render() {
    const { users } = this.state;

    return (
      <div className="users_container">
        <div className="title text-center">Manage User</div>
        <div className="User-table">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.address}</td>
                    <td>
                      {/* Nút "Sửa" */}
                      <button
                        //onClick={() => handleEdit(user.id)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      {/* Nút "Xóa" */}
                      <button
                        //onClick={() => handleDelete(user.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
