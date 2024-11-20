import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";

import { connect } from "react-redux";
class ModalDeleteUser extends Component {
  componentDidMount() {}
  toggle = () => {
    if (this.props.isOpen) {
      this.props.closeDeleteUser(); // truyền về user managel để tắt modal
    }
  };
  handleDelete = () => {
    this.props.handleDeleteUser();
  };
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
        <ModalBody>
          <div className="delete-modal">
            <div className="modal-content">
              <h3>Bạn có đồng ý xóa tài khoản này không?</h3>
              <div className="modal-actions">
                <button onClick={this.handleDelete} className="btn-confirm">
                  Confirm
                </button>
                <button onClick={this.toggle} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
export default ModalDeleteUser;
