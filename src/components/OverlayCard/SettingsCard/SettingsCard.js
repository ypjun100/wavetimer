import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setBreakSeconds } from '../../../slices/breakSecondsSilce';

import { setInitialSeconds } from '../../../slices/initialSecondsSlice';
import { setNumberOfTimes } from '../../../slices/numberOfTimesSlice';

export default function SettingsCard() {
    const presetStudySeconds = [5, 1800, 2400, 2700, 3000, 3300, 3600];
    const presetBreakSeconds = [0, 300, 600, 900, 1200];
    const initialSeconds = useSelector((state) => state.initialSeconds);
    const breakSeconds = useSelector((state) => state.breakSeconds);
    const dispatch = useDispatch();

    useEffect(() => {
        const studyTimeSelect = document.getElementById('study-time');
        const studyTimeSelectOptions = studyTimeSelect.options;
        const breakTimeSelect = document.getElementById('break-time');
        const breakTimeSelectOptions = breakTimeSelect.options;

        // Study time
        presetStudySeconds.map((seconds, index) => {
            if(seconds == initialSeconds) {
                studyTimeSelectOptions.selectedIndex = index;
            }
        });

        // Break time
        presetBreakSeconds.map((seconds, index) => {
            if(seconds == breakSeconds) {
                breakTimeSelectOptions.selectedIndex = index;
            }
        });
    }, []);

    function secondsToTime(seconds) {
        const min = ('0' + parseInt(seconds / 60)).slice(-2);
        const sec = ('0' + seconds % 60).slice(-2);
        return `${min}:${sec}`
    }

    function onStudyTimeChanged() {
        const _initialSeconds = presetStudySeconds[document.getElementById('study-time').options.selectedIndex];
        window.localStorage.setItem('initialSeconds', _initialSeconds);
        dispatch(setInitialSeconds(_initialSeconds));
    }

    function onBreakTimeChanged() {
        const _breakSeconds = presetBreakSeconds[document.getElementById('break-time').options.selectedIndex];
        window.localStorage.setItem('breakSeconds', _breakSeconds);
        dispatch(setBreakSeconds(_breakSeconds));
    }

    function onRestIntervals() {
        dispatch(setNumberOfTimes(0));
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
                {presetStudySeconds.map((seconds, index) => {
                    return (<option key={index} value={secondsToTime(seconds)}>{secondsToTime(seconds)}</option>)
                })}
            </select>
            <div className='spacer-10'></div>
            <p style={{color: '#A9A9A9', fontSize: '10pt'}}>Break Time</p>
            <div className='spacer-5'></div>
            <select id="break-time" onChange={onBreakTimeChanged}>
                {presetBreakSeconds.map((seconds, index) => {
                    return (<option key={index} value={seconds != 0 ? secondsToTime(seconds) : 'skip'}>{seconds != 0 ? secondsToTime(seconds) : 'Skip'}</option>)
                })}
            </select>
            <div className='spacer-10'></div>
            <button className='light-gray full' style={{height: '35px', padding: '0 10px'}} onClick={onRestIntervals}>Reset Intervals</button>
        </div>
    )
}