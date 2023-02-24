import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setDarkTheme } from "../../slices/themeSlice";

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
            
        </div>
    )
}