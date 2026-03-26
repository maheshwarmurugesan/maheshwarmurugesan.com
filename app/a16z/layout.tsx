import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahesh Presents | Tools for A16Z",
  description:
    "A curated collection of tools for startups, investors, and builders.",
  openGraph: {
    title: "Mahesh Presents | Tools for A16Z",
    description:
      "A curated collection of tools for startups, investors, and builders.",
  },
};

export default function A16ZLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="!bg-transparent"
      style={{
        background: "none",
        // strip parent cyberpunk styles
      }}
    >
      {children}
    </div>
  );
}
