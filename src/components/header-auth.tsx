'use client';
import * as actions from '@/actions';
import {  NavbarItem, Button, Avatar, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';


export default function HeaderAuth(){
    const session = useSession();

    // useEffect(()=>{
    //     if(session.status === 'loading'){
    //         setIsLoading(true);
    //     }else{
    //         setIsLoading(false);
    //     }
    // },[session.status])

    let authContent: React.ReactNode;
    if(session.status === 'loading'){
       
       authContent = null;
    }else if(session.data?.user){
        
        authContent = 
        <Popover placement='left'>
            <PopoverTrigger>
                <Avatar src={session.data.user.image || ''}/>
            </PopoverTrigger>
            <PopoverContent>
                <div className='p-4'>
                    <form action={actions.SignOut}>
                        <Button type='submit'>Sign Out</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    }else(
     
        authContent = <>
        <NavbarItem >
            <form action={actions.SignIn}>
            <Button type="submit" color="secondary" variant="bordered">Sign In</Button>
            </form>
            
        </NavbarItem>
        <NavbarItem>
            <form action={actions.SignOut}>
            <Button type="submit" color="primary" variant="flat">Sign Up</Button>
            </form>
            
        </NavbarItem>
        </>
    )
    return(
        <>
           {/* {isLoading && <p>Loading ... </p>} */}
           {authContent}
        </>
    )
}
