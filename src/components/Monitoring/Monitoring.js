import RawAxesChart from './Charts/RawAxesChart'
import './Monitoring.css'
import {useEffect, useState } from 'react';

export default function Monitoring(props) {

    return (
        <div className="monitoring" >
            <h1>MONITORING</h1>
            {/* <RawAxesChart data={props.bonesPositions.filter(x => x.bone == "leftLeg").length > 0 ? props.bonesPositions.filter(x => x.bone == "leftLeg")[0].pitch : null}/> */}
            <RawAxesChart data={{data: props.bonesPositions.filter(x => x.bone == "leftLeg")[0].pitch}}/>
            <RawAxesChart data={{data: props.bonesPositions.filter(x => x.bone == "leftLeg")[0].yaw}}/>
            <RawAxesChart data={{data: props.bonesPositions.filter(x => x.bone == "leftLeg")[0].roll}}/>
        </div>
    )
}