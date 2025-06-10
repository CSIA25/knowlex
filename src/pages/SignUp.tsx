import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, createInitialUserData } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      // The creation logic in AuthContext handles new user setup,
      // so we can just redirect to the standard user dashboard.
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
       <div className="w-full max-w-md">
        <div className="glass-card p-8 md:p-12 text-center">
            <h1 className="text-4xl font-light mb-4 text-glow">Create Account</h1>
            <p className="text-muted-foreground mb-8">Start your journey with Knowlex.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input {...register("email")} type="email" placeholder="Email" className="bg-input h-12" required />
                <Input {...register("password")} type="password" placeholder="Password" className="bg-input h-12" required />
                <Input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="bg-input h-12" required />
                {error && <p className="text-destructive text-sm">{error}</p>}
                <Button type="submit" className="w-full h-12 text-lg neumorphic-button">Sign Up</Button>
            </form>
             <p className="text-muted-foreground text-sm mt-6">
                Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;