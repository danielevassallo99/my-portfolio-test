import './globals.css';

export const metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio frontend scaffold'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



