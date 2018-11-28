import React from 'react';
import moment from "moment";
import Sound from 'react-sound';



class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starterDisplay: 'block',
            counterDisplay: 'none',
            current_time: 15,
            seconds: 0,
            minutes: 0,
            userTimerError: false,

            button_display: 'block',
            reset_display: 'none',
            resume_timer_sec_value: 0,
            resume_timer_min_value: 0,

            chakra_music: [
                'Crown Chakra',
                'Heart Chakra',
                'Root Chakra',
                'Sacral Chakra',
                'Solar Plexus Chakra',
                'Third Eye Chakra',
                'Throat Chakra',
            ],

            ambient_music: [
                'Rain',
                'Airplane',
                'Forest',
                'Space'
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
        if (this.state.current_time > 59) {

            this.setState({
                current_time: 59,

            })

        } else {
            this.setState({
                current_time: this.state.current_time + 1,

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
        if (this.state.current_time <= 0) {
            this.setState({
                current_time: 1,
            })

        } else {
            this.setState({
                current_time: this.state.current_time - 1,
            })
        }
    };

                                                // USER TIMER

    userTimeError() {

        if ( this.state.userTimerError === true) {

         return  <div className="userTimerError">
                <p> Only numbers within the <strong> range 1-59 </strong> are allowed</p>
            </div>
        }

    }

    // SETTING MINUTES USING KEYBOARD
    setUserTimer = (event) => {

        if (event.target.value <= 0) {

            this.setState({
                current_time: 1,
                userTimerError: false

            })
        } else if (Number.isNaN(Number(event.target.value))) {
            this.setState({
                userTimerError: true,
                current_time: ''
            })
        }

        else if (event.target.value > 59) {

            this.setState({
                current_time: 59,
                userTimerError: false

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

    timerSetup () {
return (
    <div>
        <input style={{ display: this.state.starterDisplay}} value= {this.state.current_time} onChange={this.setUserTimer} type='text'/>
        <span className="minString" style={{ display: this.state.showMinString} }> min </span>

        <h2 style={{ display: this.state.counterDisplay}}> {this.state.minutes}:{this.state.seconds} </h2>
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


        var b = moment().add(this.state.current_time, 'minutes');


        // Interval
        this.timer = setInterval(() => {

            var secondDiff = b.diff(moment());

            // Resets timer, makes Bell sound and stops ambient music
            if (secondDiff <= 0) {
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

                let new_seconds = Math.floor((secondDiff % (1000 * 60)) / 1000);
                let new_minutes = Math.floor((secondDiff % (1000 * 60 * 60)) / (1000 * 60));

                this.setState({
                    minutes: new_minutes < 10 ? '0' + new_minutes : new_minutes,
                    seconds: new_seconds < 10 ? '0' + new_seconds : new_seconds,

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

        setInterval(() => {
            if (this.heart.volume - 0.05 >= 0) {
                this.heart.volume -= 0.05;
            } else {
                this.heart.pause();
            }

        }, 500);
    };


    // STOP & RESET TIMER FUNCTIONS
    resetCountDown = () => {
        clearInterval(this.timer);
        this.muteSound();

        this.setState({
            current_time: 15,
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

        clearInterval(this.timer);

        this.setState({
            resume_button: 'block',
            reset_display: 'block',
            didUserPause: true,
            display_pause_button: 'none'
        })

    };


    // RESUME TIMER FUNCTION

    resumeCounter = () => {
        this.heart.play();

        let resume_min = this.state.minutes;

        this.setState ({
            current_time: resume_min
        });

        console.log(this.state.current_time);

        // var b = moment().add(this.state.current_time, 'minutes');

        var b = moment().add(resume_min, 'minutes');


        this.timer = setInterval(() => {

            var secondDiff = b.diff(moment());

            let new_seconds = Math.floor((secondDiff % (1000 * 60)) / 1000);
            let new_minutes = Math.floor((secondDiff % (1000 * 60 * 60)) / (1000 * 60));

            this.setState({
                minutes: new_minutes < 10 ? '0' + new_minutes : new_minutes,
                seconds: new_seconds < 10 ? '0' + new_seconds : new_seconds,
                counterDisplay: 'block',
                starterDisplay: 'none',
                button_display: 'none',
                reset_display: 'block',
                timerStarted: true,
                didUserPause: false,
                display_pause_button: 'block',



            });
        }, 1000)
    };




                                            // CHOOSE CHAKRA MUSIC

    generateChakraMusic() {
        return (
            <ul>
                {
                    this.state.chakra_music.map(element => {

                        return <li key={(element)}> <button onClick = {()=>{ this.changeChakraMusic(element)}}
                         style = {{ background: this.state.selected_track === element && this.state.display_selected_track }}
                                                            className='music_buttons'>
                            {element} </button></li>
                    })
                }

            </ul>
        )
    }

    // Function for passing selected Chakra Music src to the startTimer function
    changeChakraMusic = (element) => {

        this.setState({
            selected_track: element,
            display_selected_track: '#07024F',
        })
    };


                                                // CHOOSE AMBIENT MUSIC

    generateAmbientMusic() {

        return (
            <ul>
                {

                    this.state.ambient_music.map(element => {

                        return <li key={(element)}> <button onClick = {()=>{ this.changeAmbientMusic(element)}}
                       style = {{ background: this.state.selected_track === element && this.state.display_selected_track }}
                                                            className='music_buttons'
                        > {element} </button></li>
                    })
                }
            </ul>
        )
    }


    changeAmbientMusic = (element) => {

        this.setState({
            selected_track: element,
            display_selected_track: '#07024F',
        })
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
            <div className="showUserNotLoggedIn" style={{display: this.state.showUserNotLoggedIn}} onMouseLeave={this.HideUserNotLoggedInError}>
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

            <div className="container wide_background">


                <div className="music_choice">
                    {this.loadSounds() }


                    <h1> Select your Ambient Music </h1>

                    <h2> Chakra Healing Music </h2>
                    { this.generateChakraMusic () }



                    <h2> Ambient Sounds Music </h2>
                    { this.generateAmbientMusic () }


                </div>

                <div className ='timer'>
                    <h1> Select your Meditation Time </h1>


                    <div className="timer_box">

                        { this.subtractTimerMinutes() }

                        { this.timerSetup() }


                        {/* ERROR BOX if Timer input is less than 1 and more than 59 minutes */}
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

        );
    }
}

export default Body;