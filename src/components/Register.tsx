import React, { useState } from 'react';
import { useRegisterMutation } from  '../api/registerApi'

const Register = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const { first_name, last_name, phone, email, password } = form;
      const result = await register({ first_name, last_name, phone, email, password }).unwrap();
      console.log('Registered:', result);
    } catch (err) {
      console.error('Register failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" required />
      <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile Number" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
      <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" type="password" required />
      <button type="submit" disabled={isLoading}>Register</button>
      {isSuccess && <p>Registration successful!</p>}
      {error && <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>}
    </form>
  );
};

export default Register;
