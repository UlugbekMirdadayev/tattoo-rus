'use client'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import ToastProvider from '@/components/ToastProvider'
import StyledComponentsRegistry from '@/lib/registry'
import ModalInitializer from '@/modals/ModalInitializer'
import { Roboto } from 'next/font/google'
import '../css/bootstrap-grid-fix.css'
import '../css/bootstrap-grid.css'
import './globals.css'
import Providers from './providers'

const roboto = Roboto({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    sizes="32x32"
                    href="/images/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    sizes="16x16"
                    href="/images/favicon/favicon-16x16.png"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <meta name="yandex-verification" content="6c2f2ad61c9649d6" />
            </head>
            <body className={roboto.className}>
                <ToastProvider>
                    <StyledComponentsRegistry>
                        <Providers>
                            <Header />
                            <ModalInitializer />
                            {children}
                        </Providers>
                        <Footer />
                    </StyledComponentsRegistry>

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(89024713, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true,
                    ecommerce:"dataLayer"
                });
              `,
                        }}
                    />
                    <noscript>
                        <div>
                            <img
                                src="https://mc.yandex.ru/watch/89024713"
                                style={{
                                    position: 'absolute',
                                    left: '-9999px',
                                }}
                                alt=""
                            />
                        </div>
                    </noscript>
                </ToastProvider>
            </body>
        </html>
    )
}
