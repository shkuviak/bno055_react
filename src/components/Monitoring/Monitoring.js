import RawAxesChart from './Charts/RawAxesChart'
import './Monitoring.css'
import {useEffect, useState } from 'react';

export default function Monitoring(props) {
    const [datapitch, setDatapitch] = useState();
    const [datayaw, setDatayaw] = useState();
    const [dataroll, setDataroll] = useState();

    useEffect(() => {
        setDatapitch(props.bonesPosition.filter(x => x.bone == "leftLeg")[0].pitch);
        setDatayaw(props.bonesPosition.filter(x => x.bone == "leftLeg")[0].yaw);
        setDataroll(props.bonesPosition.filter(x => x.bone == "leftLeg")[0].roll);
    }, [props.bonesPosition]);

    return (
        <div className="monitoring" >
            <h1>MONITORING</h1>
            {/* <RawAxesChart data={props.bonesPositions.filter(x => x.bone == "leftLeg").length > 0 ? props.bonesPositions.filter(x => x.bone == "leftLeg")[0].pitch : null}/> */}
            <RawAxesChart data={datapitch} title="pitch"/>
            <RawAxesChart data={datayaw} title="yaw"/>
            <RawAxesChart data={dataroll} title="roll"/>
        </div>
    )
}