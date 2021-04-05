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

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('serial data', data => {
            let jsData = JSON.parse(data);
            let d = [];
            d[0] = jsData[0];
            d[0]['bone'] = "leftLeg";

            d[1] = jsData[1];
            d[1]['bone'] = "leftUpLeg";

            // d[2] = jsData[2];
            // d[2]['bone'] = "leftUpLeg";

            // d[3] = jsData[3];
            // d[3]['bone'] = "rightUpLeg";

            setBonesPositions(d); 
        })

        return () => socket.disconnect();
    }, []);

    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         setLowRatePos([{
    //             bone: "leftLeg",
    //             pitch:  bonesPositions[0].pitch,
    //             yaw: bonesPositions[0].yaw,
    //             roll: bonesPositions[0].roll
    //         }, {
    //             bone: "LeftUpLeg",
    //             pitch: bonesPositions[1].pitch,
    //             yaw: bonesPositions[1].yaw,
    //             roll: bonesPositions[1].roll
    //         }]);

    //         console.log(bonesPositions);
    //     }, 1000);

    //     return () => clearInterval(interval);
    //   }, []);

    return (
        <>
        <Monitoring bonesPosition={bonesPositions}/>
        <Vizualization bonesPositions={bonesPositions}/>
        </>
    )
}