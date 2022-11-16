/* eslint-disable no-alert */
/* eslint-disable @next/next/no-img-element */
import { FC, useContext } from 'react';
import { Navbar, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { EthWalletContext, EthWalletContextProps } from 'contexts/EthProvider';

import { IoLanguage } from 'react-icons/io5';

import SolanaLogo from '../logos/SolanaLogo';

declare const window: any;

const Header: FC = () => {
    const router = useRouter();
    const isActive = (path: string) => router.pathname === path;
    const { publicKey, connected, disconnect } = useWallet();
    const textToShow = publicKey ? `${publicKey.toBase58().slice(0, 14)}...` : 'Connect Wallet';
    const { walletAddress, connectWallet } = useContext(EthWalletContext) as EthWalletContextProps;

    return (
        <Navbar className="flex justify-between  shadow-md  bg-white h-20">
            <Navbar.Brand href="/">
                <Image
                    src="/images/palmverse-logo.png"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                    width={50}
                    height={50}
                />
                <span className="self-center text-gray-600 whitespace-nowrap text-xl font-semibold ml-2 dark:text-white">
                    Palmverse
                </span>
            </Navbar.Brand>

            <ul className="flex -mr-28">
                {['Home', 'Locations', 'About Us', 'Privacy Legal', 'Contact Us'].map((item) => (
                    <li
                        key={item}
                        className={`${
                            isActive(`${item}`) ? 'text-primary bg-opacity-10' : ''
                        }  transition-all rounded-md px-4 py-1 font-medium cursor-pointer text-sm hover:underline underline-offset-4 text-black dark:text-white`}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            <div className="flex ">
                <button
                    type="button"
                    className="text-gray-600 flex items-center tracking-wider text-sm hover:bg-secondary transition-all bg-white border-[1px] border-gray-300  px-4 py-2 rounded-md mr-2  "
                >
                    <IoLanguage className="inline-block mr-2" />
                    Language
                </button>
                <div className="flex">
                    {!publicKey && !connected && !walletAddress ? (
                        <Dropdown label="Connect Wallet" className="mr-2">
                            <Dropdown.Item>
                                <div>
                                    {connected && publicKey && !walletAddress ? (
                                        <Dropdown
                                            style={{
                                                background:
                                                    'linear-gradient(to bottom right, #7a3ae8, #8037ad)',
                                                color: '#fff',
                                                borderRadius: '4px',
                                            }}
                                            label={textToShow}
                                        >
                                            {publicKey && (
                                                <>
                                                    <Dropdown.Item>
                                                        <button
                                                            type="button"
                                                            className="py-3 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                        >
                                                            My Current Bookings
                                                        </button>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <button
                                                            type="button"
                                                            className="py-3 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                        >
                                                            My Previous Bookings
                                                        </button>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <button
                                                            onClick={() => disconnect()}
                                                            type="button"
                                                            className="py-2 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                        >
                                                            Disconnect
                                                        </button>
                                                    </Dropdown.Item>
                                                </>
                                            )}
                                        </Dropdown>
                                    ) : (
                                        !walletAddress && (
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="md:hidden">
                                                        <WalletModalProvider>
                                                            <WalletMultiButton className="sol-btn" />
                                                        </WalletModalProvider>
                                                    </div>
                                                    <div className="hidden md:block w-fit ">
                                                        <WalletModalProvider>
                                                            <WalletMultiButton
                                                                startIcon={<SolanaLogo />}
                                                                className="sol-btn"
                                                            />
                                                        </WalletModalProvider>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <div>
                                    {walletAddress && !publicKey ? (
                                        <Dropdown
                                            style={{
                                                background:
                                                    'linear-gradient(to bottom right, #7a3ae8, #8037ad)',
                                                color: '#fff',
                                                borderRadius: '4px',
                                            }}
                                            label={`${walletAddress.slice(0, 12)}....`}
                                        >
                                            {walletAddress && (
                                                <>
                                                    <Dropdown.Item>
                                                        <button
                                                            type="button"
                                                            className="py-3 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                        >
                                                            My Current Bookings
                                                        </button>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <button
                                                            type="button"
                                                            className="py-3 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                        >
                                                            My Previous Bookings
                                                        </button>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <button
                                                            onClick={() => {
                                                                localStorage.removeItem(
                                                                    'ethWalletAddress'
                                                                );
                                                                Router.reload();
                                                            }}
                                                            type="button"
                                                            className="py-2 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                        >
                                                            Disconnect
                                                        </button>
                                                    </Dropdown.Item>
                                                </>
                                            )}
                                        </Dropdown>
                                    ) : (
                                        !publicKey && (
                                            // <div className="flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    window.ethereum
                                                        ? connectWallet()
                                                        : alert('Install the Metamask Extension')
                                                }
                                                className="py-[13px]   text-sm font-bold text-white rounded-md tracking-wide w-48 bg-[#EE811A] hover:bg-[#9b581a] transition-all"
                                            >
                                                {walletAddress ? (
                                                    `${walletAddress.slice(0, 12)}....`
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="flex items-center justify-end ml-4  "
                                                    >
                                                        <img
                                                            src="/images/logos/MetaMask_Fox.png"
                                                            height={24}
                                                            width={24}
                                                            alt="metamask"
                                                            className="mr-2"
                                                        />
                                                        <p className="text-sm font-bold  ">
                                                            Connect Metamask
                                                        </p>
                                                    </button>
                                                )}
                                            </button>
                                            // </div>
                                        )
                                    )}
                                </div>
                            </Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <>
                            <div>
                                {connected && publicKey && !walletAddress ? (
                                    <Dropdown
                                        style={{
                                            background:
                                                'linear-gradient(to bottom right, #7a3ae8, #8037ad)',
                                            color: '#fff',
                                            borderRadius: '4px',
                                        }}
                                        label={textToShow}
                                    >
                                        {publicKey && (
                                            <>
                                                <Dropdown.Item>
                                                    <button
                                                        type="button"
                                                        className="py-3 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                    >
                                                        My Current Bookings
                                                    </button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <button
                                                        type="button"
                                                        className="py-3 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                    >
                                                        My Previous Bookings
                                                    </button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <button
                                                        onClick={() => disconnect()}
                                                        type="button"
                                                        className="py-2 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                    >
                                                        Disconnect
                                                    </button>
                                                </Dropdown.Item>
                                            </>
                                        )}
                                    </Dropdown>
                                ) : (
                                    !walletAddress && (
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <div className="md:hidden">
                                                    <WalletModalProvider>
                                                        <WalletMultiButton className="sol-btn" />
                                                    </WalletModalProvider>
                                                </div>
                                                <div className="hidden md:block">
                                                    <WalletModalProvider>
                                                        <WalletMultiButton
                                                            startIcon={<SolanaLogo />}
                                                            className="sol-btn"
                                                        />
                                                    </WalletModalProvider>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div>
                                {walletAddress && !publicKey ? (
                                    <Dropdown
                                        style={{
                                            background:
                                                'linear-gradient(to bottom right, #7a3ae8, #8037ad)',
                                            color: '#fff',
                                            borderRadius: '4px',
                                        }}
                                        label={`${walletAddress.slice(0, 12)}....`}
                                    >
                                        {walletAddress && (
                                            <>
                                                <Dropdown.Item>
                                                    <button
                                                        type="button"
                                                        className="py-3 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                    >
                                                        My Current Bookings
                                                    </button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <button
                                                        type="button"
                                                        className="py-3 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                    >
                                                        My Previous Bookings
                                                    </button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <button
                                                        onClick={() => {
                                                            localStorage.removeItem(
                                                                'ethWalletAddress'
                                                            );
                                                            Router.reload();
                                                        }}
                                                        type="button"
                                                        className="py-2 px-4 w-full fond-lg font-semibold font-exo rounded-md wallet-btn text-white "
                                                    >
                                                        Disconnect
                                                    </button>
                                                </Dropdown.Item>
                                            </>
                                        )}
                                    </Dropdown>
                                ) : (
                                    !publicKey && (
                                        // <div className="flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                window.ethereum
                                                    ? connectWallet()
                                                    : alert('Install the Metamask Extension')
                                            }
                                            className="py-[13px]   text-sm font-bold text-white rounded-md tracking-wide w-48 bg-[#EE811A] hover:bg-[#9b581a] transition-all"
                                        >
                                            {walletAddress ? (
                                                `${walletAddress.slice(0, 12)}....`
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-end ml-4  "
                                                >
                                                    <img
                                                        src="/images/logos/MetaMask_Fox.png"
                                                        height={24}
                                                        width={24}
                                                        alt="metamask"
                                                        className="mr-2"
                                                    />
                                                    <p className="text-sm font-bold  ">
                                                        Connect Metamask
                                                    </p>
                                                </button>
                                            )}
                                        </button>
                                        // </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </div>
                <Navbar.Toggle />
            </div>
        </Navbar>
    );
};

export default Header;
