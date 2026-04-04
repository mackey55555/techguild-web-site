import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret =
    request.headers.get('x-microcms-signature') ??
    request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/', 'page')
  revalidatePath('/about', 'page')
  revalidatePath('/activities', 'page')
  revalidatePath('/students', 'page')

  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
