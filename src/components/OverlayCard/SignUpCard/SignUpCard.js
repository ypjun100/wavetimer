import './signupcard.css';

export default function SignUpCard(props) {
    function cancel() {
        props.setContent('SignInCard');
    }

    return (
        <div className="card-sign-up">
            <div className='card-header'>
                <div className='card-header-line'></div>
                <img src={require('../../../assets/images/person.png')} alt="feedback" style={{width: '18px'}}/>
                <div className='card-header-line'></div>
            </div>
            <div className='spacer-20'></div>
            <p className='card-title'>Sign Up</p>
            <div className='spacer-20'></div>
            <p style={{color: '#A9A9A9', fontSize: '10pt'}}>Account</p>
            <div className='spacer-5'></div>
            <input type="text" placeholder='E-mail Address'></input>
            <div className='spacer-5'></div>
            <input type="password" placeholder='Password'></input>
            <div className='spacer-5'></div>
            <input type="password" placeholder='Password Confirm'></input>
            <div className='spacer-10'></div>
            <p style={{color: '#A9A9A9', fontSize: '10pt'}}>User</p>
            <div className='spacer-5'></div>
            <input type="text" placeholder='First Name'></input>
            <div className='spacer-5'></div>
            <input type="text" placeholder='Last Name'></input>
            <div className='spacer-5'></div>
            <select>
                <option value="">Purpose of using this timer</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
            </select>
            <div className='spacer-20'></div>
            <div className='card-divided-2'>
                <button className='light-gray' onClick={cancel}>Cancel</button>
                <button className='blue'>Sign Up</button>
            </div>
        </div>
    )
}