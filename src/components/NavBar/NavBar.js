import './NavBar.css'
import tennis from './../../images/tennis.png'
export default function NavBar() {
    return(
        <div id="NavBar">
            <img src={tennis}/>
            <h1>Bonjour</h1>
            <ul>
                <li>HISTORY</li>
                <li className="selected">WALK CAPTURE</li>
            </ul>
        </div>
    )
}