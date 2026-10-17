import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SITE_NAME } from "@/lib/seo";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(160deg, #1a1612 0%, #10100f 45%, #0c0b0a 100%)",
          color: "#f3ebe2",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 72,
            height: 8,
            background: "#ff7a00",
            borderRadius: 4,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 96,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              fontWeight: 700,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.35,
              color: "#c9bdb0",
              maxWidth: 900,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {dict.home.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#ff7a00",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          altalaya.app
        </div>
      </div>
    ),
    { ...size },
  );
}
