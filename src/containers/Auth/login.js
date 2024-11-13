import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import UserService from '../../services/UserService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }


    handleOnChangeUserName = (Event) => {
        this.setState({
            username: Event.target.value
        })

    }
    handleOnChangePassWord = (Event) => {
        this.setState({
            password: Event.target.value
        })

    }
    handleLogin = async() => {
        console.log(this.state.username + '  :  ', this.state.password)
        console.log(this.state)
        try {
            await UserService.handleLogin(this.state.username,this.state.password);
        } catch (error) {
            console.log(error);
        }
       
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control ' placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUserName(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password :</label>
                            <div className='custom-input-password'>
                                <input type='password' className='form-control ' placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassWord(event)} />
                                <i class="fa-regular fa-eye"></i>
                            </div>
                        </div>
                        <div className='col-12 mt-3'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>

                        <div className='col-12 mt-3 forgot-password'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-center'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i class="fa-brands fa-google google"></i>
                            <i class="fa-brands fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
