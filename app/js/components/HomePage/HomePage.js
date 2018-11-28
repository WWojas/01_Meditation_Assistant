import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Body from './Body';


class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            response_json: {},
            isUserLoggedIn: null,
        }
    }

    changeResponseHandler = (response) => {
        this.setState ({
            response_json: response
        })

    };

    checkUserLoggedHandler = (loggedIn) => {
        this.setState ({
            isUserLoggedIn: loggedIn
        })

    };



    render() {
        return (
            <div>
                <Header changeResponse={this.changeResponseHandler} checkUserLogin={this.checkUserLoggedHandler}/>
                <Body response = {this.state.response_json} loggedIn = {this.state.isUserLoggedIn}/>
                <Footer />
            </div>
        );
    }
}


export default HomePage;