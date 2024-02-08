import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const WeatherSkeleton = () =>{
    return(
        <>
            <Skeleton width={568} height={298} className="!bg-gray-300 mb-[30px]" />
        </>
    )
}
export default WeatherSkeleton;