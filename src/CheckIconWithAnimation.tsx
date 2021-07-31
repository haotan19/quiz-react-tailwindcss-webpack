import React from 'react'
import { animated, useSpring } from "react-spring";


const CheckAnimation = () => {
    const circleLength = Math.PI * 2 * 512;
    // const checkMarkRef = useSpringRef();
    // const colorRef = useSpringRef();
    const { strokeOffset } = useSpring({
      from: { strokeOffset: 0 },
      strokeOffset: 1,
      // ref: checkMarkRef,
      config: {
        mass: 5,
        tension: 100,
        friction: 40,
        clamp: true,
      },
    });
    const { fgColor } = useSpring({
      from: {
        fgColor: "rgba(255,255,255,1)",
      },
      to: {
        fgColor: "rgba(0,0,0,1)",
      },
      delay: 500,
      config: {
        mass: 5,
        tension: 100,
        friction: 40,
        clamp: true,
      },
      // ref: colorRef,
    });
    // useChain([checkMarkRef, colorRef]);

    return (
        <svg
          className="inline w-7 ml-3 absolute"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <animated.circle
            cx="512"
            cy="512"
            r="400"
            fill="none"
            stroke="black"
            strokeWidth="65"
            strokeDasharray={circleLength}
            strokeDashoffset={strokeOffset.to(
              (strokeOffset) => (1 - strokeOffset) * circleLength
            )}
          />
          <animated.path
            fill={fgColor}
            d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
          ></animated.path>
        </svg>
    )
}

export default CheckAnimation
