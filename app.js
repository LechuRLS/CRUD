const express = require('express');
const app = express();
const port = 3000;

// Middleware para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos de ejemplo
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// GET /usuarios - Lista todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// GET /usuarios/:nombre - Obtener un usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// POST /usuarios - Crear nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
});

// PUT /usuarios/:nombre - Actualizar un usuario por nombre
app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());

    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...req.body };
        res.json({ mensaje: 'Usuario actualizado', usuario: usuarios[index] });
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// DELETE /usuarios/:nombre - Eliminar un usuario por nombre
app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuariosFiltrados = usuarios.filter(u => u.nombre.toLowerCase() !== nombre.toLowerCase());

    if (usuariosFiltrados.length === usuarios.length) {
        return res.status(404).send('Usuario no encontrado');
    }

    usuarios = usuariosFiltrados;
    res.json({ mensaje: 'Usuario eliminado correctamente' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
