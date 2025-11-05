import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function ToggleButtons() {
    const [alignment, setAlignment] = React.useState(null);
    const [isActive, setIsActive] = useState(null);
    const [host, setHost] = useState('');
    const [count, setCount] = useState(1);

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
            const hostMap = { left: 'google.com', center: 'wp.pl', right: 'onet.pl' };
            const selectedHost = hostMap[newAlignment];
            setHost(selectedHost)
            getData(selectedHost, count);
        }
    };

    const getData = async (hostParam, cnt = count) => {

        try {
            const url = `http://localhost:3005/tool/internet?host=${encodeURIComponent(hostParam)}&count=${encodeURIComponent(cnt)}`;
            const response = await fetch(url);
            const json = await response.json();

            if (json[0]['status'] === "timeout")
                setIsActive(false);
            else
                setIsActive(true);

            console.log(json);

        } catch (error) {
            setIsActive(false);
        }
    }


    return (
        <>
            <h2 className='text-green'>{isActive != null ? (isActive ? `${host} connected` : `${host} not connected`) : 'click to check connection'}</h2>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                <ToggleButton value="left" aria-label="left aligned">
                    google.com
                </ToggleButton>
                <ToggleButton value="center" aria-label="centered">
                    wp.pl
                </ToggleButton>
                <ToggleButton value="right" aria-label="right aligned">
                    onet.pl
                </ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{ width: 300 }}>
                <Slider
                    value={count}
                    onChange={(e, newVal) => {
                        setCount(newVal);
                    }}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    step={1}
                    marks
                    min={1}
                    max={4}
                />
            </Box>

        </>
    );
}

