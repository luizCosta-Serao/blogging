import React from 'react'
import { FetchPosts } from '../../context/PostsContext'
import Loading from '../Loading/Loading'
import styles from './TopPosts.module.css'

const TopPosts = () => {

  const [posts, setPosts] = React.useState<FetchPosts | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [position, setPosition] = React.useState(0)
  const [active, setActive] = React.useState(0)

  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (contentRef.current && posts) {
      setPosition(-((contentRef.current.offsetWidth + 16) * active))
    }
  }, [active, posts])

  function slideNext() {
    if (posts && active < (posts?.data.length - 1) / 2) {
      setActive(active + 1)
    }
  }

  function slidePrev() {
    if (active > 0) {
      setActive(active - 1)
    }
  }

  const showPosts = async (limit: number) => {
    setLoading(true)
    setPosts(null)
    try {
      const response = await fetch(`https://dummyapi.io/data/v1/post?limit=${limit}`, {
        method: 'GET',
        headers: {
          'app-id': '65b29d2939a4e031164e10a7'
        }
      })
      if(!response.ok) throw new Error(`Error: ${response.status}`)
      const json = (await response.json()) as FetchPosts
      setPosts(json)
    } catch (error) {
      if(error instanceof Error) setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    showPosts(6)
  }, [])

  if (loading) return <Loading />
  if (error) return <p style={{color: 'red'}}>{error}</p>
  if (!posts) return false
  return (
    <section className={styles.container}>
      <div style={{transform: `translateX(${position}px)`}} className={styles.topPosts}>
        {posts && posts.data.map((item) => (
          <div ref={contentRef} className={styles.item} key={item.id}>
            <img src={item.image} alt="" />
            <h2>{item.text}</h2>
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button className={styles.prev} onClick={slidePrev}>{'<'}</button>
        <button className={styles.next} onClick={slideNext}>{'>'}</button>
      </div>
    </section>
  )
}

export default TopPosts