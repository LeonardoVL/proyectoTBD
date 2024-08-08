import { useState } from 'react'
import SubTitle from './SubTitle'
import axios from 'axios'

const AddLoan = () => {
    const [dniUsuario, setDniUsuario] = useState('');
    const [libroNombre, setLibroNombre] = useState('');
    const [fecPrestInicio, setFecPrestInicio] = useState('');
    const [fecDevInicio, setFecDevInicio] = useState('');
    const [newLoan, setNewLoan] = useState(false);

    const addLoan = async (e) => {
        e.preventDefault()
        setFecPrestInicio(new Date().toISOString());

        try {
            const response = await axios.post('http://localhost:3000/api/prestamo', {
                dniUsuario,
                libroNombre,
                fecPrestInicio,
                fecDevInicio,
            })
            setNewLoan(!newLoan)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <form
        className='col-span-7 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
            <SubTitle subtitle='Añadir nuevo préstamo' />
            <div className='gap-x-4 gap-y-2 flex flex-col w-full'>
                <label className='text-gray-400' htmlFor='libroNombre'>Título del libro</label>
                <input type='text' id='libroNombre' value={libroNombre} onChange={(e) => setLibroNombre(e.target.value)}
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 my-2' htmlFor='dniUsuario'>DNI del usuario</label>
                    <input type='number' id='dniUsuario' value={dniUsuario} onChange={(e) => setDniUsuario(e.target.value)}
                    className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 my-2' htmlFor='fecDevInicio'>Fecha de devolución</label>
                    <div className='flex flex-row space-x-5'>
                        <input type='date' id='fecDevInicio' value={fecDevInicio} onChange={(e) => setFecDevInicio(e.target.value)}
                        className='border-stone-300 border-2 p-2 rounded-lg w-full'
                        />
                    </div>
                </div>
            </div>
            <div className='gap-x-4 gap-y-2 py-4'>
                <button onClick={addLoan} className='bg-[#0b0a0a] rounded-lg w-full text-white space-x-4 p-1'>
                    <span className='font-semibold'>Crear préstamo</span>
                </button>
            </div>
        </form>
    );
};

export default AddLoan