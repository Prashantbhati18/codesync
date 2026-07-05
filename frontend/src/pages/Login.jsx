// Uses react-hook-form for validation + submission state, and useAuth().login
// to update global auth state on success.
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await login(data);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-bold">Log in to CodeSync</h1>
      <input {...register('email', { required: true })} placeholder="Email" className="w-full border p-2 rounded" />
      <input {...register('password', { required: true })} type="password" placeholder="Password" className="w-full border p-2 rounded" />
      <button disabled={isSubmitting} className="w-full bg-slate-900 text-white p-2 rounded">Log in</button>
      <p className="text-sm">No account? <Link to="/register" className="underline">Register</Link></p>
    </form>
  );
}
