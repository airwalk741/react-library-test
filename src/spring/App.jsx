import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const ExpandingForm = () => {
  const [expanded, setExpanded] = useState(false);

  // react-spring의 useSpring 훅을 사용하여 스타일 제어
  const formAnimation = useSpring({
    height: expanded ? "200px" : "0px",
  });

  const handleCheckboxClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <label>
        Expand Form
        <input
          type='checkbox'
          checked={expanded}
          onChange={handleCheckboxClick}
        />
      </label>

      {/* Animated 컴포넌트를 사용하여 스타일이 변경될 때 애니메이션 적용 */}
      <animated.div style={{ overflow: "hidden", ...formAnimation }}>
        <form>
          {/* 여기에 폼 요소들 추가 */}
          <label>
            Input 1:
            <input type='text' />
          </label>
          <label>
            Input 2:
            <input type='text' />
          </label>
          {/* 추가적인 폼 요소들... */}
        </form>
      </animated.div>
    </div>
  );
};

export default ExpandingForm;
