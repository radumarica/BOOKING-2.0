import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/common/Navbar';
import FooterSection from '@/components/common/Footer';
import { EthWalletProvider } from '@/contexts/EthProvider';
import SolanaProvider from '@/contexts/SolanaProvider';

import 'react-datepicker/dist/react-datepicker.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <EthWalletProvider>
            <SolanaProvider>
                <Header />
                <Component {...pageProps} />
                <FooterSection />
            </SolanaProvider>
        </EthWalletProvider>
    </>
);

export default MyApp;
