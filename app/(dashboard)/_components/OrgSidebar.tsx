'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { Poppins } from 'next/font/google'
import { LayoutDashboard, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

export const OrgSidebar = () => {
  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites')

  return (
    <div className="hidden w-[206px] lg:flex flex-col space-y-6 pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image
            src="/logo.svg"
            alt="logo"
            width={34}
            height={34}
          />
          <span className={cn('font-semibold text-sm', font.className)}>
            Envision Easel
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }
          }
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? 'ghost' : 'secondary'}
          asChild
          size='lg'
          className='font-normal justify-start w-full px-2'
        >
          <Link href='/'>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Team Envision Easel
          </Link>
        </Button>
      </div>
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? 'secondary' : 'ghost'}
          asChild
          size='lg'
          className='font-normal justify-start w-full px-2'
        >
          <Link href={{
            pathname: '/',
            query: { favorites: true },
          }}>
            <Star className="w-4 h-4 mr-2" />
            Favorites Boards
          </Link>
        </Button>
      </div>
    </div>
  )
}

