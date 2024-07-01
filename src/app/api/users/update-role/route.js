// src/app/api/users/update-role/route.js

import { NextResponse } from 'next/server';
import clientPromise from '../../db';
import { ObjectId } from 'mongodb';

export async function PUT(request) {
    try {
        const { userId, roleId } = await request.json();

        if (!userId || !roleId) {
            return NextResponse.json({ error: 'User ID and Role ID are required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('your_database_name');

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: { roleId: new ObjectId(roleId) } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User role updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}