import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addUser, removeUser} from '../../store/Action/Action'
import axios from 'axios'
import './Nav.css'

class Nav extends Component {
    
    logoutUser = () => {
        axios.get(`http://localhost:5000/api/user/logout`)
             .then(res => {
                this.props.removeUser()
                this.props.history.push('/signin')
            })
             .catch(err => {
                 console.log("<<NAVBAR ERROR>>")
                 this.props.history.push('/signin')
             })
    }

    profilePage = () => {
        this.props.history.push('/profile')
    }

    homePage = () => {
        this.props.history.push('/')
    }

    render() {
        console.log("RENDER",this.props.history)
        const url = String(this.props.history.location.pathname)
        console.log(url)
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light nav__main py-3 px-2">
            <a className="navbar-brand">Living Seeds</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto">
                <li className="nav-item mx-2">
                    <span className={(url === '/')?"nav__active nav-link": "nav-link"} onClick={()=>this.homePage()} >Home <span className="sr-only">(current)</span></span>
                </li>
                <li className="nav-item mx-2">
                    <span className={(url.includes('profile'))?"nav__active nav-link": "nav-link"} onClick={()=>this.profilePage()}>Profile</span>
                </li>
                <li className="nav-item mx-2">
                    <span className="nav-link" onClick={()=>this.logoutUser()}>Logout</span>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            </nav>
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
)(Nav)