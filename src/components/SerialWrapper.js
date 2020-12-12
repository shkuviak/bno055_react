import { useEffect, useState } from 'react';

import Vizualization from './Vizualization/Vizualization'
import Monitoring from './Monitoring/Monitoring'

export default function SerialWrapper() {
    const [bonesPositions, setBonesPositions] = useState([{
        bone: "leftLeg",
        pitch: 0,
        yaw: 0,
        roll: 0
    }]);

    useEffect(() => {
        let interval = setInterval(() => {
            setBonesPositions([{
                bone: "leftLeg",
                pitch:  Math.random() * (2000),
                yaw: 0,
                roll: 0
            }, {
                bone: "rightLeg",
                pitch: Math.random() * (2000),
                yaw: 0,
                roll: 0
            }]);
        }, 100);

        return () => clearInterval(interval);
      }, []);

    return (
        <>
        <Monitoring bonesPositions={bonesPositions}/>
        <Vizualization bonesPositions={bonesPositions}/>
        </>
    )
}