import { DM_Sans } from "next/font/google";
import "./globals.css";

const poppins = DM_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata = {
  title: "Grammy",
  description: "Your lightweight grammar check partner!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        {children}
      </body>
    </html>
  );
}
