import React from 'react'
import { FetchPosts } from '../../context/PostsContext'
import Loading from '../Loading/Loading'
import styles from './OtherPosts.module.css'
import { Link } from 'react-router-dom'

const OtherPosts = () => {

  const [posts, setPosts] = React.useState<FetchPosts | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [tag, setTag] = React.useState('human')
  const [active, setActive] = React.useState('human')

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
    showPosts(14)
  }, [])

  if (loading) return <Loading />
  if (error) return <p style={{color: 'red'}}>{error}</p>
  if (!posts) return null
  return (
    <section className={styles.otherPosts}>
      <ul className={styles.category}>
        <li className={tag === 'human' ? styles.active : ''} onClick={() => setTag('human')}>Human</li>
        <li className={tag === 'pet' ? styles.active : ''} onClick={() => setTag('pet')}>Pet</li>
        <li className={tag === 'mammal' ? styles.active : ''} onClick={() => setTag('mammal')}>Mammal</li>
        <li className={tag === 'canine' ? styles.active : ''} onClick={() => setTag('canine')}>Canine</li>
      </ul>
      <div className={styles.leftPosts}>
        <div className={styles.posts}>
          <div className={styles.mainPost}>
            <Link to={`/post/${posts.data[0].id}`}>
              <img src={posts.data[0].image} alt="" />
            </Link>
            <span>{posts.data[0].publishDate.split('T')[0]}</span>
            <h1>{posts.data[0].text}</h1>
            <p>Em um mundo cheio de agitação, nada se compara à serenidade que um amigo peludo pode trazer para nossas vidas. Cães, esses seres incríveis, têm o dom de nos fazer sorrir nos dias mais cinzentos e preencher nossos corações com amor incondicional.</p>
            <Link to={`/post/${posts.data[0].id}`}>
              <button>View Post</button>
            </Link>
          </div>
        </div>
        <ul className={styles.listPosts}>
          {posts.data.filter((post) => post.tags.includes(tag)).map((post) => (
            <li key={post.id} className={styles.post}>
              <Link to={`/post/${post.id}`}>
                <img src={post.image} alt="" />
              </Link>
              <div>
                <h2>{post.text}</h2>
                <span>{post.publishDate.split('T')[0]}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.rightPosts}>
        <h1>Manga reads</h1>
        {posts.data.filter((post) => post.tags.includes('canine')).map((post) => (
          <div key={post.id} className={styles.mangaReads}>
            <Link to={`/post/${post.id}`}>
              <img src={post.image} alt="" />
            </Link>
            <div>
              <h2>{post.text}</h2>
              <span>{post.publishDate.split('T')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OtherPosts