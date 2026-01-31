import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

/**
 * Handles user registration.
 * Expects email, password, and optionally name in the request body.
 */
export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const users = db.collection('users');

        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await users.insertOne({
            email,
            password: hashedPassword,
            name: name || email.split('@')[0],
            createdAt: new Date(),
        });

        return NextResponse.json({ message: 'User registered successfully', userId: newUser.insertedId }, { status: 201 });
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
