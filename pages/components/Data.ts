import React from 'react'
import useFetch from '../hooks/useFetch'

// let userData:any = UserData();

function RideData(userData:any) {
  let url = 'https://assessment.api.vweb.app/rides'
  let loc:[{
    state:string,
    city:string,
  }] = [{state: 'All', city: 'All'}]

  let [ res ] = useFetch(url)

  let data = res.map((ride:any) => {
    //   Using Reduce to find nearest station from station path array
    let closest = Math.abs(ride.station_path.reduce((prev:number, curr:number) => {
      return Math.abs(curr - userData.station_code) < Math.abs(prev - userData.station_code) ? curr : prev
    }))
    
    // Adding States and Cities to the Location Array of Objects
    loc.push({'state':ride.state, 'city':ride.city})

    //   Adding Distance in Each Object in the Array
    return ({...ride, distance: Math.abs(closest - userData.station_code)})
  }).sort(compare)

  let nearestRideData = data.filter((ride) => toTimestamp(ride.date) >= toTimestamp(Date()))
  let upComingRideData = data.filter((ride) => toTimestamp(ride.date) > toTimestamp(Date()))
  let pastRideData = data.filter((ride) => toTimestamp(ride.date) < toTimestamp(Date()))
  return {
    nearestRideData: nearestRideData,
    upComingRideData: upComingRideData,
    pastRideData: pastRideData,
    locations: loc
  }
}

function UserData() {
  let url = 'https://assessment.api.vweb.app/user'
  let [ data ] = useFetch(url)
  return data
}


function toTimestamp(strDate:string){
    var datum = Date.parse(strDate);
    return datum/1000;
}

function compare( a:any, b:any ) {
  if ( a.distance < b.distance ){
    return -1;
  } else if ( a.distance > b.distance ){
    return 1;
  } else {
    return 0;
  }
}

function rFilter (setRideFilter:any, type:string, styles:any) {

  if(type === 'nrstRide') {
    setRideFilter('nrstRide')
    document.querySelector('.nrstRide')?.classList.add(`${styles.ActiveRF}`)
    document.querySelector('.upCmngRide')?.classList.remove(`${styles.ActiveRF}`)
    document.querySelector('.pstRide')?.classList.remove(`${styles.ActiveRF}`)
  } else if (type === 'upCmngRide') {
    setRideFilter('upCmngRide')
    document.querySelector('.nrstRide')?.classList.remove(`${styles.ActiveRF}`)
    document.querySelector('.upCmngRide')?.classList.add(`${styles.ActiveRF}`)
    document.querySelector('.pstRide')?.classList.remove(`${styles.ActiveRF}`)
  } else if (type === 'pstRide') {
    setRideFilter('pstRide')
    document.querySelector('.nrstRide')?.classList.remove(`${styles.ActiveRF}`)
    document.querySelector('.upCmngRide')?.classList.remove(`${styles.ActiveRF}`)
    document.querySelector('.pstRide')?.classList.add(`${styles.ActiveRF}`)
  }
  
}

export {UserData, RideData, toTimestamp, compare, rFilter}