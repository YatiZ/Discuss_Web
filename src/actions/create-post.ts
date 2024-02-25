'use server';
import {z} from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import { Post, Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';

const createPostSchema = z.object({
    title:z.string().min(3),
    content: z.string().min(10),
})
console.log(createPostSchema)
interface CreatePostFormStateProps{
  errors:{
    title?: string[];
    content?: string[];
    _form?: string[],
  }
}
//slug:string is from post-create-form
export async function createPost(slug:string,formState:CreatePostFormStateProps, formData:FormData):Promise<CreatePostFormStateProps>{
  //TODO: revalidate the topic show page
   


  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  })
  if(!result.success){
    return{
        errors: result.error.flatten().fieldErrors,
    }
  }
 
  // validation for user sign in
  const session = await auth();
  if(!session || !session.user){
    return{
        errors:{
            _form: ['You must be sign in to do this']
        }
    }
  }
  
  // checking post is in topic id.

  const topic = await db.topic.findFirst({
    where: {slug}
  });
  if(!topic){
    return{
      errors:{
        _form:['Cannot find topic']
      }
    }
  }


  let post:Post;

  try{
    post = await db.post.create({
        data:{
            title:result.data.title,
            content: result.data.content,
            userId: session.user.id,
            topicId: topic.id
        }
    })
  }catch(err:unknown){
    if(err instanceof Error){
        return{
            errors:{
                _form: [err.message]
            }
        }
    }else{
        return{
            errors:{
                _form:["Failed to create post"]
            }
        }
    }
  }

  revalidatePath(paths.topicShowPath(slug));
  redirect(paths.postShow(slug, post.id));


}