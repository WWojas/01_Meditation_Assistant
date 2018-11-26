import React from 'react';

class Footer extends React.Component{
    render() {
        return (
            <div className="container">
                <footer>

                    {/* Footer Left Section */}
                    <div className="footer_left">
                        <div>
                        <img className="footer_icon" src='app/images/Icon.jpg' />
                        </div>
                        <div>
                        <h2> Zen Assistant </h2>
                        </div>
                    </div>

                    {/* Footer Right Section */}
                    <div className="footer_right">

                        <div className="footer_drop">
                            <h4> Home </h4>
                        </div>

                        <div className="footer_drop">
                            <h4> Meditations </h4>
                            <ul>
                                <li>Guided</li>
                                <li>Teachers</li>
                                <li>Benefits</li>
                                <li>Practices</li>
                            </ul>
                        </div>

                        <div className="footer_drop">
                            <h4> Timer </h4>
                            <ul>
                                <li>Chakra Music </li>
                                <li>Interval Bells </li>
                                <li>Ambient Music </li>
                                <li>Statistics</li>
                            </ul>
                        </div>

                        <div className="footer_drop">
                            <h4> Meditate in </h4>
                            <ul>
                                <li> Washington </li>
                                <li> Chicago </li>
                                <li> New York </li>
                                <li> San Francisco </li>
                            </ul>
                        </div>

                        <div className="footer_drop">
                            <h4> Social </h4>
                            <ul>
                                <li>Facebook</li>
                                <li>Twitter</li>
                                <li>Instagram</li>
                            </ul>
                        </div>

                        <div className="footer_drop">
                            <h4> Contact </h4>
                            <ul>
                                <li> Press </li>
                                <li> Public relations </li>
                                <li> Career </li>
                                <li> About us</li>
                            </ul>
                        </div>

                    </div>

                </footer>
            </div>

        );
    }
}

export default Footer;