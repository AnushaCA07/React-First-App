import React from "react";

function Confirmation(props) {
    return (
        <div>
            <form className="body">
                <div class="container">
                    <h5 >You're almost done</h5>
                    <p>A verification code has been sent to 720-123-1111 but will expire soon</p>
                    <label for="verify" className="lable2"><b>Please Enter Your Verification Code</b></label><br></br>
                    <input type="text" placeholder="Enter Your Verification Code" name="verify" id="verify" required /><br></br>
                    <p>This code will expire in</p>

                    <p>This code will expire immediatley if you leave this page.</p>

                    <button type="button" className="button2">Submit Registration</button>

                    <p>Not correct number? <a><b>Modify number</b></a></p>
                    <hr></hr>
                    <p><b>Didn't find what you need or still have questions?</b> That's ok, we're here to help.</p>

                </div>
            </form>
        </div>

    );

}

export default Confirmation;
