import { useEffect, useState } from 'react';

import Vizualization from './Vizualization/Vizualization'
import Monitoring from './Monitoring/Monitoring'

import socketIOClient from "socket.io-client";
const ENDPOINT = "/";

export default function SerialWrapper() {
    const [bonesPositions, setBonesPositions] = useState([{
        bone: "leftLeg",
        pitch: 0,
        yaw: 0,
        roll: 0
    }, {
        bone: "leftUpLeg",
        pitch: 0,
        yaw: 0,
        roll: 0
    }]);

    const [lowRatePos, setLowRatePos] = useState([{
        bone: "leftLeg",
        pitch: 0,
        yaw: 0,
        roll: 0
    }]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('serial data', data => {
            let jsData = JSON.parse(data);
            let d = [];
            d[0] = jsData[0];
            d[0]['bone'] = "leftLeg";

            d[1] = jsData[1];
            d[1]['bone'] = "rightLeg";

            d[2] = jsData[2];
            d[2]['bone'] = "leftUpLeg";

            d[3] = jsData[3];
            d[3]['bone'] = "rightUpLeg";

            setBonesPositions(d);            
        })

        return () => socket.disconnect();
    }, []);

    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         setBonesPositions([{
    //             bone: "leftLeg",
    //             pitch:  Math.random() * (2000),
    //             yaw: 0,
    //             roll: 0
    //         }, {
    //             bone: "rightLeg",
    //             pitch: Math.random() * (2000),
    //             yaw: 0,
    //             roll: 0
    //         }]);
    //     }, 1000);

    //     return () => clearInterval(interval);
    //   }, []);

    return (
        <>
        <Monitoring bonesPositions={lowRatePos}/>
        <Vizualization bonesPositions={bonesPositions}/>
        </>
    )
}