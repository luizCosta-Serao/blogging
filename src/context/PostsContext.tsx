import React, { PropsWithChildren } from 'react'

type PostsContext = {
  showPosts: (limit: number) => Promise<void>;
  posts: FetchPosts | null;
  loading: boolean;
  error: string | null;
  prevPosts: FetchPosts | null;
}

export type DataPosts = {
  id: string;
  image: string;
  likes: number;
  owner: {
    firstName: string;
    id: string;
    lastName: string;
    picture: string;
    title: string;
  };
  publishDate: string;
  tags: string[];
  text: string;
}

export type FetchPosts = {
  data: DataPosts[];
  total: number;
  page: number;
  limit: number
}

export type DataComments = {
  id: string;
  message: string;
  owner: {
    firstName: string;
    id: string;
    lastName: string;
    picture: string;
    title: string;
  };
  post: string;
  publishDate: string;
}

export type FetchComments = {
  data: DataComments[];
  total: number;
  page: number;
  limit: number;
}

const PostsContext = React.createContext<PostsContext | null>(null)

export const usePosts = () => {
  const context = React.useContext(PostsContext)
  if(!context) throw new Error('useContext provavelmente está fora do provider')
  return context
}

export const PostsContextProvider = ({
  children
}: PropsWithChildren) => {

  const [posts, setPosts] = React.useState<FetchPosts | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [prevPosts, setPrevPosts] = React.useState<FetchPosts | null>(null)

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
      sessionStorage.setItem('posts', JSON.stringify(json))
      setPrevPosts(JSON.parse(sessionStorage.getItem('posts') ?? '{}'))
    } catch (error) {
      if(error instanceof Error) setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    showPosts,
    posts,
    loading,
    error,
    prevPosts
  }

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}