import PostList from '@/components/posts/post-list';
import Profile from '@/components/profile';
import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicLists from '@/components/topics/topic-lists';
import { fetchTopPosts } from '@/db/posts';
import { Divider } from '@nextui-org/react';

export default function Home() {

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='text-xl m-2'>Top Posts</h1>
        <PostList fetchData={fetchTopPosts}/>
      </div>
      <div className='border py-3 px-2 shadow'>
      <TopicCreateForm/>
      <Divider className='my-2'/>
      <h2 className='text-lg'>Topics</h2>
      <TopicLists/>
      </div>
    
      <Profile/>
    </div>
  )
}
