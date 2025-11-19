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
    res.send(json)
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
    res.send(json)
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

    res.send(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/firewall/:id/enable', async (req, res) => {
  try {
    const id = req.params.id;
    const enable = req.body.enable;
    const disabled = !enable;

    const m_url = `http://${mikrotik_host}/rest/ip/firewall/filter/${encodeURIComponent(id)}`;
    console.log("Mikrotik URL:", m_url);

    const m_res = await fetch(m_url, {
      method: 'PATCH',
      headers: {
        "Authorization": "Basic YWRtaW46R2xvbm9qYWQx",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "disabled": disabled
      })
    });



    const json = await m_res.json();
    res.send(json);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



app.listen(3005, () => {
    console.log('running on port 3005');
})
