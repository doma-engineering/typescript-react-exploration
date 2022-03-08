import { config, useTransition, animated } from "@react-spring/web";
import React, { useState } from "react";
import { candidat } from "./candidat";

const lineStiles = {
  line1: {
    backgroundColor: '#656620',
  },
  line2: {
    backgroundColor: '#8a6227',
  },
}

type TableParameters = {
  data: candidat[];
}

const Table: React.FC<TableParameters> = ({data}) => {
  const transitionData = data.map((condidatInfo, index) => 
  (
    {
      condidatInfo,
      position: {range: [0, 1], output: [0, index]},
      opacity: {range: [0, 0.2, 0.8, 1], output: [1, 0.7, 0.7, 1]},
    }
  ))

  const [animatedData, setAnimatedData] = useState(transitionData);

  //TODO: think how good idea sort data there (in table component)
  const sortAnimatedData = () => 
  {
    const sorted = animatedData.sort((con1, con2) => (con2.condidatInfo.score-con1.condidatInfo.score));
    setAnimatedData(sorted.map((line, index) => 
    {
      return{
      ...line,
      position: {range: [0, 1], output: [line.position.output[1], index]}
    }}));
  };

  const animatedDataIsSorted = (): boolean => 
  {
    for (let i=1; i<animatedData.length; i++)
    {
      if(animatedData[i-1].condidatInfo.score < animatedData[i].condidatInfo.score)
      {
        return false;
      }
    }
    return true;
  }

  //sort if not sorted
  if (! animatedDataIsSorted()) 
  {
    sortAnimatedData();
  }

  const transitions = useTransition(animatedData, 
  {
    from: { opacity: 0, position: 0 },
    enter: { opacity: 1, position: 1 },
    config: {...config.default, duration: 600},
  });

  const height = 1.6;

  return(
    <table className='table'>
      <tbody>
        {
          transitions(({opacity, position}, condidateLine) => 
          (
            <animated.tr 
              style={{
                position: "absolute",
                opacity: opacity.to(condidateLine.opacity),
                transform: position.to(condidateLine.position).to(y => `translate3d(0,${height*y}rem,0)`),
              }}>
              <td>
                {condidateLine.condidatInfo.nick}: {condidateLine.condidatInfo.score}
              </td>
            </animated.tr>
          ))
        } 
      </tbody>
    </table>
  );
}

export default Table;