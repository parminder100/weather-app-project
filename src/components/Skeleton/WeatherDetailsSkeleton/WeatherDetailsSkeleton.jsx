import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const WeatherDetailsSkeleton = () =>{
    return(
        <>
            <Skeleton width={276} height={124} className="!bg-gray-300 mb-[15px] mr-[15px]" />
        </>
    )
}
export default WeatherDetailsSkeleton;