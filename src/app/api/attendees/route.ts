import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpbzbvkovOzheNAOWny1mRAmLsuSMVWNeHrs5kjZnLilNyr_2P3Azl8yPRIxPikpvfFg/exec';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const id = searchParams.get('id');

  let url = GOOGLE_SCRIPT_URL;
  if (action && id) {
    url += `?action=${action}&id=${encodeURIComponent(id)}`;
  }
  
  const separator = url.includes('?') ? '&' : '?';
  const finalUrl = `${url}${separator}t=${Date.now()}`;

  try {
    const res = await fetch(finalUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    
    if (action && id) {
      return NextResponse.json(data);
    }

    if (!data.attendees || !Array.isArray(data.attendees)) {
      return NextResponse.json({ attendees: [] });
    }

    const attendees = data.attendees.map((row: any, index: number) => {
      const getVal = (possibleKeys: string[]) => {
        const rowKeys = Object.keys(row);
        for (const pk of possibleKeys) {
          const foundKey = rowKeys.find(rk => rk.trim().toLowerCase() === pk.toLowerCase());
          if (foundKey) return row[foundKey];
        }
        return '';
      };

      return {
        id: String(getVal(['Submission ID']) || index),
        nombre: String(getVal(['Datos Personales', 'Nombre']) || '').trim(),
        apellido: String(getVal(['Apellidos', 'Apellido']) || '').trim(),
        congregacion: String(getVal(['Congregación', 'Congregacion', 'Iglesia']) || '').trim(),
        ciudad: String(getVal(['Ciudad']) || '').trim(),
        pais: String(getVal(['¿Donde vives?', 'Pais', 'País']) || '').trim(),
        telefono: String(getVal(['Celular', 'Telefono', 'Teléfono']) || '').trim(),
        comprobanteUrl: String(getVal(['COMPROBANTE DE PAGO', 'Comprobante', 'Pago']) || '').trim(),
        checkIn: getVal(['check in']) === true || String(getVal(['check in'])).toUpperCase().trim() === 'TRUE',
        confirmado: getVal(['confirmado']) === true || String(getVal(['confirmado'])).toUpperCase().trim() === 'TRUE',
      };
    });

    return NextResponse.json({ 
      attendees: attendees.filter((a: any) => a.nombre || a.apellido) 
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message, attendees: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id } = body;

    if (!action || !id) {
      return NextResponse.json({ error: 'Missing action or id' }, { status: 400 });
    }

    const url = `${GOOGLE_SCRIPT_URL}?action=${action}&id=${encodeURIComponent(id)}&t=${Date.now()}`;
    const res = await fetch(url, { method: 'GET', cache: 'no-store' });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
