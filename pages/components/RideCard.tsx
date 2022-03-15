import React from 'react'
import styles from './RideCard.module.css'

function RideCard(props:any) {

  return (
    <div className={styles.Card}>
        <img
          src={props.ride.map_url}
          alt='map-image'
          width={300}
          height={150}
          className={styles.CardImage}
        />

      <div className={styles.Flex}>
        <h4>Ride Id: {props.ride.id}</h4>
        <h4>Origin Station: {props.ride.origin_station_code}</h4>
        <h4>station_path : [{ props.ride.station_path.toString() }]</h4>
        <h4>Date : {props.ride.date}</h4>
        <h4>Distance : {props.ride.distance}</h4>
        <h4>UserStation : {props.station_code}</h4>
      </div>

      <div className={styles.LocTag}>
        <div className={styles.Tag}><p>{props.ride.city}</p></div>
        <div className={styles.Tag}><p>{props.ride.state}</p></div>
      </div>
    </div>
  )
}

export default RideCard