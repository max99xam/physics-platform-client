const express = require('express');
const cors = require('cors');
const EventEmitter = require('events')

const addon = require('napi-physics-modeling-oop');

const PORT = 5000;

const emitter = new EventEmitter();

const app = express()

app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    })
    console.log("connected")
    emitter.on('newData', (message) => {
        res.write(`data: ${JSON.stringify(message)} \n\n`)
    })


})

app.post('/nextLayer', ((req, res) => {
    const { lambda, tau, n1, reload, type} = req.body;
    console.log(lambda, tau, n1);

    //emitter.emit('newData', {lambda, tau, n1})



    intervalData(lambda, tau, n1, reload, type);

    res.status(200)
    res.json({ lambda, tau, n1 })
}))

const intervalData = async (lambda, tau, n1, reload, type) => {
    let data = {};

    if (type == "2D") {

        const condition = [+lambda, +tau, +n1];
        const reload = false;


        data = await addon.getFDTD_2D(condition, reload);

        // for(let i = 0; i <= 30; ++i){
        //   data = await addon.getFDTD_2D(condition, reload);
        // }

        // let dataX = data.dataX;
        // let dataY = data.dataY;

        // res.status(200).json({
        //     dataX: data.dataX,
        //     dataY: data.dataY,
        //     row: data.row,
        //     col: data.col,
        // });



        setInterval(async () => {
           // const obj = { message: Math.random(), id: Math.random() };
            data = await addon.getFDTD_2D(condition, reload);
            console.log(data)
            emitter.emit('newData', data);
        }, 3000)

    }
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))