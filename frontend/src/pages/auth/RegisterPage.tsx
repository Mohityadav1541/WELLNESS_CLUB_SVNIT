import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    whatsappNumber: z.string().min(10, 'Please enter a valid WhatsApp number'),
    admissionNumber: z.string().min(1, 'Admission number is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
    const { register: registerUser, isLoading } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            whatsappNumber: '',
            admissionNumber: '',
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            // Omit confirmPassword from data sent to API
            const { confirmPassword, ...apiData } = data;
            await registerUser(apiData);
            navigate('/');
        } catch (error) {
            // Error handled in AuthContext
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details to register for the Wellness Club
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                {...register('name')}
                                disabled={isLoading}
                                className="bg-white text-black border-gray-300 placeholder:text-gray-400"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register('email')}
                                disabled={isLoading}
                                className="bg-white text-black border-gray-300 placeholder:text-gray-400"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="whatsappNumber">WhatsApp No.</Label>
                                <Input
                                    id="whatsappNumber"
                                    placeholder="9876543210"
                                    {...register('whatsappNumber')}
                                    disabled={isLoading}
                                    className="bg-white text-black border-gray-300 placeholder:text-gray-400"
                                />
                                {errors.whatsappNumber && (
                                    <p className="text-sm text-red-500">{errors.whatsappNumber.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="admissionNumber">Admission No.</Label>
                                <Input
                                    id="admissionNumber"
                                    placeholder="U2XX..."
                                    {...register('admissionNumber')}
                                    disabled={isLoading}
                                    className="bg-white text-black border-gray-300 placeholder:text-gray-400"
                                />
                                {errors.admissionNumber && (
                                    <p className="text-sm text-red-500">{errors.admissionNumber.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                disabled={isLoading}
                                className="bg-white text-black border-gray-300 placeholder:text-gray-400"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword')}
                                disabled={isLoading}
                                className="bg-white text-black border-gray-300 placeholder:text-gray-400"
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterPage;
