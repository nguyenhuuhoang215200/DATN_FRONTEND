import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      RoleId: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.userToEdit !== this.props.userToEdit &&
      this.props.userToEdit
    ) {
      const {
        email,
        firstName,
        lastName,
        address,
        phoneNumber,
        gender,
        RoleId,
      } = this.props.userToEdit;

      this.setState({
        email: email || "",
        firstName: firstName || "",
        lastName: lastName || "",
        address: address || "",
        phoneNumber: phoneNumber || "",
        gender: gender || "",
        RoleId: RoleId || "",
      });
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const updatedData = {
      id: this.props.userToEdit.id,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      RoleId: this.state.RoleId,
    };
    this.props.handleEditUser(updatedData);
  };

  render() {
    const { email, firstName, lastName, address, phoneNumber, gender, RoleId } =
      this.state;

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.closeEditUser}
        size="lg"
      >
        <ModalHeader toggle={this.props.closeEditUser}>Edit User</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={lastName}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={address}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label>Gender</label>
              <select
                className="form-select"
                name="gender"
                value={gender}
                onChange={this.handleInputChange}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>Role</label>
              <select
                className="form-select"
                name="RoleId"
                value={RoleId}
                onChange={this.handleInputChange}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="1">Admin</option>
                <option value="2">Doctor</option>
                <option value="3">Patient</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSubmit}>
            Save Changes
          </Button>
          <Button color="secondary" onClick={this.props.closeEditUser}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalEditUser;
