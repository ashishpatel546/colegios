import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/*
 * The link preview for colegios.in: the logo, the homepage headline and who
 * makes it. Built at deploy time, so it always carries the current mark from
 * public/logo/colegios-mark.png. Fonts are the site's own, as static files
 * in assets/fonts (SIL Open Font License), so the build needs no network.
 */

export const alt = "Colegios: every part of the school day, on one system";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const root = process.cwd();
  const [mark, display, body] = await Promise.all([
    readFile(join(root, "public", "logo", "colegios-mark.png")),
    readFile(join(root, "assets", "fonts", "BricolageGrotesque-ExtraBold.ttf")),
    readFile(join(root, "assets", "fonts", "PlusJakartaSans-Medium.ttf")),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #ffffff 0%, #eef4ff 100%)",
          color: "#0b1b33",
          padding: 72,
          fontFamily: "Jakarta",
          position: "relative",
        }}
      >
        {/* Brand edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            display: "flex",
            background: "linear-gradient(90deg, #1a54d6 0%, #12a05b 52%, #ef8412 100%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img src={markSrc} width={104} height={104} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Bricolage", fontSize: 54, color: "#0d2f80", letterSpacing: -1.5 }}>
              Colegios
            </div>
            <div style={{ fontSize: 19, letterSpacing: 5, color: "#3c4b67", marginTop: 2 }}>
              SCHOOL MANAGEMENT SYSTEM
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Bricolage", fontSize: 78, lineHeight: 1.02, letterSpacing: -2.5, maxWidth: 960 }}>
            Every part of the school day, on one system.
          </div>
          <div style={{ marginTop: 26, fontSize: 30, color: "#3c4b67" }}>
            Admissions, fees, attendance, exams and campus safety.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#3c4b67",
          }}
        >
          <span>colegios.in</span>
          <span style={{ display: "flex" }}>
            <span style={{ color: "#1a54d6" }}>App</span>
            <span style={{ color: "#12a05b" }}>Me</span>
            <span style={{ color: "#ef8412" }}>Soft</span>
            <span>&nbsp;Private Limited</span>
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Jakarta", data: body, weight: 500, style: "normal" },
      ],
    },
  );
}
