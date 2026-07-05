import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth.service';

export default function Register() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await registerUser(data);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <input {...register('name', { required: true })} placeholder="Name" className="w-full border p-2 rounded" />
      <input {...register('email', { required: true })} placeholder="Email" className="w-full border p-2 rounded" />
      <input {...register('password', { required: true })} type="password" placeholder="Password" className="w-full border p-2 rounded" />
      <button disabled={isSubmitting} className="w-full bg-slate-900 text-white p-2 rounded">Register</button>
      <p className="text-sm">Already have an account? <Link to="/login" className="underline">Log in</Link></p>
    </form>
  );
}
