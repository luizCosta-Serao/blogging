import React from 'react'
import styles from './Category.module.css'
import { DataPosts, FetchPosts } from '../context/PostsContext';
import Loading from '../components/Loading/Loading';
import { Link } from 'react-router-dom';

type CategoryProps = {
  title: string;
  img: string;
  tag: string;
}

const Category = ({
  title,
  img,
  tag
}: CategoryProps) => {

  const [posts, setPosts] = React.useState<DataPosts[] | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
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
        setPosts(json.data.filter((item) => {
          return item.tags.includes(tag)
        }))
      } catch (error) {
        if(error instanceof Error) setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    showPosts(20)
  }, [tag])

  if (loading) return <Loading />
  if (error) return <p style={{color: 'red'}}>{error}</p>
  if (!posts) return null
  return (
    <section className={styles.category}>
      <img className={styles.imgCategory} src={img} alt="" />
      <div className={styles.contentCategory}>
        <h1 className={styles.titleCategory}>{title}</h1>
        <ul className={styles.posts}>
          {posts.map((post) => (
            <li className={styles.post} key={post.id}>
              <Link to={`/post/${post.id}`}>
                <img className={styles.image} src={post.image} alt="" />
              </Link>
              <h1 className={styles.title}>{post.text}</h1>
              <div className={styles.user}>
                <img src={post.owner.picture} alt="" />
                <span>{post.owner.firstName} {post.owner.lastName}</span>
              </div>
              <p className={styles.text}>Em um mundo cheio de agitação, nada se compara à serenidade que um amigo peludo pode trazer para nossas vidas. Cães, esses seres incríveis, têm o dom de nos fazer sorrir nos dias mais cinzentos e preencher nossos corações com amor incondicional.</p>
              <Link to={`/post/${post.id}`}>
                <button className={styles.viewPost}>View Post</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Category