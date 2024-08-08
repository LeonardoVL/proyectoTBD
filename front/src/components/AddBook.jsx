import React, { useEffect, useState } from 'react';
import SubTitle from './SubTitle';
import axios from 'axios';

const AddBook = () => {
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);

    const [formData, setFormData] = useState({
        titulo: '',
        isbn: '',
        IDAutor: '',
        IDCategoria: '',
        IDEditorial: '',
        anioPublicacion: '',
        ejemplaresTotales: '',
        edicion: '',
        numeroPaginas: '',
        precioLibro: 0,
        estadoLibro: ''
    });
    
    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/categoria');
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/autor');
            setAuthors(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getPublishers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/editorial');
            setPublishers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCategories();
        getAuthors();
        getPublishers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/libro', formData);
            console.log('Libro añadido:', response.data);
            // Reset form after submission
            setFormData({
                titulo: '',
                isbn: '',
                IDAutor: '',
                IDCategoria: '',
                IDEditorial: '',
                anioPublicacion: '',
                ejemplaresTotales: '',
                edicion: '',
                numeroPaginas: '',
                precioLibro: 0,
                estadoLibro: ''
            });
        } catch (error) {
            console.error('Error añadiendo libro:', error);
        }
    }

    return (
        <form className='col-span-7 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md' onSubmit={handleSubmit}>
            <SubTitle subtitle='Añadir nuevo libro' />
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='titulo'>Título</label>
                    <input
                        type='text'
                        id='titulo'
                        name='titulo'
                        value={formData.titulo}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='isbn'>ISBN</label>
                    <div className='flex flex-row w-full space-x-4'>
                        <input
                            type='text'
                            id='isbn'
                            name='isbn'
                            value={formData.isbn}
                            onChange={handleChange}
                            className='border-stone-300 border-2 p-2 rounded-lg w-full'
                        />
                        <button type='submit' className='bg-[#121212] px-4 text-white rounded-md'>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='IDAutor'>Autor</label>
                    <select
                        name='IDAutor'
                        id='IDAutor'
                        value={formData.IDAutor}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    >
                        <option value=''>Seleccione un autor</option>
                        {authors.map((author) => (
                            <option key={author._id} value={author._id}>
                                {author.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='IDCategoria'>Categoría</label>
                    <select
                        name='IDCategoria'
                        id='IDCategoria'
                        value={formData.IDCategoria}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    >
                        <option value=''>Seleccione una categoría</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='IDEditorial'>Editorial</label>
                    <select
                        name='IDEditorial'
                        id='IDEditorial'
                        value={formData.IDEditorial}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    >
                        <option value=''>Seleccione una editorial</option>
                        {publishers.map((publisher) => (
                            <option key={publisher._id} value={publisher._id}>
                                {publisher.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-gray-400 mb-2' htmlFor='estadoLibro'>Estado del libro</label>
                    <input
                        type='text'
                        id='estadoLibro'
                        name='estadoLibro'
                        value={formData.estadoLibro}
                        onChange={handleChange}
                        className='border-stone-300 border-2 p-2 rounded-lg'
                    />
                </div>
                <div className='gap-2 flex-col w-full col-span-2 grid grid-cols-12'>
                    <div className='grid-rows-2 col-span-4'>
                        <label className='text-gray-400 mb-2' htmlFor='anioPublicacion'>Año de Publicación</label>
                        <input
                            type='date'
                            id='anioPublicacion'
                            name='anioPublicacion'
                            value={formData.anioPublicacion}
                            onChange={handleChange}
                            className='border-stone-300 border-2 p-2 rounded-lg w-full'
                        />
                    </div>
                    <div className='grid-rows-2 col-span-4'>
                        <label className='text-gray-400 mb-2' htmlFor='ejemplaresTotales'>Ejemplares Disponibles</label>
                        <input
                            type='text'
                            id='ejemplaresTotales'
                            name='ejemplaresTotales'
                            value={formData.ejemplaresTotales}
                            onChange={handleChange}
                            className='border-stone-300 border-2 p-2 rounded-lg w-full'
                        />
                    </div>
                    <div className='grid-rows-2 col-span-2'>
                        <label className='text-gray-400 mb-2' htmlFor='edicion'>Edición</label>
                        <input
                            type='text'
                            id='edicion'
                            name='edicion'
                            value={formData.edicion}
                            onChange={handleChange}
                            className='border-stone-300 border-2 p-2 rounded-lg w-full'
                        />
                    </div>
                    <div className='grid-rows-2 col-span-2'>
                        <label className='text-gray-400 mb-2' htmlFor='numeroPaginas'>Páginas</label>
                        <input
                            type='text'
                            id='numeroPaginas'
                            name='numeroPaginas'
                            value={formData.numeroPaginas}
                            onChange={handleChange}
                            className='border-stone-300 border-2 p-2 rounded-lg w-full'
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddBook;
