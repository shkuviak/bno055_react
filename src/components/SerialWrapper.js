import { useEffect, useState } from 'react';

import Vizualization from './Vizualization/Vizualization'

export default function SerialWrapper() {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
          setAngle(angle + 100);
        }, 1000);
      });

    return (
        <Vizualization angle={angle}/>
    )
}