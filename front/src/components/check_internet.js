import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import { useState } from "react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
        <div>
            <Stack spacing={2} direction="row">
                <Button color={internetConnection ? "success" : "error"} onClick={getData} variant="contained" >
                    Check internet
                </Button>
            </Stack>
            <ToggleButtons />           
        </div>
    )
}

export default Internet_connection;