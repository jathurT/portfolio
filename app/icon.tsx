import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Favicon — engineer-minimalist mark aligned with the site:
// near-black tile, green accent glow, serif-italic "j".
export default function Icon() {
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
              "radial-gradient(circle at 26% 20%, rgba(46,204,113,0.55), transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 23,
            lineHeight: 1,
            color: "#2ecc71",
            marginTop: -1,
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
