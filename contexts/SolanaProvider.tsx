import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { SOLANA_RPC_ENDPOINT } from '@/constants/frontend';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

interface ChildrenProp {
    children: React.ReactNode;
}

const SolanaProvider: FC<ChildrenProp> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = SOLANA_RPC_ENDPOINT;

    const wallets = useMemo(
        () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider autoConnect wallets={wallets}>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default SolanaProvider;
