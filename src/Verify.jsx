import smsicon from '../src/images/smsicon.svg';
import callicon from '../src/images/smsicon.svg';

import './Verify.css'



function Verify() {

            return (

                <div>
                    <form className="body">
                        <div className="container">
                            <h5>Request your verification code</h5>
                            <p>Please select how you would like to receive your verification code:</p>
                        
                        <br></br>
                        <div className='float-container'>
                            <div className='float-child border-outset-style'>
                                <img src={smsicon} />
                            </div>
                            <div className='float-child border-outset-style'>                      
                                <img src={callicon} />
                            </div>   
                        </div>

<table>
    <tbody>
        <tr>
            <td>
            <div className='voice-border'>
                                <img src={smsicon} width="100" height="50" />
                            </div>
            </td>
            <td>
            <div className='voice-border'>
                                <img src={callicon} width="100" height="50" />
                            </div>

            </td>
        </tr>
        <tr>
            <td>
                SMS
            </td>
            <td>
                Voice
            </td>
        </tr>
    </tbody>
</table>

                            
                        <br></br>
                            <label className="lable2"><b>Please Enter Your Mobile Number</b></label><br></br>
                            <input type="text" placeholder="Enter Your Mobile Number" name="num" id="num" required /><br></br>

                            <p>* Must be able to receive text messages. Message and data rates may apply</p>
                            <div></div>
                            <button type="button" className="button2">Request Verification Code</button>
                            <p>


                            </p>
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


export default Verify;