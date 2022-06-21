
import { useEffect, useState } from "react";


const useCountDown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = ('0' + (Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))) % 60).slice(-2);

  const seconds = ('0' + (Math.floor((countDown % (1000 * 60)) / 1000)) % 60).slice(-2);
 

  return [ minutes, seconds];
};

export default useCountDown;