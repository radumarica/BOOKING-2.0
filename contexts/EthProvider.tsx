import { useState, useEffect, createContext, useMemo, ReactNode } from 'react';
import { ethers } from 'ethers';

declare const window: any;

export interface EthWalletContextProps {
    walletAddress: string;
    nfts: any[];
    connectWallet: Function;
    walletBalance: number;
}

const EthWalletContext = createContext<EthWalletContextProps | null>(null);

const EthWalletProvider = ({ children }: { children: ReactNode }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [nfts, setNfts] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);
    const [ethWallet, setEthWallet] = useState<any>();

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            setEthWallet(signer);
        }
    }, []);

    useEffect(() => {
        if (walletAddress) {
            window.ethereum
                .request({
                    method: 'eth_getBalance',
                    params: [walletAddress, 'latest'],
                })
                .then((balance: string) => {
                    setWalletBalance(Number(ethers.utils.formatEther(balance)));
                });
        }
    }, [walletAddress]);

    useEffect(() => {
        if (!walletAddress) return;
        const getNfts = async () => {
            try {
                const res = await fetch(
                    `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`
                );
                const data = await res.json();
                const eligibleNfts = data.items.filter((item: any) => {
                    if (
                        item.creators.length > 0 &&
                        item.creators[0].account ===
                            'ETHEREUM:0x11db46d02dc30f632cb988eb7eb7ad8045004f71'
                    ) {
                        return item;
                    }
                    return null;
                });
                console.log('unfiltered nfts', data.items);
                console.log('eligibleNfts', eligibleNfts);
                setNfts(data.items);
            } catch (err) {
                console.error(err);
            }
        };
        getNfts();
    }, [walletAddress]);

    const connectWallet = async () => {
        try {
            if (localStorage.getItem('ethWalletAddress')) {
                setWalletAddress(localStorage.getItem('ethWalletAddress')!);
            } else {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                localStorage.setItem('ethWalletAddress', accounts[0]);
                setWalletAddress(accounts[0]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const contextValue = useMemo(
        () => ({
            walletAddress,
            nfts,
            connectWallet,
            walletBalance,
        }),
        [walletAddress, nfts, walletBalance]
    );

    return <EthWalletContext.Provider value={contextValue}>{children}</EthWalletContext.Provider>;
};

export { EthWalletContext, EthWalletProvider };
