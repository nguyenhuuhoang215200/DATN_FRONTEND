import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import UserService from "../../services/UserService";

class UserManage extends Component {
  state = {
    users: [],
    showDeleteModal: false,
    userToDelete: null, // Lưu id người dùng cần xóa
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

  // Mở modal và lưu thông tin người dùng cần xóa
  openDeleteModal = (userId) => {
    this.setState({
      showDeleteModal: true,
      userToDelete: userId,
    });
  };

  // Đóng modal
  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
      userToDelete: null,
    });
  };

  // Xử lý xóa người dùng
  handleDelete = async () => {
    const { userToDelete } = this.state;
    if (userToDelete) {
      try {
        await UserService.deleteUser(userToDelete);
        this.setState((prevState) => ({
          users: prevState.users.filter((user) => user.id !== userToDelete),
          showDeleteModal: false,
          userToDelete: null,
        }));
        alert("User deleted successfully!"); // Bạn có thể thay thế bằng toast hoặc modal
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  render() {
    const { users, showDeleteModal } = this.state;

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
                        // onClick={() => handleEdit(user.id)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      {/* Nút "Xóa" */}
                      <button
                        onClick={() => this.openDeleteModal(user.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal xác nhận xóa */}
        {showDeleteModal && (
          <div className="delete-modal">
            <div className="modal-content">
              <h3>Bạn có đồng ý xóa tài khỏa này không?</h3>
              <div className="modal-actions">
                <button onClick={this.handleDelete} className="btn-confirm">
                  Đồng ý
                </button>
                <button onClick={this.closeDeleteModal} className="btn-cancel">
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
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
