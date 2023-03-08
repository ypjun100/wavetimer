import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './index.css';

import { setDarkTheme, switchTheme as doSwitchTheme } from "../../slices/themeSlice";
import OverlayCard from "../../components/OverlayCard/OverlayCard";

export default function Index() {
    const theme = useSelector((state) => state.theme);
    const savedTheme = window.localStorage.getItem('theme');
    const [overlayContent, setOverlayContent] = useState('SomethingIsWrongCard');
    const [overlayVisible, setOverlayVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(savedTheme) {
            if(savedTheme == 'dark') {
                dispatch(setDarkTheme());
            }
        } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            dispatch(setDarkTheme());
            window.localStorage.setItem('theme', 'dark');
        }
    }, []);

    // when theme value changed
    // useEffect(() => {
    //     console.log('change received');
    // }, [theme]);

    // show feedback overlay
    function showFeedback() {
        setOverlayContent('FeedbackCard');
        setOverlayVisible(true);
    }

    // show sign in overlay
    function showSignIn() {
        setOverlayContent('SignInCard');
        setOverlayVisible(true);
    }

    // switch theme
    function switchTheme() {
        dispatch(doSwitchTheme());
        window.localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    }

    // show settings overlay
    function showSettings() {
        setOverlayContent('SettingsCard');
        setOverlayVisible(true);
    }

    return (
        <div className="index">
            <div className="header">
                <div className="logo" title="wavetimer">
                    <img src={require('../../assets/images/logo.png')} alt="logo"/>
                    <h2>wavetimer</h2>
                </div>
                <div className="menu">
                    <button className="icon button-header" onClick={switchTheme}><img src={require(`../../assets/images/theme-${theme}.png`)} alt="switch theme"/></button>
                    <button className="icon button-header" onClick={showSettings}><img src={require(`../../assets/images/settings-${theme}.png`)} alt="settings"/></button>
                    <button className={"button-header " + theme + "-gray"} onClick={showFeedback}>Feedback</button>
                    <button className="button-header blue" onClick={showSignIn}>Sign In</button>
                </div>
            </div>
            <OverlayCard visible={overlayVisible} setVisible={setOverlayVisible} setContent={setOverlayContent} content={overlayContent}/>
        </div>
    )
}