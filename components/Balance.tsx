import { useEtherBalance, useEthers } from '@usedapp/core';
import { utils } from 'ethers';

const Balance = (): JSX.Element => {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const finalBalance = etherBalance ? utils.formatEther(etherBalance) : '';

  return <p className="font-light text-xs text-gray-700">{(+finalBalance).toFixed(2)} ETH</p>;
};

export default Balance;
