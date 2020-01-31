import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addUser, removeUser} from '../../store/Action/Action'

import './EmailVerified.css'

class EmailVerified extends Component {
    componentDidMount () {
        if(this.props.isLoggedIn){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Thanks for Verifying</h1>
                <p class="lead">We will not share your data with any third party. Kindly SignIn!</p>
                <p className="lead">
                    <button
                        onClick={()=>this.props.history.push('/signin')} 
                        className="btn btn-lg btn-success">
                            Sign In
                    </button>
                </p>
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
)(EmailVerified)
