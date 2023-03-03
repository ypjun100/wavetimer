import './feedbackcard.css';

export default function FeedbackCard() {
    return (
        <div className="card-feedback">
            <div className='card-header'>
                <div className='card-header-line'></div>
                <img src={require('../../../assets/images/people.png')} alt="feedback"/>
                <div className='card-header-line'></div>
            </div>
            <div className='spacer-10'></div>
            <p className='card-title' style={{padding: '15px 0'}}>Just give me your any feedback about wavetimer!</p>
            <div className='spacer-10'></div>
            <input type="text" placeholder='E-mail Address'></input>
            <div className='spacer-5'></div>
            <textarea placeholder='Any feedback idea' rows='3'></textarea>
            <div className='spacer-20'></div>
            <div className='card-send'>
                <div className='feedback-process'>
                    <img src={require('../../../assets/images/questionmark.png')} alt="feedback process"/>
                    <p>Feedback process</p>
                </div>
                <div className='button-send'>
                    <img src={require('../../../assets/images/paperplane.png')} alt="send"/>
                    <p>Send</p>
                </div>
            </div>
        </div>
    )
}