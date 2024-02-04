import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { DataPosts, FetchComments, FetchPosts } from '../context/PostsContext'
import Loading from '../components/Loading/Loading'
import styles from './PostPage.module.css'

const PostPage = () => {
  const [post, setPost] = React.useState<DataPosts | undefined>(undefined)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [comments, setComments] = React.useState<FetchComments | null>(null)
  const [morePosts, setMorePosts] = React.useState<FetchPosts | null>(null)
  const { id } = useParams()

  React.useEffect(() => {
    async function showPosts(limit: number) {
      setLoading(true)
      setPost(undefined)
      try {
        const response = await fetch(`https://dummyapi.io/data/v1/post?limit=${limit}`, {
          method: 'GET',
          headers: {
            'app-id': '65b29d2939a4e031164e10a7'
          }
        })
        if(!response.ok) throw new Error(`Error: ${response.status}`)
        const json = (await response.json()) as FetchPosts
        setPost(json.data.find((item) => item.id === id))
  
      } catch (error) {
        if(error instanceof Error) setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    showPosts(20)
  }, [id])

  React.useEffect(() => {
    async function showComments(id: string) {
      setLoading(true)
      setComments(null)
      try {
        const response = await fetch(`https://dummyapi.io/data/v1/post/${id}/comment`, {
          method: 'GET',
          headers: {
            'app-id': '65b29d2939a4e031164e10a7'
          }
        })
        if(!response.ok) throw new Error(`Error: ${response.status}`)
        const json = (await response.json()) as FetchComments
        setComments(json)
      } catch (error) {
        if(error instanceof Error) setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      showComments(id)
    }
  }, [id])

  React.useEffect(() => {
    async function morePosts() {
      setLoading(true)
      setMorePosts(null)
      try {
        const response = await fetch(`https://dummyapi.io/data/v1/post?limit=6`, {
          method: 'GET',
          headers: {
            'app-id': '65b29d2939a4e031164e10a7'
          }
        })
        if(!response.ok) throw new Error(`Error: ${response.status}`)
        const json = (await response.json()) as FetchPosts
        setMorePosts(json)
      } catch (error) {
        if(error instanceof Error) setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    morePosts()
  }, [])
  
  if (loading) return (
    <div className={styles.inLoading}>
      <Loading />
    </div>
  )
  if (error) return <p style={{color: 'red'}}>{error}</p>
  if (!post) return null
  return (
    <section className={styles.postPage}>
      <img src={post?.image} alt="" />
      <div className={styles.postContent}>
        <h1>{post.text}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus cumque delectus, corporis at eum laborum temporibus neque numquam quidem magnam est laudantium. Itaque debitis nam soluta laudantium. Minus soluta quos delectus dolorum aspernatur sed, doloribus animi dolore fugit veritatis eligendi.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas dolores obcaecati dolorem. Voluptas recusandae animi, dolorem amet quisquam voluptates quae exercitationem, rem autem obcaecati nostrum numquam aliquid! Quae, eius consequatur?</p>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus cumque delectus, corporis at eum laborum temporibus neque numquam quidem magnam est laudantium. Itaque debitis nam soluta laudantium. Minus soluta quos delectus dolorum aspernatur sed, doloribus animi dolore fugit veritatis eligendi.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas dolores obcaecati dolorem. Voluptas recusandae animi, dolorem amet quisquam voluptates quae exercitationem, rem autem obcaecati nostrum numquam aliquid! Quae, eius consequatur?</p>        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus cumque delectus, corporis at eum laborum temporibus neque numquam quidem magnam est laudantium. Itaque debitis nam soluta laudantium. Minus soluta quos delectus dolorum aspernatur sed, doloribus animi dolore fugit veritatis eligendi.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas dolores obcaecati dolorem. Voluptas recusandae animi, dolorem amet quisquam voluptates quae exercitationem, rem autem obcaecati nostrum numquam aliquid! Quae, eius consequatur?</p>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus cumque delectus, corporis at eum laborum temporibus neque numquam quidem magnam est laudantium. Itaque debitis nam soluta laudantium. Minus soluta quos delectus dolorum aspernatur sed, doloribus animi dolore fugit veritatis eligendi.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas dolores obcaecati dolorem. Voluptas recusandae animi, dolorem amet quisquam voluptates quae exercitationem, rem autem obcaecati nostrum numquam aliquid! Quae, eius consequatur?</p>        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus cumque delectus, corporis at eum laborum temporibus neque numquam quidem magnam est laudantium. Itaque debitis nam soluta laudantium. Minus soluta quos delectus dolorum aspernatur sed, doloribus animi dolore fugit veritatis eligendi.</p>

        <div className={styles.comments}>
          <h1>Comments: {comments && comments.total}</h1>
          <ul className={styles.listComments}>
            {comments && comments.data.map((comment) => (
              <li className={styles.comment} key={comment.id}>
                <h1>Comments </h1>
                <div className={styles.userComment}>
                  <img src={comment.owner.picture} alt="" />
                  <span>{comment.owner.firstName} {comment.owner.lastName}</span>
                </div>
                <div className={styles.contentComment}>
                  <p>{comment.message}</p>
                </div>
              </li>
            ))}
          </ul>  
        </div>

        <div className={styles.relatedPosts}>
          <h1>You may also like</h1>
          <ul className={styles.listMorePosts}>
            {morePosts && morePosts.data.map((item) => (
              <li className={styles.post} key={item.id}>
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default PostPage