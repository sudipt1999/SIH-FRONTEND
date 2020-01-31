import React, { Component } from 'react'
import "./SignUp.css"
import axios from 'axios'
import {connect} from 'react-redux'
import {addUser, removeUser} from '../../store/Action/Action'


class SignUp extends Component {
    
    state ={
        email : '',
        password: '',
        isBuyer: false,
        isSeller: false,
        isCourier: false,
        invalidForm: true,
        errSignUp: '',
        userType: 'Seller',
        successSignUp: ''
    }

    componentDidMount () {
        console.log(this.state)
    }

    handleChangePassword = (e) => {
        e.preventDefault()
        console.log("NEW PASSWORD > signup >",e.target.value)
        this.setState({
            password: e.target.value
        })
    }
    
    handleChangeEmail = (e) => {
        e.preventDefault()
        console.log("NEW EMAIL > signup >",e.target.value)
        this.setState({
            email: e.target.value
        })
    }

    handleSelectUserType = (e) => {
        this.setState({
            userType: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("USER TRIED TO SIGNUP > ")
        const data = {
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password,
            isBuyer : (this.state.userType === "Buyer")?true:false,
            isSeller : (this.state.userType === "Seller")?true:false,
            isCourier : (this.state.userType === "Courier")?true:false
        }
        console.log("<<SIGNUP DATA >>",data)
        axios.post(`http://localhost:5000/api/user/signup`, data)
            .then(res => {
                console.log(res.data, this.props, this.state)
                this.setState({
                    successSignUp: 'You have been signed up! Please verify your email!'
                })
                //this.props.addUser(res.data)
                //this.props.history.push('/')
            })
            .catch(err => {
                console.log(err.response)
                this.setState({
                    errSignUp: err.response.data.username || err.response.data.password || 'Invalid Credentials'  
                })
            })
        
    }

    render() {
        console.log(this.state)
        return (
            <div className="container-fluid" id="signup__container">
                <div className="row">
                    
                    {/* LOGO STARTS */}
                    <div className="d-none d-md-block col-md-6 signup__minheight__100" id="signup__bg__green">

                    </div>
                    {/* LOGO ENDS */}
                    {/* FORM STARTS */}
                    <div className="col-md-6 signup__minheight__100">
                        <div className="row pt-5">
                            <div className="col-10 text-center">
                              <h4 className="display-4 w-100">Sign Up</h4>
                            </div>
                            <div className="col-10 px-4 pt-3">
                            <form  autoComplete="off">
                                {
                                    (this.state.errSignUp.length > 0)?(
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.errSignUp}
                                        </div>
                                    ):(<></>)
                                }
                                {
                                    (this.state.successSignUp.length > 0)?(
                                        <div className="alert alert-success" role="alert">
                                            {this.state.successSignUp}
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
                                <div className="form-group">
                                    <label htmlFor="select">UserType</label>
                                    <select 
                                        className="form-control" 
                                        value={this.state.userType} 
                                        onChange={this.handleSelectUserType} 
                                    >
                                        <option value="Seller">Seller</option>
                                        <option value="Buyer">Buyer</option>
                                        <option value="Courier">Courier</option>
                                    </select>
                                </div>
                                <button 
                                    onClick={(e)=>this.handleSubmit(e)}
                                    type="submit" 
                                    className="btn btn-primary signup__submit__btn">
                                    SignUp
                                </button>
                                <p className="lead mt-3">
                                    Already a User? <span className="signup__link" onClick={()=>this.props.history.push('/signin')}>SignIn</span>
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
)(SignUp)