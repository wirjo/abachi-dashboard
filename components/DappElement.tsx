import { useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import { ChainId } from '@usedapp/core';
import { useTypedSelector } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DappElement = ({ children, contract } : { children: JSX.Element, contract?: Contract | null }) : JSX.Element => {

    const { account, chainId } = useEthers();
    const { currentNetworkChainId } = useTypedSelector((state) => state.app);

    const isCorrectChain = chainId === currentNetworkChainId;
    const correctNetworkName = (currentNetworkChainId == ChainId.Rinkeby) ? 'Rinkeby Test Network' : 'Ethereum Mainnet';

    const ErrorConnectToCorrectNetwork = () => (
        <div className="bg-gray-100 p-5 rounded-md mb-5">
            <p className="text-center">Please change your wallet to connect to <b>{correctNetworkName}</b>.</p>
        </div>
    );

    const ErrorConnectYourWallet = () => (
       <div className="bg-gray-100 p-5 rounded-md mb-5">
           <p className="text-center"><FontAwesomeIcon icon="exclamation-triangle" /> &nbsp; Please connect your wallet</p>
        </div>
    );

    const ErrorSmartContract = () => (
        <div className="bg-red-300 p-5 rounded-md">
            <p className="text-center">Error: smart contract is not available</p>
        </div>
    )

    if ( !contract ) 
        return <ErrorSmartContract />;

    return (
        <div>
            { !account && <ErrorConnectYourWallet /> }
            { (account && !isCorrectChain) && <ErrorConnectToCorrectNetwork/> }
            {children}
        </div>
    );

};

export default DappElement;