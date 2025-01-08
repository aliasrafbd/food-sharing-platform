import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const AwardsCounter = ({ awardsWon }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5, 
    triggerOnce: true, 
  });

  useEffect(() => {
    if (inView) {
      let start = 0; 
      const duration = 2000; 
      const increment = Math.ceil(awardsWon / (duration / 50)); 

      const timer = setInterval(() => {
        start += increment;
        if (start >= awardsWon) {
          clearInterval(timer); 
          setCount(awardsWon);
        } else {
          setCount(start);
        }
      }, 50); 

      return () => clearInterval(timer); 
    }
  }, [inView, awardsWon]);

  return (
    <div ref={ref} className="w-full grid gap-6">
      
      <div className="text-5xl flex font-bold items-center justify-center">
        {count}
      </div>
    </div>
  );
};

export default AwardsCounter;
