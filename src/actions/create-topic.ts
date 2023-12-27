'use server';
import { error } from 'console';
import { z} from 'zod';
import { auth } from '@/auth';
import { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { resolve } from 'path';

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/,{message:'Must be letters or dashes without spaces'}),
    description: z.string().min(10),
})

interface CreateTopicFormState{
    errors:{
        name?: string[];
        description?: string[],
        _form?: string[],
    }
}

export async function createTopic(formState: CreateTopicFormState,formData: FormData)
:Promise<CreateTopicFormState>
{ 
    
    //TODO: revalidate the homepage after creating a topic
    const result = createTopicSchema. safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    })
   if(!result.success){
    return{
        errors: result.error.flatten().fieldErrors,
    }
   }
   //validation for user signin or not
   const session = await auth();
   if(!session || !session.user ){
    return {
        errors: {
            _form: ['You must be sign in to do that']
        }
    }
   }
   //adding created data into the db
   let topic: Topic;
   try{
    
     topic = await db.topic.create({
        data: {
        slug:result.data.name,
        description: result.data.description
        },
     });
   }catch(err: unknown){
      if(err instanceof Error){
        return{
            errors:{
                _form: [err.message]
            }
        }
      }else{
        return{
            errors:{
                _form:["Someting went wrong"]
            }
        }
      }
   }

   revalidatePath('/');
   redirect(paths.topicShowPath(topic.slug));
   
}