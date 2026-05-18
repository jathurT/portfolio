import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jathurshan Thadchanamoorthy — Software Engineer";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0b0c0e",
          padding: "0 96px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 12% 0%, rgba(46,204,113,0.40), transparent 60%)",
          }}
        />
        {/* brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "monospace",
            fontSize: 26,
            color: "#c1c4ca",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#2ecc71",
            }}
          />
          jathurshan_t
        </div>
        {/* name */}
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 132,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#ededed",
          }}
        >
          Jathurshan<span style={{ color: "#2ecc71" }}>.</span>
        </div>
        {/* subtitle */}
        <div
          style={{
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 34,
            color: "#c1c4ca",
            marginTop: 30,
          }}
        >
          software engineer · full-stack · devops · ml — sri lanka
        </div>
        {/* footer url */}
        <div
          style={{
            position: "absolute",
            left: 96,
            bottom: 56,
            display: "flex",
            fontFamily: "monospace",
            fontSize: 24,
            color: "#8c8f96",
          }}
        >
          jathurt.me
        </div>
      </div>
    ),
    { ...size }
  );
}
