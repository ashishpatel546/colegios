import fs from "node:fs";
import path from "node:path";

// Served from content/, not public/, so the file is only reachable through
// this route, which src/proxy.ts keeps behind the marketing login.
export const dynamic = "force-static";

export function GET() {
  const pdf = fs.readFileSync(path.join(process.cwd(), "content", "colegios-product-guide.pdf"));
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="colegios-product-guide.pdf"',
    },
  });
}
