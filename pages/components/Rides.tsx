import Image from 'next/image'
import React from 'react'
import RideCard from './RideCard'
import styles from './Rides.module.css'
import { compare, RideData, UserData, rFilter } from './Data'
import useFetch from '../hooks/useFetch'

function Rides() {
  let userData:any = UserData()
  let res:any = RideData(userData)
  let nearestRideData:any = res.nearestRideData
  let upComingRideData:any = res.upComingRideData
  let pastRideData:any = res.pastRideData
  let loc:any = res.locations
  const [isLoading, setLoading] = React.useState(false)
  let [rideFilter, setRideFilter] = React.useState('nrstRide')
  let [data, setData] = React.useState([])

  React.useEffect(() => {

    if(rideFilter === 'nrstRide') {
      setData(nearestRideData)
      setLoading(false)
    } else if(rideFilter === 'upCmngRide') {
      setData(upComingRideData)
      setLoading(false)
    } else if(rideFilter === 'pstRide') {
      setData(pastRideData)
      setLoading(false)
    } else {
      setData([])
      setLoading(false)
    }
    
  }, [nearestRideData, upComingRideData, pastRideData, rideFilter])

  return (
    <div className={styles.RidesContainer}>
  
        <div className={styles.OutterFlex}>
            <div className={`${styles.OutterFlex} ${styles.Flex}`}>
                <h4 onClick={() => rFilter(setRideFilter, 'nrstRide', styles)} className={`${styles.RideMenuOpt} ${styles.ActiveRF} nrstRide`}>Nearest rides ({ nearestRideData?.length })</h4>
                <h4 onClick={() => rFilter(setRideFilter, 'upCmngRide', styles)} className={`${styles.RideMenuOpt} upCmngRide`}>Upcoming rides ({ upComingRideData?.length })</h4>
                <h4 onClick={() => rFilter(setRideFilter, 'pstRide', styles)} className={`${styles.RideMenuOpt} pstRide`}>Past rides ({ pastRideData?.length })</h4>
            </div>
  
            <div className={`${styles.OutterFlex} ${styles.Flex} ${styles.FilterBtn}`}>
                <Image
                    src='/../public/images/filter_logo.png'
                    alt='filter-logo'
                    width={10}
                    height={10}
                />
  
                <h4 className={styles.Filter}>Filters</h4>
  
                <div className={styles.FilterDiv}>
                    <h4>State</h4>
                    <h4>City</h4>
                </div>
            </div>
        </div>
  
        <div>
  
            {
               data.map((ride:any, index:number) => (
                  <RideCard ride={ride} key={index} station_code={userData.station_code}/>
               ))
            }
  
        </div>
  
    </div>
  )

}

export default Rides