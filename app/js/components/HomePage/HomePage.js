import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Body from './Body';


class HomePage extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                response_json: {}
            }
        }

        changeResponseHandler =(response) => {
            this.setState ({
                response_json: response
            })

        };



    render() {
        return (
            <div>
            <Header changeResponse={this.changeResponseHandler}/>
            <Body response = {this.state.response_json}/>
            <Footer />
            </div>
            );
         }
        }

export default HomePage;