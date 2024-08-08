import { useEffect, useState } from 'react'
import SubTitle from './SubTitle'
import axios from 'axios'

const AddLoan = () => {
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        IDLibro: '',
        IDUsuario: '',
        fechaSalida: '',
        fechaDevolucion: '',
        fechaMaxDevolucion: ''
    });

    const getBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/libro');
            setBooks(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/usuario');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBooks();
        getUsers();
    }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.fechaSalida = Date.now();
        formData.IDTrabajador = '66b2eee6da08a13ed217f146';
        formData.deterioro = 'NO';

        try {
            const response = await axios.post('http://localhost:3000/api/prestamo', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}
        className='col-span-7 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
            <SubTitle subtitle='Añadir nuevo préstamo' />
            <div className='gap-x-4 gap-y-2'>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 my-2' htmlFor='libroNombre'>Título del libro</label>
                    <select id='libroNombre' name='IDLibro'
                    className='border-2 border-stone-300 p-2 rounded-lg'
                    onChange={handleChange}>
                        <option value='' disabled selected hidden>Escoja el título del libro</option>
                        {
                            books.map((book, index) => {
                                return (
                                    <option key={index} value={book._id}>{book.titulo}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 my-2' htmlFor='autorPrestamo'>Autor del préstamo</label>
                    <select id='autorPrestamo' name='IDUsuario'
                    className='border-2 border-stone-300 p-2 rounded-lg'
                    onChange={handleChange}>
                        <option value='' disabled selected hidden>Elija el nombre del usuario</option>
                        {
                            users.map((user, index) => {
                                return (
                                    <option key={index} value={user._id}>{user.nombres}&nbsp;{user.apellidos}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 my-2' htmlFor='fechaDevolucion'>Fecha de devolución</label>
                    <input type='date' id='fechaDevolucion' name='fechaDevolucion'
                    value={formData.fechaDevolucion} onChange={handleChange}
                    className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 my-2' htmlFor='fechaMaxDevolucion'>Día máximo para devolución</label>
                    <input type='date' id='fechaMaxDevolucion' name='fechaMaxDevolucion'
                    value={formData.fechaMaxDevolucion} onChange={handleChange}
                    className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
            </div>
            <div className='gap-x-4 gap-y-2 py-4'>
                <button className='bg-[#0b0a0a] rounded-lg w-full text-white space-x-4 p-1'>
                    <span className='font-semibold'>Crear préstamo</span>
                </button>
            </div>
        </form>
    );
};

export default AddLoan