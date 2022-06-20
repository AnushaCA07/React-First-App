import React from "react";
import "./Registration.css"

function Registration(props) {

    return (
        <div>
            {/* <p>{props.name}</p>
           <p>{props.id}</p> */}

            <form className="body">
                <div class="container">
                    <h5>Get Registered</h5>
                    <div>
                        <div className="radio">
                            <input type="radio" /> <label >I am Elena Garcia-Davranova</label><br></br>
                        </div>

                        <div className="radio1">
                            <input type="radio" /> <label >I am an Employeee of the Elena Garcia-Davranova's practice or hospital</label><br></br>
                        </div>

                        <div className="radio1">
                            <input type="radio" /> <label >I am a third party firm representing the Elena Garcia-Davranova (not the practice manager or admin)</label><br></br>
                        </div>

                    </div>

                    <label for="email" className="lable1"><b>Email</b></label><br></br>
                    <input type="text" placeholder="Enter your Email" name="email" id="email" required /><br></br>

                    <label for="psw" className="lable"><b>Password</b></label><br></br>
                    <input type="password" placeholder="Create New Password" name="psw" id="psw" required /><br></br>

                    <div className="checkbox">
                        <input type="checkbox" /> <label>I agree to the <a><b>Healthgrades User Agreement</b></a> </label><br></br>
                    </div>
                    
                    <button type="button" className="button1">Cancel</button>
                    <div class="space">
                    </div>
                    <button type="button" className="button">Continue</button>
                    
                    

                </div>
            </form>
            {/* <button onClick={CallMe}>
        Functions call
         </button> */}
            <h1>  </h1>
        </div>
    );
}

export default Registration;
