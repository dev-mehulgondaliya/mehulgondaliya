import "./globals.css";

export const metadata = {
  title: "Mehul Gondaliya | MERN Stack Developer & Freelancer",
  description: "MERN Stack Developer specializing in React, Next.js, Node.js and modern full-stack development.",
  openGraph: { title: "Mehul Gondaliya | MERN Stack Developer", description: "Modern, scalable web applications." },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"><body>{children}</body></html>
  );
}
