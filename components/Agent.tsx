"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { cn } from '@/lib/utils';

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
    userName: string;
    userID?: string;
    type?: "generate" | "interview";
}

const Agent = ({ userName }: AgentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const isSpeaking = true;
  const messeges = [
    "whats your name",
    "my name is john doe , nice to meet you!"
  ];
  const lastMessege = messeges[messeges.length - 1];

  const handleCallButtonClick = () => {
    switch (callStatus) {
      case CallStatus.INACTIVE:
        setCallStatus(CallStatus.CONNECTING);
        // Simulate connecting then active
        setTimeout(() => setCallStatus(CallStatus.ACTIVE), 2000);
        break;
      case CallStatus.ACTIVE:
        setCallStatus(CallStatus.FINISHED);
        break;
      case CallStatus.FINISHED:
        setCallStatus(CallStatus.INACTIVE);
        break;
      default:
        break;
    }
  };
  return (
    <>
     <div className='call-view'>
    
    <div className='card-interviewer'>
       <div className='avatar'>
        <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className='object-cover' />
        {isSpeaking && <span className='animate-speak'/>}
       </div>
       <h3>Blen Speaking...</h3>
    </div>

    <div className='card-border'>
       <div className='card-content'>
       <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className='object-cover rounded-full size-[120px]' />
       <h3>{userName}</h3>
       </div>
    </div>

    </div>
{messeges.length > 0 &&(
  <div className='transcript-border mt-4'>
    <div className='transcript'>
    <p key={lastMessege} className={cn("transition-opacity duration-500 opacity-0","animate-fadeIn opacity-100")}>
      {lastMessege}

    </p>
    </div>
  </div>
)}
    <div className='w-full flex justify-center mt-4'>
      {callStatus !== CallStatus.ACTIVE ? (
        <button onClick={handleCallButtonClick} className=" relative btn-call">
          <span className={cn("absolute animate-ping rounded-full opacity-75", {
            "hidden": callStatus !== "CONNECTING"
          })} />

             <span>
              {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? "Call" : "..."}
             </span>
          
        </button>
      ) : (
        <button onClick={handleCallButtonClick} className='btn-disconnect'>
          End Call
        </button>
      )}
    </div>
    </>

   
  )
}

export default Agent