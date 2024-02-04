import React from 'react'
import { FetchPosts } from '../../context/PostsContext'
import styles from './PostsHome.module.css'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

const PostsHome = () => {
  const [posts, setPosts] = React.useState<FetchPosts | null>(null)
  const [countLoad, setCountLoad] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [prevPosts, setPrevPosts] = React.useState<FetchPosts | null>(null)

  async function showPosts(limit: number) {
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
      sessionStorage.setItem('posts', JSON.stringify(json))
      setPrevPosts(JSON.parse(sessionStorage.getItem('posts') ?? '{}'))
    } catch (error) {
      if(error instanceof Error) setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    showPosts(6 * countLoad)
  }, [countLoad])

  if (loading) return (
    <main className={`${styles.posts} container`}>
      {prevPosts && prevPosts.data.map((item) => (
        <div className={styles.post} key={item.id}>
          <img className={styles.image} src={item.image} alt="" />
          <h1 className={styles.title}>{item.text}</h1>
          <div className={styles.user}>
            <img src={item.owner.picture} alt="" />
            <span>{item.owner.firstName} {item.owner.lastName}</span>
          </div>
          <p className={styles.text}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, quas reiciendis! Facilis a soluta aliquam sit, labore nulla accusamus sed ut assumenda, qui ad molestiae officia repellendus ab ea magnam.</p>
          <button className={styles.viewPost}>View Post</button>
        </div>
      ))}
      <Loading />
    </main>
  )
  if (error) return <p style={{color: 'red', textAlign: 'center'}}>{error}</p>
  if (!posts) return null
  return (
    <main className={`${styles.posts} container`}>
      {posts.data.map((item) => (
        <div className={styles.post} key={item.id}>
          <Link to={`/post/${item.id}`}>
            <img className={styles.image} src={item.image} alt="" />
          </Link>
          <h1 className={styles.title}>{item.text}</h1>
          <div className={styles.user}>
            <img src={item.owner.picture} alt="" />
            <span>{item.owner.firstName} {item.owner.lastName}</span>
          </div>
          <p className={styles.text}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, quas reiciendis! Facilis a soluta aliquam sit, labore nulla accusamus sed ut assumenda, qui ad molestiae officia repellendus ab ea magnam.</p>
          <Link to={`/post/${item.id}`}>
            <button className={styles.viewPost}>View Post</button>
          </Link>
        </div>
      ))}
      <button
        onClick={() => setCountLoad((countLoad) => countLoad + 1)}
        className={styles.loadMore}>Load More
      </button>
    </main>
  )
}

export default PostsHome