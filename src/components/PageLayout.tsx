import React, { ReactNode } from 'react'
import styles from '../styles/page_layout.module.scss'


function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page_layout} >
        {children}
    </div>
  )
}

export default PageLayout