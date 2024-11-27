import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalCreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenumber: "",
      gender: "",
      roleId: "",
      errors: {}, // Dùng để lưu trữ các lỗi
    };
  }
  resetForm = () => {
    this.setState({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenumber: "",
      gender: "",
      roleId: "",
      errors: {}, // Xóa toàn bộ lỗi
    });
  };
  toggle = () => {
    this.resetForm();
    if (this.props.isOpen) {
      this.props.closeAddNewUser(); // truyền về user managel để tắt modal
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const errors = { ...prevState.errors }; // Lấy bản sao của các lỗi hiện tại
      if (errors[name]) {
        delete errors[name]; // Xóa lỗi của trường đang được nhập
      }
      return { [name]: value, errors }; // Cập nhật giá trị và lỗi
    });
  };

  // Hàm validate để kiểm tra tất cả các trường
  validate = () => {
    const {
      email,
      password,
      firstname,
      lastname,
      address,
      phonenumber,
      gender,
      roleId,
    } = this.state;
    const fields = [
      {
        name: "email",
        value: email,
        rules: [
          (v) => !v && "Email is required",
          (v) => !/\S+@\S+\.\S+/.test(v) && "Email is not valid",
        ],
      },
      {
        name: "password",
        value: password,
        rules: [
          (v) => !v && "Password is required",
          (v) => v.length < 6 && "Password must be at least 6 characters",
        ],
      },
      {
        name: "firstname",
        value: firstname,
        rules: [(v) => !v && "First name is required"],
      },
      {
        name: "lastname",
        value: lastname,
        rules: [(v) => !v && "Last name is required"],
      },
      {
        name: "address",
        value: address,
        rules: [(v) => !v && "Address is required"],
      },
      {
        name: "phonenumber",
        value: phonenumber,
        rules: [
          (v) => !v && "Phone number is required",
          (v) => !/^\d+$/.test(v) && "Phone number must be only digits",
        ],
      },
      {
        name: "gender",
        value: gender,
        rules: [(v) => !v && "Gender is required"],
      },
      {
        name: "roleId",
        value: roleId,
        rules: [(v) => !v && "Role is required"],
      },
    ];

    let errors = {};

    // Dùng vòng lặp for để kiểm tra tất cả các trường
    for (let field of fields) {
      for (let rule of field.rules) {
        const error = rule(field.value);
        if (error) {
          errors[field.name] = error;
          break; // Dừng lại khi có lỗi đầu tiên
        }
      }
    }

    return errors;
  };

  // Hàm xử lý submit form
  handleSubmit = () => {
    const errors = this.validate(); // Kiểm tra tính hợp lệ của các trường

    if (Object.keys(errors).length > 0) {
      this.setState({ errors }); // Lưu các lỗi vào state
    } else {
      console.log("Form data submitted:", this.state);
      this.props.createNewUser(this.state);
      this.resetForm();
      // Xử lý dữ liệu sau khi xác thực thành công
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} size="lg">
        <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
        <ModalBody>
          <div className="container">
            <h1>Tạo tài khoản</h1>
            <div className="row mb-3">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="email"
                  className="form-label me-2"
                  style={{ minWidth: "100px" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                {this.state.errors.email && (
                  <span className="text-danger">{this.state.errors.email}</span>
                )}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="password"
                  className="form-label me-2"
                  style={{ minWidth: "100px" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                {this.state.errors.password && (
                  <span className="text-danger">
                    {this.state.errors.password}
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="firstname"
                  className="form-label me-2"
                  style={{ minWidth: "100px" }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleInputChange}
                />
                {this.state.errors.firstname && (
                  <span className="text-danger">
                    {this.state.errors.firstname}
                  </span>
                )}
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <label
                  htmlFor="lastname"
                  className="form-label me-2"
                  style={{ minWidth: "100px" }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleInputChange}
                />
                {this.state.errors.lastname && (
                  <span className="text-danger">
                    {this.state.errors.lastname}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label
                htmlFor="address"
                className="form-label me-2"
                style={{ minWidth: "100px" }}
              >
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
              />
              {this.state.errors.address && (
                <span className="text-danger">{this.state.errors.address}</span>
              )}
            </div>
            <div className="row mb-3">
              <div className="col-md-4 d-flex align-items-center">
                <label
                  htmlFor="phonenumber"
                  className="form-label me-2"
                  style={{ minWidth: "100px" }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.handleInputChange}
                />
                {this.state.errors.phonenumber && (
                  <span className="text-danger">
                    {this.state.errors.phonenumber}
                  </span>
                )}
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <label
                  htmlFor="gender"
                  className="form-label me-2"
                  style={{ minWidth: "100px" }}
                >
                  Sex
                </label>
                <select
                  className="form-select"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleInputChange}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
                {this.state.errors.gender && (
                  <span className="text-danger">
                    {this.state.errors.gender}
                  </span>
                )}
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <label
                  htmlFor="roleId"
                  className="form-label me-2"
                  style={{ minWidth: "100px" }}
                >
                  Role
                </label>
                <select
                  className="form-select"
                  name="roleId"
                  value={this.state.roleId}
                  onChange={this.handleInputChange}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="1">Admin</option>
                  <option value="2">Doctor</option>
                  <option value="3">Patient</option>
                </select>
                {this.state.errors.roleId && (
                  <span className="text-danger">
                    {this.state.errors.roleId}
                  </span>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalCreateUser;
