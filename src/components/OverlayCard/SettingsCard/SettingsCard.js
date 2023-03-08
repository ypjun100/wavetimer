import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { setInitialSeconds } from '../../../slices/initialSecondsSlice';

export default function SettingsCard() {
    const presetStudySeconds = [1800, 2400, 2700, 3000, 3300, 3600];
    const presetBreakSeconds = [300, 600, 900, 1200];
    const initialSeconds = useSelector((state) => state.initialSeconds);
    const dispatch = useDispatch();

    useEffect(() => {
        const initialStudyTime = secondsToTime(initialSeconds);
        const studyTimeSelect = document.getElementById('study-time');
        const studyTimeSelectOptions = studyTimeSelect.options;

        console.log(initialStudyTime);

        presetStudySeconds.map((seconds, index) => {
            if(seconds == initialSeconds) {
                studyTimeSelectOptions.selectedIndex = index;
            }
        });
    }, []);

    function secondsToTime(seconds) {
        const min = ('0' + parseInt(seconds / 60)).slice(-2);
        const sec = ('0' + seconds % 60).slice(-2);
        return `${min}:${sec}`
    }

    function onStudyTimeChanged() {
        const initialSeconds = presetStudySeconds[document.getElementById('study-time').options.selectedIndex];
        window.localStorage.setItem('initialSeconds', initialSeconds);
        dispatch(setInitialSeconds(initialSeconds));
    }

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
            <select id="study-time" onChange={onStudyTimeChanged}>
                {
                    presetStudySeconds.map((seconds, index) => {
                        return (<option key={index} value={secondsToTime(seconds)}>{secondsToTime(seconds)}</option>)
                    })
                }
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