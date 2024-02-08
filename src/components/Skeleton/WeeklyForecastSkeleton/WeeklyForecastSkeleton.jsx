import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const WeeklyForecastSkeleton = () =>{
    return(
        <>
            <Skeleton width={508} height={811} className="!bg-gray-300" />
        </>
    )
}
export default WeeklyForecastSkeleton;