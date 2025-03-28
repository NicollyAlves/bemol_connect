import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [address, setAddress] = useState({});
  const [message, setMessage] = useState('');

  const fetchAddress = async (cep) => {
    try {
      const response = await axios.post('http://localhost:5000/api/validate-cep', { cep });
      setAddress(response.data);
    } catch (error) {
      alert('CEP não encontrado');
    }
  };

  const onSubmit = async (data) => {
    try {
      const userData = { ...data, address };
      const response = await axios.post('http://localhost:5000/api/users', userData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Erro ao criar usuário');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Criar Conta</h2>
      
      <div>
        <label>Nome:</label>
        <input {...register('name', { required: true })} />
        {errors.name && <span>Campo obrigatório</span>}
      </div>

      <div>
        <label>Email:</label>
        <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email && <span>Email inválido</span>}
      </div>

      <div>
        <label>CEP:</label>
        <input 
          {...register('cep', { required: true })}
          onBlur={(e) => fetchAddress(e.target.value)}
        />
        {errors.cep && <span>Campo obrigatório</span>}
      </div>

      {address.cep && (
        <div>
          <p>Endereço encontrado:</p>
          <p>{address.logradouro}, {address.bairro}</p>
          <p>{address.localidade} - {address.uf}</p>
        </div>
      )}

      <button type="submit">Criar Conta</button>
      
      {message && <p>{message}</p>}
    </form>
  );
};

export default UserForm;