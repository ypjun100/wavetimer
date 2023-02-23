import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Index() {
    const theme = useSelector((state) => state.theme);

    useEffect(() => {
        console.log('change received');
    }, [theme]);

    return (
        <div className="index">
            
        </div>
    )
}