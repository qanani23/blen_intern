import React from 'react'
import dayjs from 'dayjs';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard = ({interviewId, role, type, techstack, userId,createdAt}: InterviewCardProps ) => {
    const feedback = null as Feedback | null;

    const normalizedType =/mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt  || createdAt || Date.now()).format('MMM D, YYYY');
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
      <div className='card-interview'>
<div>
  <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-purple-600'>
    <p className='badge-text'>{normalizedType}</p>
  </div>

  <Image src ={getRandomInterviewCover()} alt='interview cover image' width={90} height={90} className='roounded-full
  object-fit size-[90px] '/>
  <h3 className='mt-5 capitalize'>
    {role} Interview

  </h3>
  <div className='flex flex-row gap-5 mt-3'>
    <div className='flex flex-col gap-2'>
         <Image src="/calendar.svg" alt='calendar icon' width={22} height={22} />
          <p className='text-sm text-gray-300'>{formattedDate}</p>
    </div>
   <div className='flex flex-row gap-2 items-center'>
    <Image src="/star.svg" alt='star icon' width={22} height={22} />
<p>{feedback?.totalScore ? `${feedback.totalScore}/100` : "---/100"}</p>

   </div>
  </div>
  <p className='line-clamp-2 mt-5'>
    {feedback ?.finalAssessment || "you haven't taken any interviews yet take it now to improve your interview skills."}
  </p>
          </div>
         <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              {techstack.map((tech) => (
                <DisplayTechIcons key={tech} techstack={tech} />
              ))}
            </div>

  <Link
    href={
      feedback
        ? `/interview/${interviewId}/feedback`
        : `/interview/${interviewId}`
    }
   className="btn-primary flex items-center justify-center"
  >
    {feedback ? "Check Feedback" : "View Interview"}
  </Link>
</div>


      </div>
    </div>
  )
}

export default InterviewCard