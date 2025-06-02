// app/api/get-signed-url/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Ensure NEXT_PUBLIC_AGENT_ID is available on the server side for this API route
    const agentId = process.env.NEXT_PUBLIC_AGENT_ID
    if (!agentId) {
      console.error("NEXT_PUBLIC_AGENT_ID is not set.")
      return NextResponse.json({ error: "Agent ID not configured" }, { status: 500 })
    }

    const res = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`, {
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY! },
    })
    if (!res.ok) {
      const errorText = await res.text()
      console.error("Failed to get signed URL from ElevenLabs:", res.status, errorText)
      throw new Error("Failed to get signed URL from ElevenLabs")
    }
    const { signed_url } = await res.json()
    return NextResponse.json({ signedUrl: signed_url })
  } catch (e: any) {
    console.error("Error in /api/get-signed-url:", e)
    return NextResponse.json({ error: "Could not generate signed URL" }, { status: 500 })
  }
}
