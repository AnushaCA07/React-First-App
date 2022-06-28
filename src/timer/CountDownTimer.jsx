
import useCountDown from "../hooks/useCountDown";
import './CountDownTimer.css'


const CountDownTimer = ({ targetDate }) => {
  const [minutes, seconds] = useCountDown(targetDate);
    return (
      <div>
         
         <div className="timer-display"><span className="timer-border">{String(minutes)[0]}</span><span className="timer-border">{String(minutes)[1]}</span> <span>:</span> <span className="timer-border">{String(seconds)[0]}</span><span className="timer-border">{String(seconds)[1]}</span> </div>
         <div className="timer-text"><span style={{margin: "0px 18px 0px 0px;"}}>Minutes</span> <span> </span> <span>Seconds</span></div>

      </div>
    );
  };

export default CountDownTimer;
