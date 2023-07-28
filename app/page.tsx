import Navbar from '@/components/navbar/navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="parent flex w-full justify-center">
      <div className="container">
        <Navbar/>
      </div>
    </div>
  )
}
