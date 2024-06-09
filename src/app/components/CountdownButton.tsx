'use client'

import { useState, useEffect } from 'react';

const CountdownButton = () => {
    // Change useState(5) to desired number of seconds
  const [redirectSeconds, setRedirectSeconds] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (redirectSeconds > 0) {
        setRedirectSeconds(redirectSeconds - 1);
      } else {
        clearInterval(countdownInterval);
        window.location.href = '/';
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [redirectSeconds]);

  return (
    <div>
      <p className="m-auto bg-background_green text-white w-auto h-[54px] font-medium text-base px-10 py-3 rounded-full transition duration-300 ease-out hover:shadow-md focus:outline-none">Vei fi redirecționat în {redirectSeconds} secunde.</p>
    </div>
  );
};

export default CountdownButton;
