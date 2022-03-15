import Image from 'next/image'
import React from 'react'
import RideCard from './RideCard'
import styles from './Rides.module.css'
import { RideData, UserData, rFilter } from './GlobalFunctions'
let _ = require('lodash');

function Rides() {
  // Variables
  let userData:any = UserData()
  let res:any = RideData(userData)
  //Sorted and Filtered Ride Data
  let nearestRideData:any = res.nearestRideData
  let upComingRideData:any = res.upComingRideData
  let pastRideData:any = res.pastRideData
  // Locations Filtered based on Ride Type
  let nearestloc = res.nearestloc
  let upComingloc = res.upComingloc
  let pastloc = res.pastloc

  // State Variables
  let [loc, setLoc]:any = React.useState([{state: 'State',city:'City'}])
  let [rideFilter, setRideFilter] = React.useState('nrstRide')
  let [data, setData] = React.useState([])
  let [state, setRideState] = React.useState('State')
  let [city, setRideCity] = React.useState('City')

  React.useEffect(() => {

    if(rideFilter === 'nrstRide') {
      setData(nearestRideData)
      setLoc(nearestloc, 'state')
    } else if(rideFilter === 'upCmngRide') {
      setData(upComingRideData)
      setLoc(upComingloc)
    } else if(rideFilter === 'pstRide') {
      setData(pastRideData)
      setLoc(pastloc)
    } else {
      setData([])
    }

    resetStateCity()

    setRideState('State')
    setRideCity('City')
    
    
  }, [rideFilter, userData])

  // Reset Values of City and State Selectors
  const resetStateCity = () => {
    (document.getElementById('state') as HTMLInputElement).value = 'State';
    (document.getElementById('city') as HTMLInputElement).value = 'City';
  }

  const handleStateSelector = (e:any) => {
    setRideState(e.target.value)
    lFilter()
  }

  const handleCitySelector = (e:any) => {
    setRideCity(e.target.value)
    lFilter()
  }

  
  // Location Filter toggle filter visibility
  const lFilter = () => {
    document.getElementById('Filters')?.classList.toggle(`${styles.Hidden}`)
  }

  // // To Hide filter if clicked outside
  // document.onclick = function (e) {
  //   if (e.target.id !== 'FilterBtn' && e.target.id !== 'Filters') {
  //       if (e.target.offsetParent && e.target.offsetParent.id !== 'Filters')
  //         document.getElementById('FilterBtn')?.classList.add(`${styles.Hidden}`)
  //   }
  // }

  return (
    <div className={styles.RidesContainer}>
  
        <div className={styles.OutterFlex}>
            <div className={`${styles.OutterFlex} ${styles.Flex}`}>
                <h4 
                  onClick={() => rFilter(setRideFilter, 'nrstRide', styles)} 
                  className={`${styles.RideMenuOpt} ${styles.ActiveRF} nrstRide`}>
                  Nearest rides ({ nearestRideData?.length })
                </h4>
                <h4 
                  onClick={() => rFilter(setRideFilter, 'upCmngRide', styles)} 
                  className={`${styles.RideMenuOpt} upCmngRide`}>
                  Upcoming rides ({ upComingRideData?.length })
                </h4>
                <h4 
                  onClick={() => rFilter(setRideFilter, 'pstRide', styles)} 
                  className={`${styles.RideMenuOpt} pstRide`}>
                  Past rides ({ pastRideData?.length })
                </h4>
            </div>
  
            <div>
                <div onClick={() => lFilter()} className={`${styles.OutterFlex} ${styles.Flex} ${styles.FilterBtn}`}>
                  <Image
                      src='/../public/images/filter_logo.png'
                      alt='filter-logo'
                      width={10}
                      height={10}
                  />
    
                  <h4 id='FilterBtn' className={styles.Filter}>Filters</h4>                  
                </div>

                {/* Location Filter */}
                <div id='Filters' className={`${styles.FilterDiv} ${styles.Hidden}`}>

                  <select onChange={handleStateSelector} name="state" id="state">
                    <option value='State'>State</option>
                    {
                      // Unique Values of States
                      _.uniqBy(loc, 'state')
                      // Sorting in Alphabetical Order
                      .sort((prev:any,curr:any) => (prev.state > curr.state) ? 1 : ((curr.state > prev.state) ? -1 : 0))
                      .map((obj:any, index:number) => <option value={obj.state} key={index}>{obj.state}</option>)
                    }
                  </select>

                  <select onChange={handleCitySelector} name="city" id="city">
                    <option value='City'>City</option>
                    {
                      state === 'State' 
                      ?
                      // Unique Values of Cities
                      _.uniqBy(loc, 'city')
                      // Sorting in Alphabetical Order
                      .sort((prev:any,curr:any) => (prev.city > curr.city) ? 1 : ((curr.city > prev.city) ? -1 : 0))
                      .map((obj:any, index:number) => <option value={obj.city} key={index}>{obj.city}</option>)
                      :
                      // Unique Values of Cities
                      _.uniqBy(loc, 'city')
                      // Sorting in Alphabetical Order
                      .sort((prev:any,curr:any) => (prev.city > curr.city) ? 1 : ((curr.city > prev.city) ? -1 : 0))
                      // Filtering Cities Based on State
                      .filter((obj:any) => obj.state === state || obj.state === 'State')
                      .map((obj:any, index:number) => <option value={obj.city} key={index}>{obj.city}</option>)
                    }
                  </select>

                </div>
            </div>
        </div>
  
        <div>
            {/* Conditonal Filtering */}

            {/* All States All Cities */}
            {
               (state==='State' && city === 'City') && data.map((ride:any, index:number) => (
                  <RideCard ride={ride} key={index} station_code={userData.station_code}/>
               ))
            }

            {/* Specific State Respective Cities */}
            {
               (state !== 'State' && city === 'City') && data.filter((ride:any) => ride.state === state).map((ride:any, index:number) => (
                <RideCard ride={ride} key={index} station_code={userData.station_code}/>
               ))
            }

            {/* Specific City */}
            {
               (state === 'State' && city !== 'City') && data.filter((ride:any) => ride.city === city).map((ride:any, index:number) => (
                <RideCard ride={ride} key={index} station_code={userData.station_code}/>
               ))
            }

            {/* Specific City and State */}
            {
               (state !=='State' && city !== 'City') && data.filter((ride:any) => (ride.state === state && ride.city === city))
               .map((ride:any, index:number) => (
                <RideCard ride={ride} key={index} station_code={userData.station_code}/>
               ))
            }
  
        </div>
  
    </div>
  )

}

export default Rides