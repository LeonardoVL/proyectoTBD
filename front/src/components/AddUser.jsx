import React, { useEffect, useState } from 'react';
import SubTitle from './SubTitle';
import axios from 'axios';

const AddUser = () => {
    const [userTypes, setUserTypes] = useState([]);
    const [userStates, setUserStates] = useState([]);
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        DNI: '',
        IDTipoUsuario: '',
        IDTipoEstado: '66af0d9aea3fd402510c328a',
        facultad: '',
        domicilio: '',
        correo: '',
        telefono: '',
        fechaNacimiento: '',
        reservasActivas: 0
    });

    // Consulta para obtener los tipos de usuario con axios
    const getUserTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/tipousuario');
            setUserTypes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Consulta para obtener los tipos de estado con axios
    const getUserStates = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/estadousuario');
            setUserStates(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect para obtener los tipos de usuario y los tipos de estado
    useEffect(() => {
        getUserTypes();
        getUserStates();
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
            const response = await axios.post('http://localhost:3000/api/usuario', formData);
            console.log(response.data);
            // Puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito o redirigir al usuario
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className='col-span-7 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md' onSubmit={handleSubmit}>
            <SubTitle subtitle='Añadir nuevo usuario' />
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                {['nombres', 'apellidos', 'DNI', 'facultad', 'domicilio', 'telefono', 'correo'].map((field, index) => (
                    <div key={index} className='flex flex-col w-full'>
                        <label className='text-gray-400 mb-2' htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type='text'
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className='border-stone-300 border-2 p-2 rounded-lg'
                        />
                    </div>
                ))}
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='userType'>Tipo de usuario</label>
                    <select
                        name='IDTipoUsuario'
                        id='userType'
                        value={formData.IDTipoUsuario}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    >
                        <option value=''>Seleccione un tipo de usuario</option>
                        {userTypes.map((userType) => (
                            <option key={userType._id} value={userType._id}>{userType.tipoUsuario}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full col-span-2'>
                    <label className='text-gray-400 mb-2' htmlFor='fechaNacimiento'>Fecha de nacimiento</label>
                    <div className='flex flex-row space-x-5'>
                        <input
                            type='date'
                            id='fechaNacimiento'
                            name='fechaNacimiento'
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            className='border-stone-300 border-2 p-2 rounded-lg w-full'
                        />
                        <button className='bg-[#121212] rounded-lg w-full text-white space-x-4' type='submit'>
                            <i className="fa-solid fa-user-plus"></i>
                            <span className='font-semibold'>Crear usuario</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddUser;
