import './globals.css';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from './components/BootstrapClient.js';
import AppNavbar from './components/AppNavbar';
import StoreProvider from './store/StoreProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
      <>
        <html lang="en">
          <body>
            <StoreProvider>
              <AppNavbar />
              {children}
            </StoreProvider>
            <BootstrapClient />  
          </body>
        </html>
      </>
  )
}
