function Confirmidentity(){
        return(
            <div>
                <form className="body">
                <div class="container">
                    <h5>Conform your identity</h5>
                    <p>Healthgrades ensures only providers, and those authorised by providers, can modify
                        profiles.
                    </p>
                    <label for="num" className="lable2"><b>Enter DEA number</b></label><br></br>
                    <input type="text" placeholder="Enter the last 4 characters of your DEA" name="num" id="num" required /><br></br>
                    <h5>Note:</h5>
                    <ul>
                        <li>Only providers and authorised useres can modify profiles</li>
                        <li>Information entered here is only used to confirm your identity,and will not be added
                            to your profile
                        </li>
                        <li>This page is SSL-encrypted to protect your data</li>
                    </ul>
                    <div className="checkbox">
                        <input type="checkbox" /> <label>I confirm that I am authorised to act on[provider's First,Last Name]behalf<a></a> </label><br></br>
                        <button type="button" className="button">Continue</button>
                    </div>
                    <p>Or you can confirm your identity by downloading the farm below and faxing your informaton to us.We will let you know once we authorized your account.</p>
                </div>
                </form>
            </div>

        );
}
export default Confirmidentity;