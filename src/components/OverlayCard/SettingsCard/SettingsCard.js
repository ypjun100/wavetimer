export default function SettingsCard() {
    return (
        <div className="card-settings">
            <div className='card-header'>
                <div className='card-header-line'></div>
                <img src={require('../../../assets/images/settings-light.png')} alt="settings" style={{width: '18px', opacity: '0.4'}}/>
                <div className='card-header-line'></div>
            </div>
            <div className='spacer-20'></div>
            <p className='card-title'>Settings</p>
            <div className='spacer-20'></div>
            <p style={{color: '#A9A9A9', fontSize: '10pt'}}>Study Time</p>
            <div className='spacer-5'></div>
            <select>
                <option value="30:00">30:00</option>
                <option value="40:00">40:00</option>
                <option value="45:00">45:00</option>
                <option value="50:00">50:00</option>
                <option value="55:00">55:00</option>
                <option value="60:00">60:00</option>
            </select>
            <div className='spacer-10'></div>
            <p style={{color: '#A9A9A9', fontSize: '10pt'}}>Break Time</p>
            <div className='spacer-5'></div>
            <select>
                <option value="None">Skip</option>
                <option value="05:00">05:00</option>
                <option value="10:00">10:00</option>
                <option value="15:00">15:00</option>
                <option value="20:00">20:00</option>
            </select>
            <div className='spacer-10'></div>
            <button className='light-gray full' style={{height: '35px', padding: '0 10px'}}>Reset Intervals</button>
        </div>
    )
}