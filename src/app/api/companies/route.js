import { NextResponse } from 'next/server';
import clientPromise from '../db';
import { ObjectId } from 'mongodb';

export async function POST(request) {
    try {
        const { name, location, type, users } = await request.json();
        const client = await clientPromise;
        const db = client.db('your_database_name');

        const result = await db.collection('companies').insertOne({
            name,
            location,
            type,
            users: users.map(userId => new ObjectId(userId))
        });

        return NextResponse.json({ message: 'Company created successfully', id: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('your_database_name');

        const companies = await db.collection('companies').find({}).toArray();
        return NextResponse.json(companies, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}