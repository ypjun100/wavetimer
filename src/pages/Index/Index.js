import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setDarkTheme } from "../../slices/themeSlice";
import './index.css';

export default function Index() {
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            dispatch(setDarkTheme());
        }
    }, []);

    useEffect(() => {
        console.log('change received');
    }, [theme]);

    return (
        <div className="index">
            <div className="header">
                <div className="logo" title="wavetimer">
                    <img src={require('../../assets/images/logo.png')} />
                    <h2>wavetimer</h2>
                </div>
                <div className="right-header">
                    Right header
                </div>
            </div>
        </div>
    )
}