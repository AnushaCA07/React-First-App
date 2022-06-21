
function Verify() {

    /*
    JS objects
    */
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
                            </table>
                        </div>
                    </form>
                </div>
            );
        
}

export default Verify;