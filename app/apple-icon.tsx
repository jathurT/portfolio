import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Apple touch icon — same mark as the favicon, scaled up.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0c0e",
          borderRadius: "22%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 26% 20%, rgba(46,204,113,0.5), transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 128,
            lineHeight: 1,
            color: "#2ecc71",
            marginTop: -6,
          }}
        >
          j
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
