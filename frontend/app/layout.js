import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio frontend scaffold'
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}



