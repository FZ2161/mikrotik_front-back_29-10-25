import Chip from "@mui/material/Chip";
import { useState } from "react";


const getData = async () => {
    
}


function M_status() {

    const [connected, setConnected] = useState(false);
    const [cpu, setCpu] = useState("0");
    const [ram, setRam] = useState("0");

    return (
        <div className="status">
            <Chip label="primary" />

            <p>{cpu}</p>
            <p>{ram}</p>
        </div>
    )
}

export default M_status;