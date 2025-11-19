import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';


export default function ItemThree() {
    const [data, setData] = useState(null);
    const [selected, setSelected] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelected = (id) => {
        // setSelectedIds((prevSelectedIds) =>
        //     prevSelectedIds.includes(id)
        //         ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        //         : [...prevSelectedIds, id]
        // );
        
        //set toggle button selected based on if it is enabled or disabled
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter((selectedId) => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        });
    }

    const isSelected = (id) => selectedIds.includes(id);


    const getData = async () => {

        try {
            const url = `http://localhost:3005/firewall`;
            const response = await fetch(url);
            const json = await response.json();
            console.log("data", json);
            setData(json);

        } catch (error) {
            setData(null);
            console.error(error);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    //działa, ale nie ustawia toggle buttona od razu

    const changeSelected = async (id) => {
        try {
            const url = `http://localhost:3005/firewall/${encodeURIComponent(id)}/enable/${isSelected(id) ? 0 : 1}`;
            const response = await fetch(url);
            const json = await response.json();
            console.log("enable response", json);
            getData();

        } catch (error) {
            console.error(error);
        }
    }

    const isPositiveAction = (action) => {
        if (action === null || action === undefined) return false;
        return action === 'accept' ? true : false;
    }

    return (
        <div>
            <Box sx={{ width: 500 }}>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell></TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Chain</TableCell>
                                <TableCell>Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 ? (
                                data.map((row, idx) => (
                                    <TableRow
                                        key={row.id ?? idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>
                                            <ToggleButton
                                                value="check"
                                                selected={isSelected(row.id ?? idx)}
                                                onChange={() => {
                                                    toggleSelected(row.id ?? idx)
                                                    changeSelected(row.id ?? null)
                                                }}
                                            >
                                                {isSelected(row.id ?? idx) ? 'On' : 'Off'}
                                            </ToggleButton>
                                        </TableCell>
                                        <TableCell>
                                            {isPositiveAction(row.action) ? (
                                                <CheckIcon sx={{ color: 'success.main' }} aria-label="positive" />
                                            ) : (
                                                <CloseIcon sx={{ color: 'error.main' }} aria-label="negative" />
                                            )}
                                        </TableCell>
                                        <TableCell>{row.chain}</TableCell>
                                        <TableCell>{row.comment}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        {data === null ? 'Ładowanie...' : 'Brak danych'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </div>
    );
}

