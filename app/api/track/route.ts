import { NextRequest, NextResponse } from 'next/server';
import { trackingSchema } from '@/lib/tracking/tracking.schema';
import { getPublicTrackingDetails } from '@/lib/tracking/tracking.service';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400 }
    );
  }

  try {
    const validatedData = trackingSchema.parse(body);

    // Friendly handling if user accidentally enters a Quote Reference (QTE-...)
    if (validatedData.trackingNumber.toUpperCase().startsWith('QTE-')) {
      return NextResponse.json(
        {
          error: 'This is a Quote Reference. Quote inquiries are handled by our dispatch desk and do not have active transit tracking until a shipment is booked.',
          isQuoteReference: true,
        },
        { status: 404 }
      );
    }

    const shipmentDetails = await getPublicTrackingDetails(validatedData);

    if (!shipmentDetails) {
      return NextResponse.json(
        { error: 'No tracking information found for the provided tracking number.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: shipmentDetails });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid tracking number format.' },
        { status: 400 }
      );
    }

    console.error('Unhandled tracking route error:', error);
    return NextResponse.json(
      { error: 'Unable to process tracking query.' },
      { status: 500 }
    );
  }
}
