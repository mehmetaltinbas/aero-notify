import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60; // Max 60 seconds on Pro plan

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const flights = await ;
    
    return NextResponse.json({
      success: true,
      count: flights.length,
      message: 'Flights fetched successfully'
    });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}