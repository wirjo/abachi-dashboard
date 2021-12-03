/* eslint-disable @next/next/no-img-element */
import { useEthers } from '@usedapp/core';
import blockies from 'blockies-ts';
import React, { Fragment } from 'react';
import ConnectWallet from './ConnectWallet';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';

function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...');
}

const DappMenu = (): JSX.Element => {
  const { account, deactivate } = useEthers();
  let blockieImageSrc: string;

  if (typeof window !== 'undefined') {
    blockieImageSrc = blockies.create({ seed: account as string | undefined }).toDataURL();
  }

  return (
    <Menu as="div" className="ml-3 relative z-20">
      {({ open }) =>
        !account ? (
          <ConnectWallet />
        ) : (
          <>
            <Menu.Button className="group p-2 py-3 pr-6 w-full flex items-center justify-between rounded-3xl shadow-sm space-x-3 text-left text-white bg-gray-600 hover:bg-gray-800">
              <span className="min-w-0 flex-1 flex items-center h-6 space-x-3">
                <span className="flex flex-col justify-center items-center rounded-lg">
                  <img
                    style={{ height: 30, width: 30 }}
                    src={blockieImageSrc}
                    className="rounded-full"
                    alt="blockie"
                  />
                </span>
                <span className="block min-w-0 flex">
                  <span className="inline-block text-sm font-bold font-medium text-white-900 truncate">
                    {truncateHash(account)}
                  </span>
                </span>
              </span>
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-full rounded-3xl shadow-lg py-1 bg-gray-200 ring-1 ring-black ring-opacity-5"
              >
                <Menu.Item
                  onClick={() => {
                    deactivate();
                  }}
                >
                  {({ active }) => (
                    <p
                      className={classNames(
                        active ? 'bg-gray-300' : '',
                        'block rounded-3xl px-5 py-1 text-sm cursor-pointer',
                      )}
                    >
                      Disconnect
                    </p>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )
      }
    </Menu>
  );
};

export default DappMenu;
