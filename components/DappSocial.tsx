
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { discordUrl, twitterUrl } from '../conf/content'; 

const DappSocial = (): JSX.Element => {
    return (
      <div className="grid grid-cols-2 gap-2 socials">
        <div><a rel="noreferrer" target="_blank" href={discordUrl}><FontAwesomeIcon icon={['fab', 'discord']} inverse fixedWidth size="lg" /></a></div>
        <div><a rel="noreferrer" target="_blank" href={twitterUrl}><FontAwesomeIcon icon={['fab', 'twitter']} inverse fixedWidth size="lg" /></a></div>
      </div>
    );
  };
  
  export default DappSocial;
