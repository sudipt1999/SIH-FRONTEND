import React from 'react';
import './Footer.css'
import axios from 'axios'
import { connect } from 'react-redux'
import {addUser, removeUser} from '../../store/Action/Action'

const logoutUser = (props) => {
    axios.get(`http://localhost:5000/api/user/logout`)
         .then(res => {
            props.removeUser()
            props.history.push('/signin')
         })
         .catch(err => {
             console.log("<<NAVBAR ERROR>>")
         })
}

const Footer = (props) => {
    return (
        <div className="mt-5 pt-5 pb-5 footer">
        <div className="container">
        <div className="row">
            <div className="col-lg-5 col-xs-12 about-company">
            <h2>Living Seeds</h2>
            <p className="pr-5 text-white-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis </p>
            <p><a href="#"><i className="fa fa-facebook-square mr-1"></i></a><a href="#"><i className="fa fa-linkedin-square"></i></a></p>
            </div>
            <div className="col-lg-3 col-xs-12 links">
            <h4 className="mt-lg-0 mt-sm-3">Links</h4>
                <ul className="m-0 p-0">
                <li>- <a onClick={()=>{props.history.push('/')}}>Home</a></li>
                <li>- <a onClick={()=>{props.history.push('/profile')}}>Profile</a></li>
                <li>- <a onClick={()=>logoutUser(props)}>Logout</a></li>
                </ul>
            </div>
            <div className="col-lg-4 col-xs-12 location">
            <h4 className="mt-lg-0 mt-sm-4">Location</h4>
            <p>22, Lorem ipsum dolor, consectetur adipiscing</p>
            <p className="mb-0"><i className="fa fa-phone mr-3"></i>(541) 754-3010</p>
            <p><i className="fa fa-envelope-o mr-3"></i>info@hsdf.com</p>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col copyright">
            <p className=""><small className="text-white-50">© 2019. All Rights Reserved.</small></p>
            </div>
        </div>
        </div>
        </div>
    );
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
)(Footer)
