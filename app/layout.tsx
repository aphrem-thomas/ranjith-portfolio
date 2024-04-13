import Navbar from '@/components/navbar/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Barlow_Condensed } from 'next/font/google'
import Footer from '@/components/footer/footer'

const Barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: '400',
  variable:'--barlow-font'
})
export const metadata: Metadata = {
  title: 'Ranjith Mathew',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`text-text ${Barlow.className} bg-background`}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
