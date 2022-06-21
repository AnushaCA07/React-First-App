
import useCountDown from "./hooks/useCountDown";


const CountDownTimer = ({ targetDate }) => {
  const [minutes, seconds] = useCountDown(targetDate);
    return (
      <div>
         <h2><span>{minutes}</span> <span>:</span> <span>{seconds}</span></h2>
      </div>
    );
  };

export default CountDownTimer;
