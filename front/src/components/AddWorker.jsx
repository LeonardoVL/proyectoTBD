import React, { useEffect, useState } from 'react';
import SubTitle from './SubTitle';
import axios from 'axios';

const AddWorker = () => {
    const [workerTypes, setWorkerTypes] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correoTrabajador: '',
        inicioTurno: '',
        finTurno: '',
        IDTipoUsuario: '',
        IDTipoEstado: '66af0d9aea3fd402510c328a',
        fechaNacimiento: ''
    });

    // Consulta para obtener los tipos de usuario con axios (ajusta la URL según tu API)
    const getWorkerTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/tipousuario');
            setWorkerTypes(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect para obtener los tipos de usuario
    useEffect(() => {
        getWorkerTypes();
    }, []);

    // Manejar el cambio de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/trabajador', formData);
            console.log(response.data);
            // Puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito o redirigir al usuario
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className='col-span-7 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md' onSubmit={handleSubmit}>
            <SubTitle subtitle='Añadir nuevo trabajador' />
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='nombre'>Nombre</label>
                    <input
                        type='text'
                        id='nombre'
                        name='nombre'
                        value={formData.nombre}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='apellido'>Apellido</label>
                    <input
                        type='text'
                        id='apellido'
                        name='apellido'
                        value={formData.apellido}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='correoTrabajador'>Correo Trabajador</label>
                    <input
                        type='email'
                        id='correoTrabajador'
                        name='correoTrabajador'
                        value={formData.correoTrabajador}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='IDTipoUsuario'>Tipo de Usuario</label>
                    <select
                        name='IDTipoUsuario'
                        id='IDTipoUsuario'
                        value={formData.IDTipoUsuario}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    >
                        <option value=''>Seleccione un tipo de usuario</option>
                        {workerTypes.map((workerType) => (
                            <option key={workerType._id} value={workerType._id}>{workerType.tipoUsuario}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='inicioTurno'>Inicio del turno</label>
                    <input
                        type='time'
                        id='inicioTurno'
                        name='inicioTurno'
                        value={formData.inicioTurno}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='finTurno'>Fin del Turno</label>
                    <input
                        type='time'
                        id='finTurno'
                        name='finTurno'
                        value={formData.finTurno}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
                <div className='flex flex-col w-full col-span-2'>
                    <label className='text-gray-400 mb-2' htmlFor='fechaNacimiento'>Fecha de nacimiento</label>
                    <input
                        type='date'
                        id='fechaNacimiento'
                        name='fechaNacimiento'
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg w-full'
                    />
                </div>
                <button className='bg-[#121212] rounded-lg w-full text-white space-x-4 col-span-2 py-2 mt-2' type='submit'>
                    <i className="fa-solid fa-user-plus"></i>
                    <span className='font-semibold'>Crear trabajador</span>
                </button>
            </div>
        </form>
    );
};

export default AddWorker;
