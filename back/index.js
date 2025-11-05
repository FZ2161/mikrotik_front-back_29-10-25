const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

//endpoint pobierający i wysyłający dane z mikrotika

const mikrotik_host = "172.16.15.157"
const m_user = "admin"
const m_pass = "Glonojad1"

app.get('/status', async (req, res) => {


    const m_res = await fetch(`https://${mikrotik_host}/rest/system/resource`, {
        headers: {
            "Authorization": "Basic YWRtaW46R2xvbm9qYWQx"
        }
    })
    const json = await m_res.json()
    res.json(json)
    console.log(json)
})

app.listen(3000, () => {
    console.log('running on port 3000');
})
