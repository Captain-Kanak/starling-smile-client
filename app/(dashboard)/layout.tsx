import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${roboto.variable} font-sans min-h-full`}
      style={{ "--font-sans": `var(--font-roboto)` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
