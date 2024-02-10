import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewsSkeleton = () =>{
    return(
        <>
            <Skeleton width={568} height={482} className="!bg-gray-300 mb-[15px]" />
        </>
    )
}
export default NewsSkeleton;