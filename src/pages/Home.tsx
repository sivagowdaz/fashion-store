import React, {useState} from 'react'
import styles from '../styles/home.module.scss'
import PageLayout from '../components/PageLayout'
import Logo from '../components/Logo'
import HomeSearchBar from '../components/HomeSearchBar'
import TrendSuggetionCard from '../components/TrendSuggetionCard'
import { SuggestedItemType } from '../utils/types'
import { getSimillarTrendList } from '../utils/helpers'
import {Link} from 'react-router-dom'

function Home() {
    const [suggestedItems, setSuggestedItems] = useState<SuggestedItemType[]>([])

    const handleSearchStrChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value == ''){
            setSuggestedItems([])
            return
        }
        let similarTrendsTitles = getSimillarTrendList(e.target.value)
        setSuggestedItems(similarTrendsTitles)
    };

  return (
    <PageLayout >
        <div className={styles.mask}></div>
        <div className={styles.home}>
            <Logo/>
            <div className={styles.searchbar_container}>
                <HomeSearchBar onChangeHandler={handleSearchStrChange}/>
            </div>
            {
                suggestedItems.length > 0 && 
                <div className={styles.suggetion_container}>
                    <p className={styles.suggetion_container_title}>Latest Trends</p>
                    <div className={styles.trend_card_container}>
                        {
                            suggestedItems.slice(0,5).map((item, index)=>
                                <Link key={index} to='products' state={{ searchKey: item.title}} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <TrendSuggetionCard key={index} url={item.url} title={item.title} />
                                </Link>
                            )
                        }
                    </div>
                    <div className={styles.other_sugetions}>
                        <p className={styles.suggetion_container_title}>Popular Sugetions</p>
                        {
                        suggestedItems.slice(5,10).map((title, index)=>
                            <Link key={index} to='products' state={{ searchKey: title}} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <p key={index} className={styles.other_sugetion_title}>{title.title}</p>
                                </Link>
                              
                            )
                        }
                    </div>
                </div>
            }

        </div>
    </PageLayout>
  )
}

export default Home