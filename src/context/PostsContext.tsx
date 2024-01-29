import React, { PropsWithChildren } from 'react'
import useFetch from '../hooks/useFetch';

type PostsContext = {
  data: null | FetchPosts;
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
  data: DataPosts[],
  total: number;
  page: number;
  limit: number
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

  const { data, loading, error } = useFetch<FetchPosts>('https://dummyapi.io/data/v1/post?limit=9', {
    method: 'GET',
    headers: {
      'app-id': '65b29d2939a4e031164e10a7'
    }
  })

  const value = {
    data
  }

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}