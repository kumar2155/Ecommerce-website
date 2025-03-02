import React from 'react'
import Hero1 from '../components/Hero/Hero1'
import Popular1 from '../components/Popular/Popular1';
import Offers from '../components/Offers/Offers'
import NewCollections from '../components/NewCollections/NewCollections';
import NewsLetter from '../components/NewsLetter/NewsLetter';
const Shop = () => {
  return (
    <div>
      <Hero1/>
      <br/>
      <Popular1/>
      <br/>
      <Offers/>
      <NewCollections/>

      <NewsLetter/>
      
    </div>
  )
}

export default Shop

