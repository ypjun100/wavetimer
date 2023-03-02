import { useEffect } from 'react';
import './overlaycard.css';

export default function OverlayCard(props) {
    useEffect(() => {
        document.getElementsByClassName('overlay-card')[0].onclick = (e) => {
            if(e.tartget == this)
                props.setVisible(false);
        };
        document.getElementsByClassName('card')[0].onclick = (e) => {
            e.stopPropagation();
        };
    }, []);

    return (
        <div className="overlay-card" style={{display: props.visible ? 'block' : 'none'}}>
            <div className="card">
                <div className='card-header'>
                    <div className='card-header-line'></div>
                    <img src={require('../../assets/images/people.png')} />
                    <div className='card-header-line'></div>
                </div>
                <p className='card-title' style={{padding: '15px 0'}}>Just give me your any feedback about wavetimer!</p>
                <input type="text" placeholder='E-mail Address'></input>
                <div className='spacer-5'></div>
                <textarea placeholder='Any feedback idea' rows='3'></textarea>
                <div className='spacer-20'></div>
                <div className='card-send'>
                    <div className='feedback-process'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}