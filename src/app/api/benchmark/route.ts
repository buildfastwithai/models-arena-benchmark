import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { apiKey, prompt, model1, model2 } = await request.json()

    if (!apiKey || !prompt || !model1 || !model2) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Make parallel requests to OpenRouter API for both models
    const [response1, response2] = await Promise.all([
      fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Build Fast Arena Benchmark",
        },
        body: JSON.stringify({
          model: model1,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }),
      fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Build Fast Arena Benchmark",
        },
        body: JSON.stringify({
          model: model2,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }),
    ])

    const [data1, data2] = await Promise.all([response1.json(), response2.json()])

    if (!response1.ok || !response2.ok) {
      return NextResponse.json(
        {
          error: "API request failed",
          details: {
            model1: data1.error || null,
            model2: data2.error || null,
          },
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      response1: data1.choices[0]?.message?.content || "No response generated",
      response2: data2.choices[0]?.message?.content || "No response generated",
      model1,
      model2,
    })
  } catch (error) {
    console.error("Benchmark API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
