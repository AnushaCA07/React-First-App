import { render } from "@testing-library/react";
import React, { useState, useRef, useEffect } from 'react'



function Verify() {

    /*
    JS objects
    */
                class Example extends React.Component {
                    constructor() {
                        super();
                        this.state = { time: {}, seconds: 5 };
                        this.timer = 0;
                        this.startTimer = this.startTimer.bind(this);
                        this.countDown = this.countDown.bind(this);
                    }
                    
                    secondsToTime(secs){
                        let hours = Math.floor(secs / (60 * 60));
                    
                        let divisor_for_minutes = secs % (60 * 60);
                        let minutes = Math.floor(divisor_for_minutes / 60);
                    
                        let divisor_for_seconds = divisor_for_minutes % 60;
                        let seconds = Math.ceil(divisor_for_seconds);
                    
                        let obj = {
                        "h": hours,
                        "m": minutes,
                        "s": seconds
                        };
                        return obj;
                    }
                    
                    componentDidMount() {
                        let timeLeftVar = this.secondsToTime(this.state.seconds);
                        this.setState({ time: timeLeftVar });
                    }
                    
                    startTimer() {
                        if (this.timer == 0 && this.state.seconds > 0) {
                        this.timer = setInterval(this.countDown, 1000);
                        }
                    }
                    
                    countDown() {
                        // Remove one second, set state so a re-render happens.
                        let seconds = this.state.seconds - 1;
                        this.setState({
                        time: this.secondsToTime(seconds),
                        seconds: seconds,
                        });
                        
                        // Check if we're at zero.
                        if (seconds == 0) { 
                        clearInterval(this.timer);
                        }
                    }
                render() 
        {     

            return (

                <div>
                    <form className="body">
                        <div class="container">
                            <h5>Request your verification code</h5>
                            <p>Please select how you would like to receive your verification code:</p>
                            <label for="num" className="lable2"><b>Please Enter Your Mobile Number</b></label><br></br>
                            <input type="text" placeholder="Enter Your Mobile Number" name="num" id="num" required /><br></br>

                            <p>* Must be able to receive text messages. Message and data rates may apply</p>
                            <div></div>
                            <button type="button" className="button2">Request Verification Code</button>
                            <p>


                            </p>
                                <hr></hr>

                            <table>
                            <td colSpan={2}>
                                <p><b>Didn't find what you need or still have questions?</b>That's ok, we're here to help.</p>
                                </td>;
                                
                                <tr>
                                    <td>
                                        <b>1-855-459-8427</b>
                                    </td>
                                    <td>
                                        <a><b>Contact us</b></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Toll free
                                    </td>
                                    <td>
                                        Use this option in case if it's
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Mon-Fri,8:45 a.m. - 5:00 p.m. ET
                                    </td>
                                    <td>
                                        outside of business hours
                                    </td>
                                </tr>
                                <div>
                                    <button onClick={this.startTimer}>Start</button>
                                    m: {this.state.time.m} s: {this.state.time.s}
                                </div>
                            </table>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default Verify;