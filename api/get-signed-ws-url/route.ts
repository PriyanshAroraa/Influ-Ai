// app/api/get-signed-ws-url/route.ts
import { NextRequest, NextResponse } from 'next/server'

// This endpoint will fetch a short-lived, signed WebSocket URL
// from ElevenLabs so that the frontend never sees your API key.

export async function POST(req: NextRequest) {
  try {
    // Read body JSON: expect { agentId: string }
    const { agentId } = await req.json()
    if (!agentId) {
      return NextResponse.json(
        { error: "Missing agentId in request body" },
        { status: 400 }
      )
    }

    // Call ElevenLabs “get-signed-url” endpoint
    const elevenRes = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY!, 
        },
      }
    )

    if (!elevenRes.ok) {
      const text = await elevenRes.text()
      console.error("ElevenLabs error:", elevenRes.status, text)
      return NextResponse.json(
        { error: "Failed to fetch signed URL" },
        { status: 502 }
      )
    }

    const { signed_url } = await elevenRes.json()
    return NextResponse.json({ signedUrl: signed_url })
  } catch (err: any) {
    console.error("Unexpected error in /api/get-signed-ws-url:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
