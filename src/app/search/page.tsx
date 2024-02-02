import PostList from '@/components/posts/post-list';
import { fetchPostsBySearchTerm } from '@/db/posts';
import { redirect } from 'next/navigation'
import React from 'react'

interface searchPageProps{
  searchParams:{
    term: string
  }
}

export default async function SearchPage({searchParams}: searchPageProps) {
    const {term} = searchParams;
    if(!term){
        redirect('/')
    }
  return (
    <div>
        <PostList fetchData={()=>fetchPostsBySearchTerm(term)}/>
    </div>
  )
}
