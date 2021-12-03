import { Disclosure } from '@headlessui/react';
import { useNotifications } from '@usedapp/core';
import React from 'react';
import Snackbar, { SnackSeverity } from '../Snackbar';
import DappMenu from '../DappMenu';
import DappSocial from '../DappSocial';
import NetworkMenu from '../NetworkMenu';
import { useDispatch } from 'react-redux';
import { setCurrentNetworkChainId } from '../../redux/app';
import Footer from '../Footer';
import { useTypedSelector } from '../../redux/store';
import Image from 'next/image';
import ImageLogo from '../../public/images/logo.png';
import { useRouter } from 'next/router';
import { siteTitle, siteTagline } from '../../conf/content';


// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any;
  }
}

const TRANSACTION_TITLES: Record<string, { text: string; type: SnackSeverity }> = {
  transactionStarted: { text: 'Transaction Started...', type: 'pending' },
  transactionSucceed: { text: 'Transaction Completed !', type: 'success' },
  transactionFailed: { text: 'Transaction Failed :(', type: 'error' },
  walletConnected: { text: 'Wallet Connected Successfully !', type: 'success' },
};


const Layout = ({ children, hero = false } :  { children: any, hero?: any }): JSX.Element => {
  const dispatch = useDispatch();
  const { notifications } = useNotifications();
  const { currentNetworkChainId } = useTypedSelector(
    (state) => state.app,
  );

  const router = useRouter();
  const networkMenu = router.query?.network;
  
  return (
    <div className="flex flex-col overflow-hidden">
      <header className={hero ? 'hero-bg' : ''}>
        <div className="container max-w-screen-lg mx-auto py-5">
          <Disclosure as="nav" className="px-1 header">
            {() => (
              <>
                <div className="mx-auto px-2">
                  <div className="relative md:flex justify-center md:justify-between h-16">
                    <div className="flex justify-center items-center mb-5">
                      <div className="logo mr-3">
                        <Image layout="fixed" src={ImageLogo} width={184} height={34} quality={100} alt="" />
                      </div>
                      <div className="logo-text">
                        Dashboard
                      </div>
                    </div>
                    <div className="md:flex md:items-center md:absolute md:inset-y-0 md:right-0">
                      <div className="hidden md:flex">
                        <DappSocial />
                      </div>
                      { networkMenu &&
                      <NetworkMenu
                        setNetwork={(chainId) => {
                          dispatch(setCurrentNetworkChainId(chainId));
                        }}
                        currentNetworkChainId={currentNetworkChainId}
                      /> }
                      <div className="text-center mx-auto">
                        <DappMenu />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
        </div>
      </header>
      <main className="flex-grow relative">
     
        { children }

        <div className="absolute bottom-0 left-0 w-full p-2 flex flex-col">
          {notifications.map((notif) => {
            const message = TRANSACTION_TITLES[notif.type].text;
            const severity =  TRANSACTION_TITLES[notif.type].type;
          
            return(
              <div className="mt-2" key={notif.id}>
                <Snackbar message={message} severity={severity} />
              </div>
            )

          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
