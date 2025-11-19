import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import { useState } from "react";
import ComputerIcon from '@mui/icons-material/Computer';
import MemoryIcon from '@mui/icons-material/Memory';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Processor_chart from "./processor_chart";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function M_status() {
    const [connected, setConnected] = useState(false);
    const [cpu, setCpu] = useState("0");
    const [ram, setRam] = useState(null);
    const [cpuData, setCpuData] = useState([]);

    const [open, setOpenCpuModal] = React.useState(false);
    const handleOpenCpuModal = () => setOpenCpuModal(true);
    const handleCloseCpuModal = () => setOpenCpuModal(false);

    useEffect(() => {
        getData();
        const intervalId = setInterval(() => {
            getData();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    const getData = async () => {

        try {
            const response = await fetch('http://localhost:3005/status');
            const json = await response.json();

            setCpu(json['cpu-load']);
            setCpuData(prev => [...prev, json['cpu-load']]);
            setRam(prev => prev === null ? json['free-memory'] : prev);
            setConnected(true);

            console.log(json);

        } catch (error) {
            setCpu('0');
            // set ram to '0' only if it wasn't set previously
            setRam('0');

            setConnected(false);
        }
    }


    return (
        <div className="status">
            {
                connected ? <Chip label="connected" color="success" /> : <Chip label="disconnected" color="error" />
            }

            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleCloseCpuModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Processor_chart cpuData={cpuData} />

                    </Box>
                </Modal>

                <Modal
                    open={open}
                    onClose={handleCloseCpuModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Processor_chart cpuData={cpuData} />

                    </Box>
                </Modal>
            </div>



            <ComputerIcon onClick={handleOpenCpuModal} />
            <p>{cpu}</p>
            <MemoryIcon />
            <p>{ram}</p>
        </div>
    )
}
