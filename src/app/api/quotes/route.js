import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { verifyToken } from '../../lib/auth';

// Middleware to check if user is authenticated
async function authenticateUser(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return null;
    }
    try {
        const decoded = await verifyToken(token);
        return decoded.userId;
    } catch (error) {
        return null;
    }
}

export async function GET(request) {
    try {
        const userId = await authenticateUser(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');

        const client = await clientPromise;
        const db = client.db('your_database_name');

        const query = companyId ? { companyId: new ObjectId(companyId) } : {};
        const quotes = await db.collection('quotes').find(query).toArray();

        return NextResponse.json(quotes, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/quotes:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const userId = await authenticateUser(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { companyId, amount, description } = await request.json();
        const client = await clientPromise;
        const db = client.db('your_database_name');

        const result = await db.collection('quotes').insertOne({
            companyId: new ObjectId(companyId),
            amount,
            description,
            status: 'pending',
            createdBy: new ObjectId(userId),
            createdAt: new Date()
        });

        return NextResponse.json({ message: 'Quote created successfully', id: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/quotes:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}