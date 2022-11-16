import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
    <Html>
        <Head>
            <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
