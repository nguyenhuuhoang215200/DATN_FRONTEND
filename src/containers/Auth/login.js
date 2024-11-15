import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { divide } from "lodash";
import UserService from "../../services/UserService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      successMessage: "",
      errMessage: "",
      showPassword: false, // Thêm trạng thái này
    };
  }

  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassWord = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      successMessage: "",
      errMessage: "",
    });
    try {
      // Gửi yêu cầu đăng nhập tới backend
      const response = await UserService.handleLogin(
        this.state.username,
        this.state.password
      );

      // Kiểm tra phản hồi từ API
      if (response && response.data) {
        if (response.data.errcode === 0) {
          // Đăng nhập thành công
          this.props.userLoginSuccess(response.data.user); // Sử dụng dữ liệu từ phản hồi server
          this.setState({
            successMessage: response.data.message,
          });
        } else {
          // Đăng nhập thất bại
          this.setState({
            errMessage: response.data.message || "Đăng nhập thất bại",
          });
        }
      }
    } catch (error) {
      // Xử lý lỗi nếu có từ server
      if (error.response && error.response.data) {
        this.setState({
          errMessage: error.response.data.message || "Có lỗi xảy ra",
        });
      }
      console.log("Lỗi:", error.response);
    }
  };
  handleToggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-left">
          <div className="login-container">
            <div className="login-content">
              <div className="col-12 text-login">Login</div>
              <div className="col-12 form-group login-input">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={this.state.username}
                  onChange={(event) => this.handleOnChangeUserName(event)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label>Password:</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.handleOnChangePassWord}
                  />
                  <i
                    className={
                      this.state.showPassword
                        ? "fa-regular fa-eye-slash"
                        : "fa-regular fa-eye"
                    }
                    onClick={this.handleToggleShowPassword}
                  ></i>
                </div>
              </div>

              <div className="col-12" style={{ color: "green" }}>
                {this.state.successMessage}{" "}
                {/* Hiển thị thông báo thành công */}
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage} {/* Hiển thị thông báo lỗi */}
              </div>

              <div className="col-12 mt-3">
                <button
                  className="btn-login"
                  onClick={() => {
                    this.handleLogin();
                  }}
                >
                  Login
                </button>
              </div>

              <div className="col-12 mt-3 forgot-password">
                <span>Forgot your password?</span>
              </div>
              <div className="col-12 text-center">
                <span>Or login with:</span>
              </div>
              <div className="col-12 social-login">
                <i className="fab fa-facebook-f facebook"></i>
                <i className="fab fa-google google"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="login-right">
          <img
            src="https://id.medpro.vn/static/media/cover-14.cdc08a1d.jpg"
            alt="Doctor"
            className="login-image"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
