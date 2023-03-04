import { useEffect } from 'react';
import './overlaycard.css';

import FeedbackCard from './FeedbackCard/FeedbackCard';
import SomethingIsWrongCard from './SomethingIsWrongCard/SomethingIsWrongCard';
import SignInCard from './SignInCard/SignInCard';
import SignUpCard from './SignUpCard/SignUpCard';
import SettingsCard from './SettingsCard/SettingsCard';

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
                {
                    (() => {
                        if(props.content === "FeedbackCard") {
                            return (<FeedbackCard />);
                        } else if(props.content === "SignInCard") {
                            return (<SignInCard setContent={props.setContent}/>);
                        } else if(props.content === "SignUpCard") {
                            return (<SignUpCard setContent={props.setContent}/>)
                        } else if(props.content === "SettingsCard") {
                            return (<SettingsCard />)
                        }
                        return (<SomethingIsWrongCard />);
                    })()
                }
            </div>
        </div>
    )
}