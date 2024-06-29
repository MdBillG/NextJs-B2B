import { NextResponse } from 'next/server';
import clientPromise from '../db';
import { validateRole } from '../lib/rolesSchema';

export async function POST(request) {
    try {
        const role = await request.json();
        const errors = validateRole(role);

        if (errors.length > 0) {
            return NextResponse.json({ errors }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('your_database_name');

        const result = await db.collection('roles').insertOne(role);

        return NextResponse.json({ message: 'Role created successfully', roleId: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}