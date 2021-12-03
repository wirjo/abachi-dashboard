/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { ChainId } from '@usedapp/core';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { allowedChains } from '../conf/config';

const chainIdToName: Record<number, string> = {
  [ChainId.Rinkeby]: 'Rinkeby',
  [ChainId.Localhost]: 'Localhost',
  [ChainId.Mainnet]: 'Mainnet',
};

export default function NetworkMenu({
  setNetwork,
  currentNetworkChainId,
}: {
  setNetwork: (chainId: number) => void;
  currentNetworkChainId: number;
}): JSX.Element {
  return (
    <div className="hidden ml-3 md:block w-32">
      <Listbox value={currentNetworkChainId} onChange={setNetwork}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{chainIdToName[currentNetworkChainId]}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {allowedChains.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                        cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}
                      >
                        {chainIdToName[person]}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-amber-600' : 'text-amber-600'}
                              absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
