import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, name, price } = body;

    // Aquí iría la lógica real de integración con la API de Flow
    // 1. Firmar los parámetros con la API Key y Secret
    // 2. Hacer POST a https://www.flow.cl/api/payment/create
    // 3. Obtener token y URL de redirección

    console.log(`Creando orden de pago para ${name} por $${price}`);

    // MOCK: Redirección simulada
    const mockFlowUrl = `https://www.flow.cl/app/trade/payment.php?token=mock_token_12345`;

    return NextResponse.json({ url: mockFlowUrl, status: 'success' });
  } catch (error) {
    return NextResponse.json({ error: 'Error procesando el pago' }, { status: 500 });
  }
}
