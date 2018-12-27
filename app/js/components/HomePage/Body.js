import React from 'react';
import moment from "moment";



class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starterDisplay: 'block',
            counterDisplay: 'none',

            current_time: 900,
            seconds: 0,
            minutes: 0,
            paused_seconds: 0,

            userTimerError: false,

            button_display: 'block',
            reset_display: 'none',

            chakra_music: [
                { sound:'Crown Chakra', chakra_icon: 'crown_chakra_icon', hover_text: 'Located at the top of the head the crown chakra gives us access to higher states of consciousness as we open to what is beyond our personal preoccupations and visions. The function of the Crown chakra is driven by consciousness and gets us in touch with the universal.'},
                { sound:'Third Eye Chakra', chakra_icon: 'third_eye_chakra_icon', hover_text: 'The third eye chakra is an instrument to perceive the more subtle qualities of reality. It goes beyond the more physical senses into the realm of subtle energies. Awakening your third eye allows you to open up to an intuitive sensibility and inner perception.' },
                { sound:'Throat Chakra', chakra_icon: 'throat_chakra_icon' , hover_text: 'The Throat chakra is about the expression of yourself: Your truth, purpose in life, creativity. Note that this chakra has a natural connection with the second chakra or sacral chakra, center of emotions and creativity as well. The throat chakra’s emphasis is on expressing and projecting the creativity into the world according to its perfect form or authenticity.'},
                { sound:'Heart Chakra', chakra_icon: 'heart_chakra_icon', hover_text: 'The Heart chakra is all about connecting and relating. The emphasis here is on love, giving and receiving, and how open we are in relationships. Love is the energy that helps transfigure emotions and experiences. It’s an essential element in any relationship, whether it’s is with others or oneself.' },
                { sound:'Solar Plexus Chakra',chakra_icon: 'solar_plexus_chakra_icon', hover_text: 'The main function of the Solar Plexus chakra is to provide actual momentum to move forward and realize personal desires and intentions in the world. It plays a fundamental role in the development of personal power. It feeds one’s direction in life and the actions taken in order to reach your goals. It influences preoccupations about social status and self-image.'},
                { sound:'Sacral Chakra', chakra_icon: 'sacral_chakra_icon' , hover_text: 'The Sacral chakra is the center of our feelings and sensations. It’s particularly active in our sexuality and the expression of our sensual and sexual desires. Motivated by pleasure, it’s the driving force for the enjoyment of life through the senses, whether it’s auditory, through taste, touch, or sight. Opening your sacral chakra allows you to “feel” the world around and in us. As such, it’s an important chakra at the foundation of our feeling of well-being.'},
                { sound:'Root Chakra', chakra_icon: 'root_chakra_icon', hover_text: 'The Root chakra provides the foundation on which we build our life. It supports us in growing and feeling safe into exploring all the aspects of life. It is related to our feeling of safety and security, whether it’s physical or regarding our bodily needs or metaphorical regarding housing and financial safety.'},
            ],


            selected_track: '',
            display_selected_track: '',



            showPopUp: 'none',
            showUserNotLoggedIn: 'none',

            timerStarted: false,

            resume_button: 'none',
            didUserPause: false,
            display_pause_button: 'block',
            display_start_button: 'block',
            showMinString: 'block'


        }
    }

                                            // ADDING & SUBTRACTING MINUTES FROM COUNTER



    // ADDING MINUTES to Timers

    addTimerMinutes() {

     return (
         <button onClick= {this.addMinutes} className="timer plus" style={{ display: this.state.button_display}}> + </button>
     )
    }


    addMinutes = () => {
        if (this.state.current_time > 3600) {

            this.setState({
                current_time: 3600,
                userTimerError: true

            })

        } else {
            this.setState({
                current_time: this.state.current_time + 60,
                userTimerError: false

            })
        }
    };


    // SUBTRACTING MINUTES

    subtractTimerMinutes () {

        return (
            <button onClick={this.subtractMinutes} className="timer minus"
                    style={{display: this.state.button_display}}> - </button>
        )
    }



    subtractMinutes = () => {
        if (this.state.current_time < 60) {
            this.setState({
                current_time: 60,
                userTimerError: true,

            })

        } else {
            this.setState({
                current_time: this.state.current_time - 60,
                userTimerError: false
            })
        }
    };

                                                // USER TIMER

    userTimeError() {

        if ( this.state.userTimerError === true) {

         return  <div className="userTimerError">
                <p> Only time within the <strong> range of 1-60 </strong> is allowed</p>
            </div>
        }

    }

    // SETTING MINUTES USING KEYBOARD
    setUserTimer = (event) => {

        if (event.target.value < 1) {

            this.setState({
                current_time: 1,
                userTimerError: true

            })
        } else if (Number.isNaN(Number(event.target.value))) {
            this.setState({
                userTimerError: true,
                current_time: ''
            })
        }

        else if (event.target.value >= 58) {

            this.setState({
                current_time: 60,
                userTimerError: true,

            })

        } else {
            this.setState({
                current_time: event.target.value,
                userTimerError: false

            })
        }
    };


                                                        // TIMER BUTTONS
    // SHOW START BUTTON
    showStartButton() {
        if (this.state.timerStarted === false) {

            return <div className="timer_box">
                <button onClick={this.startTimer} className="timer start"
                    style={{display: this.state.display_start_button}}> START</button>
            </div>
        }
    }


    // SHOW PAUSE BUTTON

    showPauseButton() {
        if (this.state.timerStarted === true) {

            return <div className="timer_box">
                <button onClick={this.pauseCounter} className="timer start"
                        style={{display: this.state.display_pause_button}}> PAUSE
                </button>
            </div>
        }
    }


    // SHOW RESET BUTTON

    showResetButton() {
        if (this.state.timerStarted === true) {

            return <div className="timer_box">
                <button onClick={this.resetCountDown} className="timer reset"
                        style={{display: this.state.reset_display}}> Stop & Reset
                </button>
            </div>
        }
    }


    // SHOW RESUME BUTTON

    showResumeButton() {
        if (this.state.didUserPause === true) {

            return <div className="timer_box">
                <button onClick={this.resumeCounter} className="timer start"> RESUME</button>
            </div>
        }
    }





                                                // TIMER SETUP

    convertSecondsToTimer = (sec) => {
        const minutes = Math.floor( sec / 60 );
        const seconds = sec - (minutes * 60);

        const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${formatedMinutes}:${formatedSeconds}`;
    };



    timerSetup () {
    return (
    <div class="timer_middle">
        <input style={{ display: this.state.starterDisplay}} value= {this.convertSecondsToTimer(this.state.current_time)} onChange={this.setUserTimer} type='text'/>
        <span className="minString" style={{ display: this.state.showMinString} }> min </span>

        <h2 style={{ display: this.state.counterDisplay}}> { this.convertSecondsToTimer(this.state.current_time)} </h2>
    </div>
    )
    }



    // STARTING TIMER
    startTimer = () => {


        clearInterval(this.timer);

        // First Bell sound and ambient music starts
        this.bell.play();
        this.heart.load();
        this.heart.play();


        const time  = this.state.current_time;

        const futureTime = moment().add(time, 'seconds').unix();

        // Interval
        this.timer = setInterval(() => {


            // Resets timer, makes Bell sound and stops ambient music
            if (this.state.current_time === 0) {
                clearInterval(this.timer);
                this.bell.play();

                this.muteSound();

                this.setState({
                    showPopUp: 'block',
                    button_display: 'block',
                    reset_display: 'block',
                    timerStarted: false,
                })


                // Starts timer, hides initial counter and displays countdown timer
            } else {

                const now = moment().unix();


                this.setState({

                    current_time: futureTime - now,

                    timerStarted: true,
                    counterDisplay: 'block',
                    starterDisplay: 'none',
                    button_display: 'none',
                    reset_display: 'block',
                    showMinString: 'none',
                    didUserPause: false,
                    display_pause_button: 'block',

                });
            }
        }, 1000)
    };


    // FADING OFF THE MUSIC
    muteSound = () => {

       let muteInterval = setInterval(() => {
            if (this.heart.volume.toFixed(2) - 0.05 >= 0) {
                this.heart.volume = this.heart.volume.toFixed(2) - 0.05;
            } else {
                this.heart.pause();
                clearInterval(muteInterval)
            }

        }, 500);
    };


    // STOP & RESET TIMER FUNCTIONS
    resetCountDown = () => {

        clearInterval(this.timer);
        this.heart.pause();
        this.heart.currentTime = 0;

        this.setState({
            current_time: 900,
            starterDisplay: 'block',
            counterDisplay: 'none',
            button_display: 'block',
            reset_display: 'none',
            timerStarted: false,
            didUserPause: false,
            showMinString: 'block',

        })
    };


    // PAUSE TIMER FUNCTION

    pauseCounter = () => {
        this.heart.pause();

        this.setState({
            resume_button: 'block',
            reset_display: 'block',
            didUserPause: true,
            display_pause_button: 'none',

        });

        clearInterval(this.timer);


    };





    // RESUME TIMER FUNCTION

    resumeCounter = () => {
        this.heart.play();


        const time  = this.state.current_time;

        const futureTime = moment().add(time, 'seconds').unix();

        this.timer = setInterval(() => {


            if (this.state.current_time <= 0) {
                clearInterval(this.timer);
                this.bell.play();

                this.muteSound();

                this.setState({
                    showPopUp: 'block',
                    button_display: 'block',
                    reset_display: 'block',
                    timerStarted: false,
                })

            } else {

                const now = moment().unix();

                    this.setState({
                        current_time: futureTime - now,

                        counterDisplay: 'block',
                        starterDisplay: 'none',
                        button_display: 'none',
                        reset_display: 'block',
                        timerStarted: true,
                        didUserPause: false,
                        display_pause_button: 'block',
                    });


                }
        }, 1000)
    };




                                            // CHOOSE CHAKRA MUSIC

    generateChakraMusic() {
        return (
            <ul>
                {
                    this.state.chakra_music.map(element => {

                        return <li key={(element.sound)} className="chakra_li" >
                            <div class="tooltip">
                                <h1> {element.sound} </h1>
                                <p> {element.hover_text}</p>
                            </div>

                            <img src= {`/app/images/${element.chakra_icon}.png`} className="chakra_icon"
                                 onClick = {()=>{ this.changeChakraMusic(element.sound)}}
                                 style = {{ background: this.state.selected_track === element.sound && this.state.display_selected_track, borderRadius:"15px" }}
                            /> </li>
                    })
                }

            </ul>
        )
    }

    // Function for passing selected Chakra Music src to the startTimer function
    changeChakraMusic = (element) => {


        this.setState({
            selected_track: element,
            chakra_icon: element,
            display_selected_track: 'whitesmoke',
        });
    };





                                                    // LOAD MUSIC

    loadSounds() {
        return (
            <div>
            {/* Bell sound*/}
        <audio ref={(bell) => { this.bell = bell; }} >
            <source src="/app/audio/bell.mp3" >
            </source></audio>

        {/* Ambient Music + loop value to loop music if timer exceeds 30 mins of track*/}
        <audio ref={(heart) => { this.heart = heart; }} loop={true}>
            <source src={`/app/audio/${this.state.selected_track}.mp3`} >
            </source></audio>
            </div>
        )
    }


                                                    // POP'UP

    showCongratulationsPopUp() {

     return <div>
        <div className="finished" style={{display: this.state.showPopUp}}>

                <h1> Congratulations!</h1>
                <p> You've just finished your meditation session</p>
                <button onClick={this.logResult}><h2> SAVE </h2></button>
                <button onClick={this.doNotLog}><h3> Don't log </h3></button>
            </div>

         { this.showUserNotLoggedInError () }

     </div>

    }

    showUserNotLoggedInError () {
        return (
            <div className="showUserNotLoggedIn" style={{display: this.state.showUserNotLoggedIn}}>
                <div onClick={this.HideUserNotLoggedInError} className="closeBox">
                    X
                </div>
                <h2> Hang on a minute!</h2>
                <p><em> You cannot save your session until you <a href="#LogIn" >Log In </a> </em></p>

            </div>
        )
    }

    HideUserNotLoggedInError = () => {
        this.setState ({
            showUserNotLoggedIn: 'none'
        })
    };


    // Don't log session
    doNotLog = () => {
        this.setState({
            showPopUp: 'none',
            starterDisplay: 'block',
            counterDisplay: 'none',
            current_time: 15,
        })

    };

    // LOG RESULTS function
    logResult = () => {

        if ( this.props.loggedIn === true) {    // logged in inherits state value from Header.js
            fetch('http://localhost:3000/statistics', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    'date': moment().format('LLLL'),

                    'duration': this.state.current_time,

                    'userID': this.props.response[0].id
                })

            }).then ( () => {
                this.setState ({
                    showPopUp: 'none'
                })

            })

        } else {
            this.setState ({
                showUserNotLoggedIn: 'block',
                showPopUp: 'none'
            })
        }


    };







// Rendering all the elements
    render() {
        return (


            <div className="wide_background">
                <div className="container">
                    {this.loadSounds() }

                <div className="music_choice">

                    <h1> Select your Chakra Music </h1>

                    { this.generateChakraMusic () }
                </div>

                <div className ='timer'>
                    <h1> Select your Meditation Time </h1>


                    <div className="timer_box">

                        { this.subtractTimerMinutes() }

                        { this.timerSetup() }


                        {/* ERROR BOX if Timer input is less than 1 and more than 60 minutes */}
                        { this.userTimeError () }

                        { this.addTimerMinutes() }


                    </div>

                    {/* RENDERING START, PAUSE and RESET Buttons */}


                    { this.showStartButton () }

                    { this.showPauseButton () }

                    { this.showResetButton ()  }

                    {  this.showResumeButton () }


                    {/* RENDERING Congratulations pop-up upon finishing meditation */}
                    { this.showCongratulationsPopUp() }

                </div>

                </div>
            </div>

        );
    }
}

export default Body;