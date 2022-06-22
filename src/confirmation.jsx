import React, { useState, useRef, useEffect } from 'react'

import CountdownTimer from './timer/CountDownTimer';

function Confirmation(props) {

    const NOW_IN_MS = new Date().getTime();

    const tenmindateTime = NOW_IN_MS + 60 * 10000;

    return (
        <div>
            <form className="body">
                <div className="container">
                    <h5 >You're almost done!</h5>
                    <p>A verification code has been sent to 720-123-1111 but will expire soon</p>
                    <label className="lable2"><b>Please Enter Your Verification Code</b></label><br></br>
                    <input type="text" placeholder="Enter Your Verification Code" name="verify" id="verify"/><br></br>
                    <p>This code will expire in</p>
                    
                    <CountdownTimer targetDate={tenmindateTime} />              
                          
                    <p>This code will expire immediatley if you leave this page.</p>

                    <button type="button" className="button2">Submit Registration</button>

                    <p>Not correct number? <a><b>Modify number</b></a></p>
                    <hr></hr>
                    
                    
                    <table>
                        <tbody>
                            <tr>
                        <td colSpan={2}>
                        <p><b>Didn't find what you need or still have questions?</b>That's ok, we're here to help.</p>
                        </td>
                        </tr>
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
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );

}

export default Confirmation;
