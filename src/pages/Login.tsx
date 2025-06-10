import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Check user role from Firestore to redirect correctly
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists() && userDoc.data().role === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (err: any) {
      setError("Failed to log in. Please check your email and password.");
      console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 md:p-12 text-center">
            <h1 className="text-4xl font-light mb-4 text-glow">Welcome Back</h1>
            <p className="text-muted-foreground mb-8">Login to continue your journey.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input {...register("email")} type="email" placeholder="Email" className="bg-input h-12" required disabled={isLoading} />
                <Input {...register("password")} type="password" placeholder="Password" className="bg-input h-12" required disabled={isLoading} />
                {error && <p className="text-destructive text-sm">{error}</p>}
                <Button type="submit" className="w-full h-12 text-lg neumorphic-button" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </form>
             <p className="text-muted-foreground text-sm mt-6">
                Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;