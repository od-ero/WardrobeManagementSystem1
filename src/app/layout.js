import { Nunito } from 'next/font/google'
import '@/app/global.css'
import { getPageTitle } from '@/app/commonVariable';

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})
const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
        <body className="antialiased">{children}</body>
        </html>
    )
}


export const metadata = {

    title: getPageTitle('ERPSystem'),
}


export default RootLayout
