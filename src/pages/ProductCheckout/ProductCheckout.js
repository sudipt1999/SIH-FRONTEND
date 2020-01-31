import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addUser, removeUser} from '../../store/Action/Action'
import axios from 'axios'
import './ProductCheckout.css'
// importing components
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import Loader from '../../components/Loader/Loader'

class ProductCheckout extends Component {

    state = {
        productId: this.props.match.params.pid || null,
        product: null,
        loading: true,
        bidPrice: 0
    }

    componentDidMount () {
        console.log("PRODUCT CHECKOUT > STATE >",this.state)
        console.log("PRODUCT CHECKOUT > PROPS >",this.props)

        // if(!this.props.isLoggedIn){
        //     this.props.history.push('/signin')
        // }

        // if(!this.state.productId) {
        //     this.props.history.push('/')
        // }

        axios.get(`http://localhost:5000/api/product/viewproduct/${this.state.productId}`)
             .then(res => {
                 console.log("<<PRODUCT FOR PRODUCTCHECKOUT>>",res.data)
                 this.setState({
                     product: res.data,
                     loading: false
                 })
             })
             .catch(err => {
                 console.log(err)
                 this.props.history.push('/notfound')
             })


    }

    handleBidPriceChange = (e) => {
        e.preventDefault()
        this.setState({
            bidPrice: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/api/bid/addbidder/${this.state.productId}`, {bidPrice: this.state.bidPrice, id: this.props.user._id})
            .then(res => {
                console.log("ADDED BIDDER",res.data)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }


    getProductCheckout = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4" id="pc__card">
                        <div className="card p-5">
                            <img
                                className="pc__img d-block" 
                                src={`http://localhost:5000/api/product/image/${this.state.product.imageId}`} />
                            <h4 className="mt-2">{this.state.product.name}</h4>
                            <p className="lead">
                                {this.state.product.description}
                            </p>
                            <h3 className="mt-1 lead">Base Price: &#8377; {this.state.product.basePrice}</h3>
                        </div>
                    </div>
                    <div className="col-md-6" id="pc__bid">
                    <form className="mt-5">
                        <div className="form-group">
                            <label for="bidPrice">Bid Price</label> 
                            <input 
                                type="text" 
                                onChange={this.handleBidPriceChange}
                                value={this.state.bidPrice} 
                                className="form-control" 
                                id="bidPrice" 
                                aria-describedby="bidHelp" />
                        </div>
                        <button onClick={this.onSubmitHandler} type="submit" className="btn btn-success">Submit Your Bid</button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        console.log("RENDER PRODUCT >>",this.state.product)
        return (
        <>
            <Nav history={this.props.history}/>
                {
                    (this.state.loading)?(<Loader />):this.getProductCheckout() 
                }
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
)(ProductCheckout)