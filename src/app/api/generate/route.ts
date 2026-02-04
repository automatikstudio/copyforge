import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const platformInstructions: Record<string, string> = {
  shopify:
    "Write for a Shopify product page. Use an engaging, brand-friendly tone. Include HTML-ready formatting with short paragraphs. Focus on lifestyle benefits and features.",
  amazon:
    "Write for an Amazon product listing. Follow Amazon's style: concise, feature-driven, benefit-oriented bullet points. Use persuasive but factual language. Include relevant search terms naturally.",
  etsy:
    "Write for an Etsy product listing. Use a warm, artisan, handmade-friendly tone. Emphasize craftsmanship, uniqueness, and story. Appeal to Etsy's audience who values authenticity.",
  general:
    "Write for a general e-commerce product page. Use a professional, conversion-focused tone. Balance features with benefits.",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, features, category, platform } = body;

    if (!productName || !features) {
      return NextResponse.json(
        { error: "Product name and features are required." },
        { status: 400 }
      );
    }

    const platformGuide = platformInstructions[platform] || platformInstructions.general;

    const prompt = `You are an expert e-commerce copywriter. Generate a product listing for the following product.

PRODUCT: ${productName}
FEATURES: ${features}
${category ? `CATEGORY: ${category}` : ""}
PLATFORM: ${platform}

PLATFORM GUIDELINES: ${platformGuide}

Generate the following in JSON format:
{
  "description": "A compelling product description (150-250 words). Write in short paragraphs, highlighting benefits and features. Make it conversion-focused and SEO-friendly.",
  "bullets": ["Array of 5 key benefit/feature bullet points. Each should be concise (under 20 words) and start with a strong action word or benefit."],
  "metaTitle": "SEO meta title (50-60 characters) that includes the product name and key selling point",
  "metaDescription": "SEO meta description (140-160 characters) that summarizes the product and includes a call to action",
  "keywords": ["Array of 6-8 relevant SEO keywords/phrases for this product"]
}

Return ONLY valid JSON, no markdown code blocks or other text.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text response from AI");
    }

    // Parse the JSON from response
    let parsed;
    try {
      // Try to extract JSON from the response (handle possible markdown wrapping)
      let jsonStr = textContent.text.trim();
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      parsed = JSON.parse(jsonStr);
    } catch {
      throw new Error("Failed to parse AI response");
    }

    // Calculate word count
    const allText = `${parsed.description} ${parsed.bullets.join(" ")}`;
    const wordCount = allText.split(/\s+/).filter(Boolean).length;

    return NextResponse.json({
      description: parsed.description,
      bullets: parsed.bullets,
      metaTitle: parsed.metaTitle,
      metaDescription: parsed.metaDescription,
      keywords: parsed.keywords,
      wordCount,
    });
  } catch (error) {
    console.error("Generate error:", error);
    const message = error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
