import Image from 'next/image'
import React from 'react'
import styles from './/NavBar.module.css'

function NavBar(props:any) {

  return (
    <div className={styles.NavContainer}>
        <div className={`${styles.Flex}`}>
            <h1>Edvora</h1>
            <div className={`${styles.Inner} ${styles.Flex}`}>
                <h3>{props.userData.name}</h3>
                {
                  props.userData.url && 
                  <Image
                    src={props.userData.url} 
                    alt='User Profile'
                    width={30}
                    height={30}
                    className={styles.UserProfile}
                  />
                }
            </div>
        </div>
    </div>
  )
}

export default NavBar