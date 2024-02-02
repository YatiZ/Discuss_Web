'use client';
import { useFormState } from "react-dom";
import * as actions from '@/actions';
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import FormButton from "../common/form-button";

interface PostCreateFormProps{
  slug: string
}
export default function PostCreateForm({slug}:PostCreateFormProps){
   // using bind to add additional slug data into the action
   // slug is inherited from topic show page
    const [formState, action] = useFormState(actions.createPost.bind(null, slug),{
        errors:{}
    });
    return(
       <Popover placement="left">
          <PopoverTrigger>
            <Button>Create a post</Button>
          </PopoverTrigger>
          <PopoverContent>
            <form action={action}>
                <div className="flex flex-col gap-4 p-4 w-80">
                    <h3 className="text-lg">Create a post</h3>
                    <Input name="title" label="Title" labelPlacement="outside" placeholder="Label" isInvalid={!!formState.errors.title} errorMessage={formState.errors.title?.join(', ')}/>
                    <Textarea name="content" label="Content" labelPlacement="outside" placeholder="Write Your Content" isInvalid={!!formState.errors.content} errorMessage={formState.errors.content?.join(', ')}/>
                    
                    {formState.errors._form ? <div className="rounded p-2 bg-red-100 border border-red-400">{formState.errors._form?.join(', ')}</div>:null}
                    <FormButton>Post</FormButton>
                </div>
            </form>
          </PopoverContent>
       </Popover>
    )
}