const express = require('express');
const bodyParser = require("body-parser");
const app = express()
const editor = require("./Notes");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    bodyParser.json({
        verify: (req, res, buf, encoding) => { req.rawBody = buf.toString(); },
    })(req, res, (err) => {
        const origin = req.get('origin');

        // TODO Add origin validation
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');


        if (err) {
            //console.log(err);
            res.sendStatus(400);
            return;
        }
        next();
    });
});


app.get('/', async (req, res) => {
    const text = await editor.read();
    res.send(text);
})

app.get('/notes/:id', async (req, res) => {
    let id = req.params.id;
    const text = await editor.get(id);
    res.send(text);
})

app.post('/', async (req, res) => {
    console.log(req.body);
    let note = await editor.insert(req.body);
    //res.send({message: 'Got a POST request'}, {note: note});
    res.json({response: {message: 'Got a POST request'}, note: note});
})

app.put('/notes/:id', async (req, res) => {
    let id = req.params.id;
    await editor.update(req.body, id);
    res.send({message: 'Note updated successfully'});
})

app.delete('/notes/:id', async (req, res) => {
    let id = req.params.id;
    await editor.delete(id);
    res.send({message: 'Note deleted successfully'});
})

app.listen(4242, () => {
    console.log('Server is running...');
})