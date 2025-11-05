const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

//endpoint pobierający i wysyłający dane z mikrotika

const mikrotik_host = "172.16.15.177"

app.get('/status', async (req, res) => {


    const m_res = await fetch(`http://${mikrotik_host}/rest/system/resource`, {
        headers: {
            "Authorization": "Basic YWRtaW46R2xvbm9qYWQx"
        }
    })
    const json = await m_res.json()
    res.json(json)
    console.log(json)
})

app.get('/tool/internet', async (req, res) => {

    const host = req.query.host || 'google.com';
    const count = req.query.count || 1;


    const m_res = await fetch(`http://${mikrotik_host}/rest/ping`, {
        method: 'POST',
        headers: {
            "Authorization": "Basic YWRtaW46R2xvbm9qYWQx",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "address": host,
            "count": count
        })  
    })
    const json = await m_res.json()
    res.json(json)
    console.log(json)
})



app.listen(3005, () => {
    console.log('running on port 3005');
})
