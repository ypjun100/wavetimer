import './signincard.css';

export default function SignInCard() {
    return (
        <div className='card-sign-in'>
            <div className='card-header'>
                <div className='card-header-line'></div>
                <img src={require('../../../assets/images/person.png')} alt="feedback" style={{width: '18px'}}/>
                <div className='card-header-line'></div>
            </div>
            <div className='spacer-10'></div>
            <p className='card-title'>Sign In</p>
            <p className='card-sub-title'>You’re gonna get synchronized timer feature<br/>if you sign in.</p>
            <div className='spacer-20'></div>
            <input type="text" placeholder='E-mail Address'></input>
            <div className='spacer-5'></div>
            <input type="text" placeholder='Password'></input>
            <div className='spacer-10'></div>
            <div className='card-divided-2'>
                <button className='light-gray'>Sign Up</button>
                <button className='blue'>Sign In</button>
            </div>
            <div className='spacer-5'></div>
            <p style={{fontSize: '10pt', color: '#A5A5A5', textAlign: 'center'}}>or</p>
            <div className='spacer-5'></div>
            <div className='card-divided-2'>
                <button className='border'><img src={require('../../../assets/images/google.png')} alt="sign in google"/>&nbsp;&nbsp;Sign In Google</button>
                <button className='border'><img src={require('../../../assets/images/facebook.png')} alt="sign in facebook"/>&nbsp;&nbsp;Sign In Facebook</button>
            </div>
        </div>
    )
}