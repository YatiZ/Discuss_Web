import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input,Button, Avatar,Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import HeaderAuth from '@/components/header-auth';


export default function Header() {
   
    return(
        <Navbar className="shadow mb-6 bg-gray-500">
            <NavbarBrand>
                <Link href="\" className="font-bold">Discuss</Link>
            </NavbarBrand>
            
            <NavbarContent justify="center">
                <NavbarItem>
                    <Input />
                </NavbarItem>
            </NavbarContent>
            
            <NavbarContent justify="end"> 
                    <HeaderAuth/>
            </NavbarContent>
            
        </Navbar>
    )
}