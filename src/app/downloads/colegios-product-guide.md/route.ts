import { readGuideMarkdown } from "@/lib/productGuide";

export const dynamic = "force-static";

export function GET() {
  return new Response(readGuideMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="colegios-product-guide.md"',
    },
  });
}
