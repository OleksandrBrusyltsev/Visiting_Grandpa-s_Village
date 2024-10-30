import Script from 'next/script'

export const GoogleTagManager = () => {
    const id = process.env.NEXT_GTM_ID
    return (
        <>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-P4PLX64BWS"

            />
            <Script id="google-analytics">
                {`
                       window.dataLayer = window.dataLayer || [];
                       function gtag(){dataLayer.push(arguments);}
                       gtag('js', new Date());
                       gtag('config', 'G-P4PLX64BWS');

                    `}
            </Script>
        </>
    )
}
