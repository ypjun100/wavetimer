import { useEffect } from 'react';
import './overlaycard.css';

import FeedbackCard from './FeedbackCard/FeedbackCard';
import SomethingIsWrongCard from './SomethingIsWrongCard/SomethingIsWrongCard';

export default function OverlayCard(props) {
    useEffect(() => {
        document.getElementsByClassName('overlay-card')[0].onclick = (e) => {
            if(e.target.className === 'overlay-card')
                props.setVisible(false);
        };
    }, []);

    return (
        <div className="overlay-card" style={{display: props.visible ? 'block' : 'none'}}>
            <div className="card">
                {props.content === "SomethingIsWrongCard" && <SomethingIsWrongCard />}
                {props.content === "FeedbackCard" && <FeedbackCard />}
            </div>
        </div>
    )
}