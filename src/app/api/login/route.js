import { NextResponse } from 'next/server';
import clientPromise from '../db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/auth';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        const client = await clientPromise;
        const db = client.db('your_database_name');

        const user = await db.collection('users').findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const token = generateToken(user);

        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({
            message: 'Login successful',
            user: userWithoutPassword,
            token
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

