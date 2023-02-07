import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { List } from 'phosphor-react'
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
        <DropdownMenu.Root >
            <DropdownMenu.Trigger className='outline-none flex p-1 rounded-lg bg-transparent hover:cursor-pointer hover:bg-white/20 bg-opacity-50 transition-all duration-500'>
                    <List size={32} color={'#ffffff'}/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.DropdownMenuContent 
                    sideOffset={5} 
                    className='bg-white text-zinc-800 w-3/3 h-auto p-4 flex flex-col gap-6 rounded-xl justify-around text-xl duration-500 z-50'
                >
                    
                    <Link to='/genres' className='outline-none cursor-pointer hover:bg-zinc-200 hover:w-full transition-colors duration-500 px-2 py-1 rounded-lg'>
                        <DropdownMenu.DropdownMenuItem className='outline-none'>
                            Genres
                        </DropdownMenu.DropdownMenuItem>
                    </Link>
                    <Link to='/top100' className='outline-none cursor-pointer hover:bg-zinc-200 hover:w-full transition-colors duration-500 px-2 py-1 rounded-lg'>
                        <DropdownMenu.DropdownMenuItem className='outline-none'>
                            Top 100 of all time
                        </DropdownMenu.DropdownMenuItem>
                    </Link>
                    <Link to='/tvshow' className='outline-none cursor-pointer hover:bg-zinc-200 hover:w-full transition-colors duration-500 px-2 py-1 rounded-lg'>
                        <DropdownMenu.DropdownMenuItem className='outline-none'>
                            Tv Shows
                        </DropdownMenu.DropdownMenuItem>
                    </Link>
                    <DropdownMenu.DropdownMenuArrow fill='#ffffff'/>
                </DropdownMenu.DropdownMenuContent>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    </div>
  )
}

export default Menu