import { NextResponse } from 'next/server';
import clientPromise from '../db';
import bcrypt from 'bcryptjs';
import { validateUser, sanitizeUser } from '../lib/userSchema';
import { roles } from '../lib/rolesSchema';

export async function POST(request) {
    try {

        console.log("request", request)
        const userData = await request.json();
        const validationErrors = validateUser(userData);

        if (validationErrors.length > 0) {
            return NextResponse.json({ errors: validationErrors }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('your_database_name');

        const existingUser = await db.collection('users').findOne({ email: userData.email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const sanitizedUser = sanitizeUser(userData);
        sanitizedUser.password = await bcrypt.hash(sanitizedUser.password, 10);

        const result = await db.collection('users').insertOne(sanitizedUser);

        const { password, ...userWithoutPassword } = sanitizedUser;
        return NextResponse.json({ message: 'User created successfully', user: userWithoutPassword }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}


