import './Vizualization.css';
import DBody from './3dBody/3dBody'

export default function Vizualization(props) {
    return (
        <div className="vizualization">
            <h1>VISUALIZATION</h1>
            <DBody bonesPositions={props.bonesPositions}/>
        </div>
    )
}