import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import ListItem from './ListItem'
import Header from './Header'
import Footer from './Footer'
import API, { Photo } from '../utils/API'
import { extractPagingParams, PagingParams } from '../utils/string'

const List = () => {
  const [searchParams] = useSearchParams()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [pagingParams, setPagingParams] = useState<PagingParams>()

  useEffect(() => {
    async function fetchData() {
      let apiParams = {}
      const page = searchParams.get('page')
      if (page) apiParams = { page }

      const result = await API.getImages(apiParams)
      setPhotos(result.data)
      
      const pageParams = extractPagingParams(result.headers.link)
      setPagingParams(pageParams)
    }
    
    fetchData()
  }, [searchParams])

  return (
    <>
      <Header>
        {photos.map((photo) => (
          <ListItem key={photo.id} item={photo} />
        ))}
      </Header>
      <Footer pagingParams={pagingParams} />
    </>
  )
}

export default List
