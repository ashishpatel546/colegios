import { NextResponse, type NextRequest } from "next/server";

/* ------------------------------------------------------------------
   The product guide is for the marketing team, not the public site.
   /product-guide and its downloads sit behind HTTP Basic auth with one
   shared login, set on the server as GUIDE_USER and GUIDE_PASSWORD
   (see .env.example). If either is missing the guide stays locked,
   so a deploy that forgets them never exposes it.
   ------------------------------------------------------------------ */

const REALM = "Colegios marketing";

// Compare without returning early, so the response time does not reveal
// how much of a guess was right.
function safeEqual(a: string, b: string) {
  const length = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < length; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function authorised(request: NextRequest, user: string, password: string) {
  const header = request.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme?.toLowerCase() !== "basic" || !encoded) return false;

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return false;
  }
  const split = decoded.indexOf(":");
  if (split < 0) return false;

  const userOk = safeEqual(decoded.slice(0, split), user);
  const passwordOk = safeEqual(decoded.slice(split + 1), password);
  return userOk && passwordOk;
}

export function proxy(request: NextRequest) {
  const user = process.env.GUIDE_USER;
  const password = process.env.GUIDE_PASSWORD;

  if (user && password && authorised(request, user, password)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  return new NextResponse("This page is for the Colegios team. Please sign in.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  matcher: ["/product-guide", "/product-guide/:path*", "/downloads/:path*"],
};
