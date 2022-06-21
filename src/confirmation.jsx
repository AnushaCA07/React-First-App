import React, { useState, useRef, useEffect } from 'react'

function Confirmation(props) {

    const [timer, setTimer] = useState('00:00:00');

    
        const {initialMinute = 0,initialSeconds = 0} = props;
        const [ minutes, setMinutes ] = useState(initialMinute);
        const [seconds, setSeconds ] =  useState(initialSeconds);

        useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        });
    


    return (
        <div>
            <form className="body">
                <div class="container">
                    <h5 >You're almost done!</h5>
                    <p>A verification code has been sent to 720-123-1111 but will expire soon</p>
                    <label for="verify" className="lable2"><b>Please Enter Your Verification Code</b></label><br></br>
                    <input type="text" placeholder="Enter Your Verification Code" name="verify" id="verify"/><br></br>
                    <p>This code will expire in</p>
                    <h2>{timer}</h2>
                    

                    <div>
                        <h1> {minutes}:{seconds}</h1> 
                    </div>

                    <p>This code will expire immediatley if you leave this page.</p>

                    <button type="button" className="button2">Submit Registration</button>

                    <p>Not correct number? <a><b>Modify number</b></a></p>
                    <hr></hr>
                    
                    
                    <table>
                        <td colSpan={2}>
                        <p><b>Didn't find what you need or still have questions?</b>That's ok, we're here to help.</p>
                        </td>
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
                    </table>
                </div>
            </form>
        </div>
    );

}

export default Confirmation;
