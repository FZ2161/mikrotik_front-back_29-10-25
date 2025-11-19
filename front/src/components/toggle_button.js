import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function ToggleButtons() {
    const [alignment, setAlignment] = React.useState(null);
    const [isActive, setIsActive] = useState(null);
    const [host, setHost] = useState('');
    const [count, setCount] = useState(1);
    const [pingData, setPingData] = useState(null); 

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
            setPingData(json);

        } catch (error) {
            setIsActive(false);
            setPingData(null);
        }
    }

    const minRtt = pingData && (pingData[pingData.length - 1]['min-rtt'] ?? "-");
    const maxRtt = pingData && (pingData[pingData.length - 1]['max-rtt'] ?? "-");
    return (
        <div>
            <Box sx={{ width: 300 }}>
                <h2 className='text-green'>{isActive != null ? (isActive ? `${host} connected` : `${host} not connected`) : 'click to check'}</h2>
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


                <Slider
                    value={count}
                    onChange={(e, newVal) => {
                        setCount(newVal);
                    }}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={4}
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>min</TableCell>
                                <TableCell align="right">max</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows.map((row) => ( */}
                                <TableRow
                                    // key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {minRtt != null ? minRtt : '-'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {maxRtt != null ? maxRtt : '-'}
                                    </TableCell>
                                </TableRow>
                            {/* ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </div>
    );
}

