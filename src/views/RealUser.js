import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import {useLocation} from "react-router-dom";

function SuccessView() {
    const [data, setData] = useState({});
    let location = useLocation();

    useEffect(() => {
        setData(location.state.results);
    }, [location.state.results]);

    return (
        <div>
            <h1>Success!</h1>
            <ReactJson src={data} />;
        </div>
    )
}

export default SuccessView;
