import DappSocial from './DappSocial';
import { nftName } from '../conf/content';

const Section = (): JSX.Element => {
    return (
        <footer className="p-10 bg-gray-900 text-sm text-center">
            <div className="text-xs mb-5 text-white max-w-screen-md mx-auto">
                Made with ❤️ &nbsp;in Sydney, Australia
            </div>
            <div className="mx-auto text-center">
                <div className="flex justify-center">
                    <DappSocial />
                </div>
            </div>
        </footer>
    );
  };
  
  export default Section;