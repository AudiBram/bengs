import Footer from '@/components/footer'
import './globals.css'
import type {Metadata} from 'next'
import {Urbanist} from 'next/font/google'
import Navbar from '@/components/navbar'
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

const urbanist = Urbanist({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Bengs Store',
    description: 'Bengs',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={urbanist.className}>
        <ToastProvider/>
        <ModalProvider/>
        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
    )
}
