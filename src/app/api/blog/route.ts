import { google } from "@/lib/ai";
import { generateText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { topic, tone } = await req.json();

  const prompt = `
You are a professional blog writer.

Write a detailed blog post on the topic: "${topic}" in a "${tone}" tone.

The blog must include:
- A catchy title
- An introduction paragraph
- 3 to 5 clear sections with detailed content
- A strong conclusion

Use only plain text. Do not use Markdown, HTML, or any formatting symbols. Do not explain anything. Return only the blog content.
`;

  const result = await generateText({
    model: google("gemini-1.5-flash"),
    prompt,
  });

  return new Response(result.text); // plain text response
}
