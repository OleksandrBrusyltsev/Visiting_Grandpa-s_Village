import Script from 'next/script'

export const GoogleTagManager = () => {
    const id = process.env.NEXT_GTM_ID
    return (
        <>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-TZT7RV8"
            />
            <Script id="google-analytics">
                {`
                       window.dataLayer = window.dataLayer || [];
                       function gtag(){dataLayer.push(arguments);}
                       gtag('js', new Date());
                       gtag('config', 'G-TZT7RV8');
                    `}
            </Script>
        </>
    )
}
