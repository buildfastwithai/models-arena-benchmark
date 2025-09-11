import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { prompt, models, apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    if (!prompt || !models || models.length === 0) {
      return NextResponse.json(
        { error: "Prompt and models are required" },
        { status: 400 }
      );
    }

    const openrouter = createOpenRouter({
      apiKey,
    });

    const results = await Promise.all(
      models.map(async (modelId: string) => {
        try {
          const result = await generateObject({
            model: openrouter.chat(modelId),
            prompt: `Generate complete HTML, CSS, and JavaScript code for: ${prompt}
            
            Requirements:
            - Create a complete, working HTML page
            - Include all CSS styles inline in a <style> tag
            - Include all JavaScript inline in a <script> tag
            - Make it visually appealing and functional
            - The code should work when displayed in an iframe
            - Don't include any external dependencies or CDN links
            - Make it responsive and modern looking`,
            schema: z.object({
              html: z.string().describe("Complete HTML code with inline CSS and JavaScript"),
              title: z.string().describe("Short title describing what was created")
            }),
          });

          return {
            model: modelId,
            success: true,
            data: result.object,
          };
        } catch (error) {
          console.error(`Error with model ${modelId}:`, error);
          return {
            model: modelId,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
