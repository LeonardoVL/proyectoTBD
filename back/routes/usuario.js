import express from 'express';
import Usuario from '../models/Usuario.js';
import { calcularMulta } from '../queries.js';

const router = express.Router();

//GET: Get all users
router.get('/', async (req, res) => {
    try {
        const users = await Usuario.find();
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/multas', async (req, res) => {
    try{
        const dniUsuario = req.query.usuario;
        const data = await calcularMulta(dniUsuario);
        res.json(data);
    }catch(error){
        res.json({ message: error });
    }
});

//GET: Get a user
router.get('/:userId', async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.json({ message: error });
    }
});

//POST: Create a user
router.post('/', async (req, res) => {
    const user = new Usuario({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        DNI: req.body.DNI,
        IDTipoUsuario: req.body.IDTipoUsuario,
        IDTipoEstado: req.body.IDTipoEstado,
        domicilio: req.body.domicilio,
        facultad: req.body.facultad,
        correo: req.body.correo,
        telefono: req.body.telefono,
        fechaNacimiento: req.body.fechaNacimiento,
        reservasActivas: req.body.reservasActivas
    });
    
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT: Update a user
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await Usuario.updateOne(
            { _id: req.params.userId },
            { $set: { name: req.body.name } }
        );
        res.json(updatedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Delete all users
router.delete('/', async (req, res) => {
    try {
        const removedUsers = await Usuario.remove();
        res.json(removedUsers);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Delete a user
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await Usuario.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch (error) {
        res.json({ message: error });
    }
});



export default router;