//QUERY STRING
// no pasar datos sensibles por query String, ya q son datos visibles, por ser una peticion get
// variable    lo q contiene la variable o el valor del query string
// q=          who+are+you

// info sensible o cifrada, usar HTTP body
// normalmente se pasan id

const express = require('express'); //se importa la dependencia -- inyeccion de dependencia

let app = express(); //desclaramos una App de Express 
let port = process.env.PORT || 3000; //setteamos el puerto para que escuche el servidor -- definimos puerto de escucha
app.use('/assets', express.static(__dirname + '/public')); //contenido estatico

app.use(express.urlencoded({ extended: false })); //aqui se especifica que se va a parsear peticiones con URL encoded payload (datos dentro de body)

app.set('view engine', 'ejs'); //hace q nuestra 'app' de 'express' use 'EJS' como motor de vistas

//primera ruta (esta al nivel de la raiz /), Hello World! ROUTE HANDLER
app.get('/', function (req, res) {
    //insertar etiqueta <link>
    res.send(`<!DOCTYPE html> <html lang="en"> <head><link rel="stylesheet" href="assets/style.css"/>
    <title> Document </title> </head>
    <body> <h1> Hola mundo </h1>
    <p>Este es un parrafo y su contenido debe ser azul!</p></body> </html>`);
});


//aqui se recibe un parametro
// app.get('/person/:id', function(req, res) {
//     res.send(`<!DOCTYPE html> <html lang="en"> <head><link rel="stylesheet" href="assets/style.css"/>`);
// }); -- se modifica a:
app.get('/person/:id', function(req, res) {
    res.render('person', {ID: req.params.id, Qstr: req.query.qrst});
});

app.get('/message/:id', function(req,res) {
    res.render('message', {ID: req.params.id, message: req.query.message, times: req.query.times})
});

//ruta student: POST - la ruta /student respondera al form, GET - renderiza la vista index.ejs
app.post('/student', (req,res) => {
    res.send(`First Name es: ${req.body.fname}, Last name es: ${req.body.lname}`);
})

app.get('/student', (req, res) => {
    res.render('index');
})

//cuando llegue algo, se va a parsear
//enviamos como paramettro extra, el callback, para que se ejecute antes que el route handler
app.post('/personjson', express.json({type: '*/*'}), (req, res) => {
    console.log('El objeto contiene:', (req.body));
    console.log('Nombre:', req.body.firstname);
    console.log('Apellido:', req.body.lastname);
});


// desde la pagina web se puede mandar un elemnto con un formato diferente desde mi servidor para impriirlo o llevarlo al lugar donde se necesario



app.listen(port); //levantar el server y ponerlo a la escucha