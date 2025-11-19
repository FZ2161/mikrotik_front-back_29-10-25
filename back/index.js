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


app.get('/firewall', async (req, res) => {
  try {
    const m_res = await fetch(`http://${mikrotik_host}/rest/ip/firewall/filter`, {
      method: 'GET',
      headers: {
        "Authorization": "Basic YWRtaW46R2xvbm9qYWQx",
        "content-type": "application/json",
      }
    });

    const json = await m_res.json();

    const mapped = json.map(item => ({
      id: item[".id"] || "",
      empty: "",
      action: item.action || "",
      chain: item.chain || "",
      comment: item.comment || "",  
    }));

    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(3005, () => {
    console.log('running on port 3005');
})
