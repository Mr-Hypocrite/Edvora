import Image from 'next/image'
import React from 'react'
import useFetch from '../hooks/useFetch'
import styles from './/NavBar.module.css'

function NavBar() {
  let [ userData ]:any = useFetch('https://assessment.api.vweb.app/user')

  return (
    <div className={styles.NavContainer}>
        <div className={`${styles.Flex}`}>
            <h1>Edvora</h1>
            <div className={`${styles.Inner} ${styles.Flex}`}>
                <h3>{userData.name}</h3>
                <img
                    src={userData.url}
                    className={styles.UserProfile}
                    alt='User Profile'
                    width={30}
                    height={30}
                />
            </div>
        </div>
    </div>
  )
}

export default NavBar