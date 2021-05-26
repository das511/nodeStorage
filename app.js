const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000

app.get('/get', (req, res) => {
    fs.readFile("nodeStorage.json", "utf8", (error,data) => {
        if(error) throw error;
        res.json(data)
    })
})

app.get('/set/:thumbprint', (req, res) => {
    fs.writeFile("nodeStorage.json", JSON.stringify({thumbprint: req.params.thumbprint}), (error)=>{
        if(error) throw(error) });
    res.json({state: "writted"}) 
})

app.listen(port, () => console.log(`Example app listening on port port!`))