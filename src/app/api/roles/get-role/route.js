import { NextResponse } from 'next/server';
import clientPromise from '../../db';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('your_database_name');

        const users = await db.collection('roles').find({}).toArray();

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching Roles' }, { status: 500 });
    }
}