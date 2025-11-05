import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import { useState } from "react";
import ComputerIcon from '@mui/icons-material/Computer';
import MemoryIcon from '@mui/icons-material/Memory';

function M_status() {

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {

        try {
            const response = await fetch('http://localhost:3005/status');
            const json = await response.json();

            setCpu(json['cpu-load']);
            // setRam((json['total-memory'] - json['free-memory']) / json['total-memory'] * 100 .toFixed(2) + "%");
            setRam(json['free-memory']);

            setConnected(true);

            console.log(json);

        } catch (error) {
            setCpu('0');
            setRam('0');

            setConnected(false);
        }
    }

    const [connected, setConnected] = useState(false);
    const [cpu, setCpu] = useState("0");
    const [ram, setRam] = useState("0");

    return (
        <div className="status">
            {
                connected ? <Chip label="connected" color="success" /> : <Chip label="disconnected" color="error" />
            }
            <ComputerIcon />
            <p>{cpu}</p>
            <MemoryIcon />
            <p>{ram}</p>
        </div>
    )
}

export default M_status;