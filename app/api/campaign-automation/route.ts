import { generateText } from "ai"
import { google } from "@ai-sdk/google"

// Mock influencer data for demonstration if the API doesn't return anything
const MOCK_INFLUENCERS = [
  {
    id: "inf1",
    name: "Fashionista Flo",
    platform: "Instagram",
    followers: "1.2M",
    niche: "Fashion, Lifestyle",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "inf2",
    name: "Tech Guru Tim",
    platform: "YouTube",
    followers: "800K",
    niche: "Tech Reviews, Gadgets",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "inf3",
    name: "Foodie Fiona",
    platform: "TikTok",
    followers: "500K",
    niche: "Food, Cooking",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "inf4",
    name: "Traveler Tom",
    platform: "Instagram",
    followers: "1.5M",
    niche: "Travel, Adventure",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export async function POST(req: Request) {
  const { name, goals, industry, budget } = await req.json()

  const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!googleApiKey) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set.")
  }

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: any) => {
        controller.enqueue(encoder.encode(`event: ${event}\n`))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      try {
        // Step 1: Understand the campaign
        sendEvent("status", "understanding")
        const { text: understandingText } = await generateText({
          model: google("gemini-1.5-flash", { apiKey: googleApiKey }), // Changed model name to "gemini-1.5-flash"
          prompt: `Analyze the following campaign details to understand its core objectives and target audience:
          Campaign Name: ${name}
          Campaign Goals: ${goals}
          Industry: ${industry}
          Budget: ${budget}
          Provide a concise summary of the campaign's essence and key considerations for AI automation.`,
        })
        sendEvent("ai_output", `AI Understanding: ${understandingText}`)
        await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate delay

        // Step 2: Plan the campaign
        sendEvent("status", "planning")
        const { text: planningText } = await generateText({
          model: google("gemini-1.5-flash", { apiKey: googleApiKey }), // Changed model name to "gemini-1.5-flash"
          prompt: `Based on the understanding of the campaign "${name}" (Goals: ${goals}, Industry: ${industry}, Budget: ${budget}), outline a strategic plan for AI-driven influencer outreach. Include ideas for content prompts, target influencer demographics, and initial setup considerations.`,
        })
        sendEvent("ai_output", `AI Planning: ${planningText}`)
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate delay

        // Step 3: Searching for influencers (Actual API call)
        sendEvent("status", "searching")
        sendEvent("ai_output", "AI is now searching for suitable influencers...")

        let influencers = []
        try {
          const apiUrl = process.env.NEXT_PUBLIC_INFLUENCER_API_URL || "https://api.example.com/influencers"
          const apiResponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ industry, goals, budget }),
          })

          if (!apiResponse.ok) {
            console.error(`Influencer API error: ${apiResponse.status} - ${await apiResponse.text()}`)
            influencers = MOCK_INFLUENCERS
          } else {
            influencers = await apiResponse.json()
            if (!Array.isArray(influencers) || influencers.length === 0) {
              console.warn("Influencer API returned no results or invalid format, using mock data.")
              influencers = MOCK_INFLUENCERS
            }
          }
        } catch (apiError) {
          console.error("Error calling influencer API:", apiError)
          influencers = MOCK_INFLUENCERS
        }

        sendEvent("influencers", influencers)
        sendEvent("ai_output", `Found ${influencers.length} potential influencers.`)
        await new Promise((resolve) => setTimeout(resolve, 2500)) // Simulate delay

        // Step 4: AI Selecting Influencers
        sendEvent("status", "selecting")
        const { text: selectionText } = await generateText({
          model: google("gemini-1.5-flash", { apiKey: googleApiKey }), // Changed model name to "gemini-1.5-flash"
          prompt: `Based on the campaign details for "${name}" and the following influencer profiles: ${JSON.stringify(
            influencers.map((inf: any) => ({ name: inf.name, niche: inf.niche, followers: inf.followers })),
          )}, explain how the AI would select the best-fit influencers for this campaign. Focus on criteria like audience alignment, engagement, and past performance.`,
        })
        sendEvent("ai_output", `AI Selection Logic: ${selectionText}`)
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate delay

        // Step 5: AI Negotiating Directly
        sendEvent("status", "negotiating")
        const { text: negotiationText } = await generateText({
          model: google("gemini-1.5-flash", { apiKey: googleApiKey }), // Changed model name to "gemini-1.5-flash"
          prompt: `Describe how the AI would initiate and manage direct negotiations with the selected influencers for the "${name}" campaign. What key points would it cover, and how would it aim to secure optimal terms within the budget of ${budget}?`,
        })
        sendEvent("ai_output", `AI Negotiation Strategy: ${negotiationText}`)
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate delay

        sendEvent("status", "completed")
        sendEvent("ai_output", "Campaign automation process completed successfully!")
      } catch (error) {
        console.error("Error during AI campaign automation:", error)
        sendEvent("status", "error")
        sendEvent("ai_output", `An error occurred during automation: ${(error as Error).message}`)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}
