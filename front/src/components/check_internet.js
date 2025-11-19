import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import { useState } from "react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ToggleButtons from "./toggle_button";

function Internet_connection() {

    // useEffect(() => {
    //     getData();
    // }, []);

    const getData = async () => {

        try {
            const response = await fetch('http://localhost:3005/tool/internet');
            const json = await response.json();
            
                if(json[0]['status'] === "timeout" )
                    setInternetConnection(false);
                else
                    setInternetConnection(true);

            console.log(json);

        } catch (error) {
            setInternetConnection(false);
        }
    }

    const [internetConnection, setInternetConnection] = useState(true);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // minHeight: '60vh',
            gap: 2,
            p: 2
        }}>
            <Stack spacing={2} direction="row">
                <Button color={internetConnection ? "success" : "error"} onClick={getData} variant="contained" >
                    Check internet
                </Button>
            </Stack>
        </Box>
    )
}

export default Internet_connection;