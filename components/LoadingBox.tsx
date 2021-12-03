import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoadingBox() : JSX.Element {

    return (
        <div className="text-center py-5 px-10 bg-white rounded-md shadow">
            <div className="w-72 mx-auto">
                <FontAwesomeIcon icon="spinner" spin />
            </div>
        </div>
    );

}