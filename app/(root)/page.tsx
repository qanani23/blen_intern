import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='card-cta'>
    <div className='flex flex-col gap-6 max-w-lg'>
    <h2>
           Welcome to SkyPath: Your Gateway to AI-Powered Interview Practice
    </h2>
    <p className='text-lg'>
           Train with real-world interview questions and get quick feedback on your responses
    </p>
    <Button asChild className='btn-primary max-sm:w-full'>
      <Link href="/interview">Start Practicing Interview</Link>
    </Button>
    </div>
    <Image src= "/robot.png" alt='robot' width={400} height={400} className='max-sm:hidden'/>
    </section>

    
    <section className="mt-8 px-6 sm:px-10">
  <div className="max-w-lg flex flex-col gap-6 mt-8">
    <h2>Your Interview Experience</h2>
     
    <div className="interviews-section">
     {dummyInterviews.map((interview) => (
      <InterviewCard key={interview.id} {...interview}/>
     ))}
     {/* <p>You haven't taken any interviews yet</p> */}
    </div>
  </div>
</section>
    <section className='flex flex-col gap-6 mt-8 px-6 sm:px-10 mb-10'>
      <h2>Take Your Interview</h2>

      <div className='interviews-section'>
       {dummyInterviews.map((interview) => (
      <InterviewCard key={interview.id} {...interview}/>
     ))}


      </div>
    </section>
    </>
  )
}

export default page