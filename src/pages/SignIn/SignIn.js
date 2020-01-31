import React, { Component } from 'react'
import "./SignIn.css"
import axios from 'axios'
import {connect} from 'react-redux'
import {addUser, removeUser} from '../../store/Action/Action'


class SignIn extends Component {
    
    state ={
        email : '',
        password: '',
        emailValidMsg: '',
        passwordValidMsg: '',
        invalidForm: true,
        errLogin: ''
    }

    componentDidMount () {
        console.log(this.state)
    }

    handleChangePassword = (e) => {
        e.preventDefault()
        console.log("NEW PASSWORD > SIGNIN >",e.target.value)
        this.setState({
            password: e.target.value
        })
    }
    
    handleChangeEmail = (e) => {
        e.preventDefault()
        console.log("NEW EMAIL > SIGNIN >",e.target.value)
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("USER TRIED TO LOGIN > ")
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(`http://localhost:5000/auth/login`, data)
            .then(res => {
                console.log(res.data, this.props, this.state)
                if(!res.data.verified){
                    return this.setState({
                        errLogin: 'Please Varify before logging in'
                    })
                }
                this.props.addUser(res.data)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    errLogin: 'Invalid Credentials'
                })
            })
        
    }

    render() {
        console.log(this.state)
        return (
            <div className="container-fluid" id="signin__container">
                <div className="row">
                    
                    {/* LOGO STARTS */}
                    <div className="d-none d-md-block col-md-6 signin__minheight__100" id="signin__bg__green">

                    </div>
                    {/* LOGO ENDS */}
                    {/* FORM STARTS */}
                    <div className="col-md-6 signin__minheight__100">
                        <div className="row pt-5">
                            <div className="col-10 text-center">
                              <h4 className="display-4 w-100">Sign In</h4>
                            </div>
                            <div className="col-10 px-4 pt-3">
                            <form  autoComplete="off">
                                {
                                    (this.state.errLogin.length > 0)?(
                                        <div className="alert alert-danger" role="alert">
                                            Invalid Credentials
                                        </div>
                                    ):(<></>)
                                }
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email"
                                        onChange={(e)=>this.handleChangeEmail(e)}
                                        required={true}
                                        />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type="password"
                                        className="form-control" 
                                        id="password"
                                        onChange={(e)=>this.handleChangePassword(e)}
                                        required={true}
                                        />
                                </div>
                                <button 
                                    onClick={(e)=>this.handleSubmit(e)}
                                    type="submit" 
                                    className="btn btn-primary signin__submit__btn">
                                    SignIn
                                </button>
                                <p className="lead mt-3">
                                    New User? <span className="signin__link" onClick={()=>this.props.history.push('/signup')}>SignUp</span>
                                </p>
                            </form>
                            </div>
                        </div>
                    </div>
                    {/* FORM ENDS */}

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    isLoggedIn: state.isLoggedIn
  })
const mapDispatchToProps = dispatch => ({
    addUser: user => dispatch(addUser(user)),
    removeUser: () => dispatch(removeUser())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)