import Image from 'next/image'
import React from 'react'
import RideCard from './RideCard'
import styles from './Rides.module.css'
import { rFilter } from '../Functions/GlobalFunctions'
let _ = require('lodash');

function Rides(props:any) {

  // State Variables
  let [loc, setLoc]:any = React.useState([{state: 'State',city:'City'}])
  let [rideFilter, setRideFilter] = React.useState('nrstRide')
  let [data, setData] = React.useState([])
  let [state, setRideState] = React.useState('State')
  let [city, setRideCity] = React.useState('City')

  // Reset Values of State Var & Selectors
    const resetState = () => {
      (document.getElementById('state') as HTMLInputElement).value = 'State';
      setRideState('State')
    }

  // Reset Values of City Var & Selectors
  const resetCity = () => {
    (document.getElementById('city') as HTMLInputElement).value = 'City';
    setRideCity('City')
  }

  // State Selector Handler 
  const handleStateSelector = (e:any) => {
    setRideState(e.target.value)
    resetCity()
    lFilter()
  }

  // City Selector Handler 
  const handleCitySelector = (e:any) => {
    setRideCity(e.target.value)
    lFilter()
  }

  
  // Location Filter toggle filter visibility
  const lFilter = () => {
    document.getElementById('Filters')?.classList.toggle(`${styles.Hidden}`)
  }

  React.useEffect(() => {

    // Setting Rides & List of Locations based on filter
    if(rideFilter === 'nrstRide') {
        setData(props.data.nearestRideData)
        setLoc(props.data.nearestloc)
      } else if(rideFilter === 'upCmngRide') {
        setData(props.data.upComingRideData)
        setLoc(props.data.upComingloc)
      } else if(rideFilter === 'pstRide') {
        setData(props.data.pastRideData)
        setLoc(props.data.pastloc)
      } else {
        setData([])
      }

    resetState()
    resetCity()
  }, [props.data.nearestRideData, props.data.upComingRideData, props.data.pastRideData, 
    props.data.nearestloc, props.data.upComingloc, props.data.pastloc, rideFilter])

  return (
    <div className={styles.RidesContainer}>
  
        <div className={styles.OutterFlex}>
            <div className={`${styles.OutterFlex} ${styles.Flex}`}>
                <h4 
                  onClick={() => rFilter(setRideFilter, 'nrstRide', styles)} 
                  className={`${styles.RideMenuOpt} ${styles.ActiveRF} nrstRide`}>
                  Nearest rides ({ props.data.nearestRideData?.length })
                </h4>
                <h4 
                  onClick={() => rFilter(setRideFilter, 'upCmngRide', styles)} 
                  className={`${styles.RideMenuOpt} upCmngRide`}>
                  Upcoming rides ({ props.data.upComingRideData?.length })
                </h4>
                <h4 
                  onClick={() => rFilter(setRideFilter, 'pstRide', styles)} 
                  className={`${styles.RideMenuOpt} pstRide`}>
                  Past rides ({ props.data.pastRideData?.length })
                </h4>
            </div>
  
            <div>
                <div onClick={() => lFilter()} className={`${styles.OutterFlex} ${styles.Flex} ${styles.FilterBtn}`}>
                  <Image
                      src='https://github.com/Mr-Hypocrite/Edvora/blob/main/public/images/filter_logo.png?raw=true'
                      alt='filter-logo'
                      width={10}
                      height={10}
                  />
    
                  <h4 id='FilterBtn' className={styles.Filter}>Filters</h4>                  
                </div>

                {/* Location Filter/Selectors */}
                <div id='Filters' className={`${styles.FilterDiv} ${styles.Hidden}`}>

                  <select onChange={handleStateSelector} name="state" id="state" className={styles.LocSelector}>
                    <option value='State'>State</option>
                    {
                      // Unique Values of States
                      _.uniqBy(loc, 'state')
                      // Sorting in Alphabetical Order
                      .sort((prev:any,curr:any) => (prev.state > curr.state) ? 1 : ((curr.state > prev.state) ? -1 : 0))
                      .map((obj:any, index:number) => <option value={obj.state} key={index}>{obj.state}</option>)
                    }
                  </select>

                  <select onChange={handleCitySelector} name="city" id="city" className={styles.LocSelector}>
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
                  <RideCard ride={ride} key={index}/>
               ))
            }

            {/* Specific State Respective Cities */}
            {
               (state !== 'State' && city === 'City') && data.filter((ride:any) => ride.state === state).map((ride:any, index:number) => (
                <RideCard ride={ride} key={index}/>
               ))
            }

            {/* Specific City */}
            {
               (state === 'State' && city !== 'City') && data.filter((ride:any) => ride.city === city).map((ride:any, index:number) => (
                <RideCard ride={ride} key={index}/>
               ))
            }

            {/* Specific City and State */}
            {
               (state !=='State' && city !== 'City') && data.filter((ride:any) => (ride.state === state && ride.city === city))
               .map((ride:any, index:number) => (
                <RideCard ride={ride} key={index}/>
               ))
            }
  
        </div>
  
    </div>
  )

}

export default Rides