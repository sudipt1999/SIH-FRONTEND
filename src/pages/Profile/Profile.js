import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addUser, removeUser} from '../../store/Action/Action'

// import component
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'

class Profile extends Component {

    componentDidMount() {
        console.log("HOME > STATE >",this.state)
        console.log("HOME > PROPS >",this.props)

        if(!this.props.isLoggedIn){
            this.props.history.push('/signin')
        }
        

    }


    render() {
        return (
            <>
                <Nav history={this.props.history}/>
                <Footer history={this.props.history}/>
            </>
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
)(Profile)