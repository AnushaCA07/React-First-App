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
                    <input type="text" placeholder="Enter the last 4 characters of your DEA number" name="num" id="num" required /><br></br>
                </div>
                </form>
            </div>

        );
}