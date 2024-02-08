import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HourlyForecastSkeleton = () =>{
    return(
        <>
            <Skeleton width={528} height={140} className="!bg-gray-300" />
        </>
    )
}
export default HourlyForecastSkeleton;