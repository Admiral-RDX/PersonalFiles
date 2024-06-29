import { z } from 'zod';

const EmailSchema = z.string().email();

const PasswordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(50, { message: 'Password must not exceed 50 characters' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
    });

export function isValidEmail(email: string): boolean {
    try {
        EmailSchema.parse(email);
        return true;
    } catch (error) {
        return false;
    }
}

export function isValidPassword(password: string): boolean {
    try {
        PasswordSchema.parse(password);
        return true;
    } catch (error) {
        return false;
    }
}
