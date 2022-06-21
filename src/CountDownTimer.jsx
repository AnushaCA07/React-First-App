
import useCountDown from "./hooks/useCountDown";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const CountDownTimer = ({ targetDate }) => {
  const [minutes, seconds] = useCountDown(targetDate);

  if (minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <div>
         <h2><span>{minutes}</span> <span>:</span> <span>{seconds}</span></h2>
      </div>
    );
  }
};

export default CountDownTimer;
