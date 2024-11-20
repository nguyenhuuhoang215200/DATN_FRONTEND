import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import UserService from "../../services/UserService";
import ModalCreateUser from "./ModalCreateUser";
import ModaldeleteUser from "./ModaldeleteUser";

class UserManage extends Component {
  state = {
    users: [],
    showDeleteModal: false,
    showCreateModal: false,
    userToDelete: null, // Lưu id người dùng cần xóa
  };

  async componentDidMount() {
    await this.getAllUsers();
  }
  getAllUsers = async () => {
    try {
      let response = await UserService.getAllUsers("ALL");
      if (response && response.data) {
        this.setState({ users: response.data.users });
      }
      console.log("data", response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
  // Mở modal và lưu thông tin người dùng cần xóa
  openDeleteModal = (userId) => {
    this.setState({
      showDeleteModal: true,
      userToDelete: userId,
    });
  };
  closeDeleteUser = () => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
    });
  };

  handleDeleteUser = async () => {
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
  createNewUser = async (dataCreateUser) => {
    try {
      // Gửi yêu cầu đến server
      let response = await UserService.createNewUserService(dataCreateUser);

      // Kiểm tra phản hồi từ server
      console.log("response create user", response.data.errcode);
      if (response.data.errcode !== 0) {
        alert(response.data.errmessage); // Hiển thị lỗi từ server
      } else {
        alert("Tạo người dùng thành công!"); // Thông báo khi tạo thành công
        await this.getAllUsers(); // Cập nhật danh sách người dùng
        this.closeAddNewUser();
      }
    } catch (error) {
      // Xử lý lỗi nếu server trả về 400 Bad Request
      if (error.response && error.response.status === 400) {
        const serverError = error.response.data; // Lấy dữ liệu lỗi từ server
        alert(serverError.errmessage || "Đã xảy ra lỗi, vui lòng kiểm tra!");
        console.log("Chi tiết lỗi từ server:", serverError);
      } else {
        // Lỗi không từ server hoặc không rõ nguyên nhân
        alert("Lỗi không xác định, vui lòng kiểm tra!");
        console.log("Lỗi không xác định:", error.message);
      }
    }
  };

  openAddNewUser = () => {
    this.setState({
      showCreateModal: true,
    });
  };
  closeAddNewUser = () => {
    this.setState({
      showCreateModal: !this.state.showCreateModal,
    });
  };
  render() {
    const users = this.state.users;
    return (
      <div className="users_container">
        <ModalCreateUser
          isOpen={this.state.showCreateModal}
          closeAddNewUser={this.closeAddNewUser}
          createNewUser={this.createNewUser}
        ></ModalCreateUser>
        <ModaldeleteUser
          isOpen={this.state.showDeleteModal}
          closeDeleteUser={this.closeDeleteUser}
          handleDeleteUser={this.handleDeleteUser}
        ></ModaldeleteUser>
        <div className="title text-center">Manage User</div>
        <div className="mx-1">
          <button
            onClick={this.openAddNewUser}
            className="btn-add-user btn-primary"
          >
            Add new users
          </button>
        </div>
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
