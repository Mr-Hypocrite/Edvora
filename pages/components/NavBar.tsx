import Image from 'next/image'
import React from 'react'
import useFetch from '../hooks/useFetch'
import styles from './/NavBar.module.css'
import { UserData } from './GlobalFunctions'

function NavBar() {
  let userData:any = UserData()

  return (
    <div className={styles.NavContainer}>
        <div className={`${styles.Flex}`}>
            <h1>Edvora</h1>
            <div className={`${styles.Inner} ${styles.Flex}`}>
                <h3>{userData.name}</h3>
                {
                  userData.url && 
                  <Image
                    src={userData.url} 
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