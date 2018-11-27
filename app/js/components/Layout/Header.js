import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            // DESKTOP
            signUpWindowVisible: false,
            password: '',
            username: '',
            email: '',

            loginWindowVisible: false,

            // ERROR boxes //
            showUsernameSignUpError: 'none',
            showPasswordSignUpError: 'none',
            showEmailSignUpError: 'none',

            showLoginPanel: 'block',
            showAccountOptions: 'none',

            response: '',

            userStatsDisplay: 'none',
            userStatsInfo: [],

            sessions: [],

            toggleDisplayLogIn: 'none',
            toggleDisplaySignUp: 'none',
            isUserLoggedIn: false,
            showMyAccount: 'none',

            //    MOBILE
            displayMobileMenu: 'none'


        }
    };

                                                // DESKTOP & MOBILE Functionalities


// JSON Server


    // SIGN UP
    signUp = () => {
        if (this.state.signUpWindowVisible === false) {
            this.setState({
                signUpWindowVisible: true,
                loginWindowVisible: false,
                toggleDisplaySignUp: 'block',
                displayMobileMenu: 'none'


            })
        } else {
            this.setState({
                signUpWindowVisible: false,
                loginWindowVisible: false,
                password: '',
                username: '',
                email: '',
                toggleDisplaySignUp: 'none',
                displayMobileMenu: 'block'
            })
        }
    };


    // SET NEW USER NAME, EMAIL AND PASSWORD
    typeName = (event) => {
        this.setState({
            username: event.target.value,
            showUsernameSignUpError: 'none'
        })
    };

    typeMail = (event) => {
        this.setState({
            email: event.target.value,
            showEmailSignUpError: 'none'

        })
    };


    typePassword = (event) => {
        this.setState({
            password: event.target.value,
            showPasswordSignUpError: 'none'
        })
    };


    //  SIGN UP Box
    addUser = (event) => {
        event.preventDefault();

        if (this.state.username.length < 9) {
            this.setState ({
                showUsernameSignUpError: 'block'
            })

        } else if ((this.state.email.length < 7) || (this.state.email.indexOf('@') === -1)) {
            this.setState ({
                showEmailSignUpError: 'block'
            })
        }

        else if ( this.state.password.length < 7) {
            this.setState({
                showPasswordSignUpError: 'block'
            })
        }

        else {

            fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    'username': this.state.username,

                    'email': this.state.email,

                    'password': this.state.password
                })
            }).then(() => {

                this.setState({
                    signUpWindowVisible: false
                })
            })}

    };



    // LOG IN Box
    logIn = () => {
        if (this.state.loginWindowVisible === false) {
            this.setState({
                loginWindowVisible: true,
                signUpWindowVisible: false,
                toggleDisplayLogIn: 'block',
                showMyAccount: 'none',
                displayMobileMenu: 'none'

            })
        } else {
            this.setState({
                loginWindowVisible: false,
                signUpWindowVisible: false,
                password: '',
                username: '',
                email: '',

                showMyAccount: 'block',
                displayMobileMenu: 'block',
                toggleDisplaySignUp: 'none',
                toggleDisplayLogIn: 'none',


            })
        }
    };


    // VALIDATE LOGIN DATA
    checkUser = (event) => {
        event.preventDefault();

        fetch(`http://localhost:3000/users?email=${this.state.email}&password=${this.state.password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },

        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(response => {

            if ((response[0].email === this.state.email) && (response[0].password === this.state.password)) {

                this.props.changeResponse(response);

                this.setState({
                    showLoginPanel: 'none',
                    loginWindowVisible: false,
                    response: response,
                    toggleDisplayLogIn: 'none',
                    showMyAccount: 'block',
                    isUserLoggedIn: true,

                })


            }

        })
    };


    // SHOW My Account Box

    openAccountOptions = () => {

        if (this.state.showAccountOptions === 'none') {

            this.setState({
                showAccountOptions: 'block'
            })
        } else if (this.state.showAccountOptions === 'block') {

            this.setState({
                showAccountOptions: 'none'
            })
        }
    };


    // LOG OUT USER

    userLogOut = () => {
        this.setState({
            showLoginPanel: 'block'
        })
    };



    // SHOW USER STATISTICS

    showStatistics = () => {

        this.setState({
            userStatsDisplay: 'block'
        }, () => {


            fetch(`http://localhost:3000/statistics?userID=${this.state.response[0].id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },

            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(response => {

                this.setState({
                    sessions: response,

                })
            })
        })

    };


    // HIDE STATISTICS on scroll
    componentDidMount() {
        window.addEventListener('scroll', () => {
            this.setState({
                userStatsDisplay: 'none',
                showAccountOptions: 'none'

            })
        });

    }

                                                // ------------ //
                                                   // DESKTOP //
                                                // -------------//


    // Desktop Header

    generateDesktopHeader () {
        return (
            <div className="header_top">

                <ul>
                    <li><em> Zen Assistant </em></li>
                    <li> Meditation Music</li>
                    <li> Timer </li>


                    { this.generateDesktopSignUp ()}

                    { this.generateDesktopLogIn () }

                    { this.generateMyAccountDesktop() }


                    <li> About </li>
                </ul>


            </div>
        )
    }


    // MyAccount Desktop

    generateMyAccountDesktop () {
        if (this.state.isUserLoggedIn === true) {
            return (

                <li  style={{ display: this.state.showMyAccount }}>
                    <span onClick={this.openAccountOptions} >  My Account </span>

                    <div className="myAccount" style={{ display: this.state.showAccountOptions }} >

                        <p> Welcome, {this.state.response[0].username} </p>
                        <button onClick={this.showStatistics}> My Profile </button>


                        <div class="userStatsBox" style={{ display: this.state.userStatsDisplay }} >

                            <table class="stats_table">
                                <thead>
                                <tr>
                                    <h1> {this.state.response[0].username} </h1>
                                    <h1> Session Summary </h1>
                                    <p><em> "The secret of getting ahead is getting started" -
                                        <strong>Mark Twain</strong></em></p>

                                </tr>
                                </thead>

                                <tbody>

                                {
                                    this.state.sessions.map((element) => {

                                        return <tr>
                                            <td>
                                                {element.date}
                                            </td>
                                            <td>
                                                {element.duration} min
                                            </td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>


                        <button> My Groups </button>
                        <button> Publish </button>
                        <button onClick={this.userLogOut}> Log Out </button>

                    </div>
                </li>

            )
        }
    }

    // Desktop LogIn Box

    generateDesktopLogIn () {
        return (
                    <li style={{ display: this.state.showLoginPanel }}>
            <span onClick={this.logIn} > Login </span>


            <div className="LogIn" style ={{ display: this.state.toggleDisplayLogIn }} >

                <form>
                    <h2> Already our Member? Log in now </h2>
                    <input onChange={this.typeMail} type='mail'
                           value={this.state.email}/> Email
                    <input onChange={this.typePassword} type='password'
                           value={this.state.password}/> Password
                    <button onClick={this.checkUser} type='submit'> LOG IN </button>
                </form>

            </div>

        </li>
        )
    }


   // Desktop SignUp

    generateDesktopSignUp () {
        return (
            <li>
                <span onClick = {this.signUp}> Sign up </span>

                <div className="SignUp" style ={{ display: this.state.toggleDisplaySignUp }}>
                    <form>
                        <h2> Interested in meditation? Come join our club </h2>
                        <input onChange={ this.typeName} type='text' value={this.state.username}/> Full name
                        <input onChange={ this.typeMail} type='mail' value={this.state.email}/> Email
                        <input onChange={ this.typePassword} type='password' value={this.state.password}/> Password
                        <button onClick={this.addUser} type='submit'> CREATE ACCOUNT </button>

                        { this.generateUsernameError () }

                        { this.generateEmailError () }

                        { this.generatePasswordError () }




                    </form>
                </div>
            </li>
        )
    }


    // Desktop Username Error Box

    generateUsernameError () {
        return (
            <div className="showUsernameSignUpError" style={{display: this.state.showUsernameSignUpError}}>
                <h2> We're sorry but ... </h2>
                <p> your <strong> name </strong> must consist of at least 8 characters </p>
            </div>
        )
    };

    generateEmailError () {
        return (
            <div className="showEmailSignUpError" style={{display: this.state.showEmailSignUpError}}>
                <h2> We're sorry but ... </h2>
                <p> your <strong> email </strong> must consist of at least 6 characters and contain <strong> @ </strong> </p>
            </div>
        )
    };


    generatePasswordError () {
        return (
            <div className="showPasswordSignUpError" style={{display: this.state.showPasswordSignUpError}}>
                <h2> We're sorry but ... </h2>
                <p> your <strong> password </strong> must consist of at least 6 characters </p>
            </div>
        )
    };






                                                        // -----------//

                                                        //    MOBILE  //

                                                        // -----------//





    // Mobile Header

    generateMobileHeader() {
        return (   <div className="header_mobile">

                <ul className="mobile_logo">
                    <li><em> Zen Assistant </em></li>
                </ul>

                <div className="mobile_bar">
                    <img src='/images/logo_mobile.png' onClick={this.toggleMobileMenu}/>


                    <ul className="mobile_burger" style={{display: this.state.displayMobileMenu}}>
                        <li><em> Zen Assistant </em></li>
                        <li> Meditation Music</li>
                        <li> Timer</li>

                        {/* SIGN UP Box - moved outside of UL  */}
                        <li>
                            <span onClick={this.signUp}> Sign up </span>
                        </li>


                        {/* LOG IN Box - moved outside of UL */}
                        <li style={{display: this.state.showLoginPanel}}>
                            <span onClick={this.logIn}> Login </span>
                        </li>


                        {this.generateMobileMyAccount()}

                        <li> About</li>


                    </ul>
                    {this.generateMobileSignUp()}

                    {this.generateMobileLogIn()}

                </div>
            </div>
        )
    }



    // Mobile Menu

    toggleMobileMenu = () => {

        if (this.state.displayMobileMenu === 'none') {
            this.setState({
                displayMobileMenu: 'block',
                toggleDisplaySignUp: 'none',
                toggleDisplayLogIn: 'none',
            })
        } else if (this.state.displayMobileMenu === 'block') {
            this.setState({
                displayMobileMenu: 'none',
                loginWindowVisible: false,
                signUpWindowVisible: false,
                toggleDisplayLogIn: 'none',
                toggleDisplaySignUp: 'none',
            })
        }
    };


    // Mobile SignUp Box

    generateMobileSignUp() {
        return (
            <div className="SignUp" style={{display: this.state.toggleDisplaySignUp}}>
                <form>
                    <h2> Interested in meditation? Come join our club </h2>
                    <input onChange={this.typeName} type='text' value={this.state.username}/> Full name
                    <input onChange={this.typeMail} type='mail' value={this.state.email}/> Email
                    <input onChange={this.typePassword} type='password'
                           value={this.state.password}/> Password
                    <button onClick={this.addUser} type='submit'> CREATE ACCOUNT </button>

                    { this.generateUsernameError () }

                    { this.generateEmailError () }

                    { this.generatePasswordError () }

                </form>
            </div>
        )
    }



    // Mobile LogIn Box

    generateMobileLogIn() {
        return (
            <div className="LogIn" style ={{ display: this.state.toggleDisplayLogIn }} >

                <form>
                    <h2> Already our Member? Log in now </h2>
                    <input onChange={this.typeMail} type='mail'
                           value={this.state.email}/> Email
                    <input onChange={this.typePassword} type='password'
                           value={this.state.password}/> Password
                    <button onClick={this.checkUser} type='submit'> LOG IN </button>
                </form>

            </div>
        )
    }


    // Mobile MyAccount

    generateMobileMyAccount() {

        if (this.state.isUserLoggedIn === true) {

            return <li style={{display: this.state.showMyAccount}}>
                <span onClick={this.openAccountOptions}>  My Account </span>

                <div className="myAccount" style={{display: this.state.showAccountOptions}}>

                    <p> Welcome, {this.state.response[0].username} </p>
                    <button onClick={this.showStatistics}> My Profile</button>


                    <div className="userStatsBox" style={{display: this.state.userStatsDisplay}}>

                        <table className="stats_table">
                            <thead>
                            <tr>
                                <h1> {this.state.response[0].username} </h1>
                                <h1> Session Summary </h1>
                                <p><em> "The secret of getting ahead is getting started" -
                                    <strong>Mark Twain</strong></em></p>

                            </tr>
                            </thead>

                            <tbody>

                            {
                                this.state.sessions.map((element) => {

                                    return <tr>
                                        <td>
                                            {element.date}
                                        </td>
                                        <td>
                                            {element.duration} min
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>


                    <button> My Groups</button>
                    <button> Publish</button>
                    <button onClick={this.userLogOut}> Log Out</button>

                </div>
            </li>

        }
    }




// Rendering all elements
    render() {
        return (
            <div className="container">
                <header>


                    {/* MOBILE Section */}
                    { this.generateMobileHeader () }

                    {/* DESKTOP Section*/}
                    { this.generateDesktopHeader () }


                    {/* Bottom part of Header */}
                    <div className="header_bottom">

                        <div className="header_picture_text">
                            <img src='app/images/Icon.jpg'/>
                            <h1> Improve Your Meditation Today</h1>
                            <p> Zen Assistant connects over 15.000 people daily on their journey to meditation mastery.</p>

                            <p>  Come join us and experience the deep potential of combining your internal focus

                                with our professional set of chakra empowering soundwaves. </p>
                        </div>
                    </div>

                </header>
            </div>
        );
    }
}

export default Header;