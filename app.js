import express from 'express';
import { readFile, writeFile } from 'fs';
import path from 'path';

const app = express();

app.use('/', express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/new', function (req, res) {
    res.sendFile(path.resolve('public/templates/new.html'));
})

app.post('/new', function (req, res) {

    readFile('./data/persons.json', function (err, data) {

        const persons = (err) ? [] : JSON.parse(data.toString())

        persons.push({
            id: persons.length + 1,
            name: req.body.name,
            type: req.body.type
        })

        writeFile('./data/persons.json', JSON.stringify(persons), function (err) {
            console.log(err)
        })

        res.send('Se agrego correctamente...')
    })

}
)

app.get('/persons', function (req, res) {
    readFile('./data/persons.json', function (err, data) {
        const persons = err ? [] : JSON.parse(data.toString())
        res.write(`
        <html>
          <body>
          <ul>
          `)

        for (let i = 0; i < persons.length; i++) {
            res.write(`
            <li> Nombre: ${persons[i].name} </li>
            <li> Tipo: ${persons[i].type} </li>
          `)
        }

        res.write('</ul></body></html>')

    })
})

app.listen(1880, function () {
    console.log("me conecté a http://localhost:1880")
})