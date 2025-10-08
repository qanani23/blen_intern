import {generateText} from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET(){
    return Response.json({success:true,data:"Thank You!"},{status:200});
}

export async function POST(request:Request){
    const{type,role,level,teckstack,amount,userid}=await request.json();

    try {
        if (!process.env.GOOGLE_API_KEY) {
            return Response.json({ success: false, error: "GOOGLE_API_KEY is not set" }, { status: 500 });
        }

        const google = createGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_API_KEY,
        });
        const {text:questions} = await generateText({
            model:google("gemini-pro"),
            prompt:`Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${teckstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
        });
        const interview ={
            role,type,level,
            teckstack:teckstack.split(","),
            questions:JSON.parse(questions),
            userId:userid,
            finalized:true,
            coverImage:getRandomInterviewCover(),
            createdAt:new Date().toISOString()
        
        }


        await db.collection("interviews").add(interview);
          
        return Response.json({success:true},{status:200})
 
    } catch (error) {
        console.error(error);

        return Response.json({success:false,error},{status:500});
    }
}