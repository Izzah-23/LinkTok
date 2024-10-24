'use client'
import React, { useEffect, useRef, useState} from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetForYouVideosQuery, useLikepostMutation,useCreateimpressionMutation,useCreateviewMutation } from '@/lib/linkTokApi';
import { Toaster } from "@/ui/toaster";
import { useToast } from "@/ui/use-toast";

import { Heart } from "lucide-react";
import Loader from '@/ui/Loader';

export default function Page() {
  const { data, error, isLoading } = useGetForYouVideosQuery();
  console.log(data);
  const [likePost] = useLikepostMutation();
  const[createimpression]=useCreateimpressionMutation();
  const[createview]=useCreateviewMutation();

  
  const { toast } = useToast();

  // Use the useInView hook to monitor each video element
 
  const handleLike = async (postId: number) => {
    try {
      const response = await likePost({ post_id: postId }).unwrap();
      toast({
        title: 'Success',
        description: response.message,
      });
    } catch (err:any) {
      toast({
        title: 'Error',
        description: err.data?.error || 'Error liking the post',
        variant: 'destructive',
      });
    }
  };

  
  if (isLoading) return <Loader/>;
  if (error) return <div>Error occurred</div>;


  




  return (
    <>
    <div className=" bg-gradient-to-br   from-red-400 via-yellow-100  to-orange-200">
      <Toaster />
      {data?.posts.map((post, index) => (
        <div key={post.id} className=" py-2 flex justify-center items-center  ">
          <div className="relative">
          <video
            src={post.mediaUrl}
            onMouseEnter={() => createimpression(post.id)}
            onPlay={() => createview(post.id)}
            className="w-full md:w-52 lg:w-72 mx-auto"
            controls
            muted
            loop
          />
            <button
              onClick={() => handleLike(post.id)}
              className="absolute  top-2 text-red-500 ml-2 " 
            >
              <Heart   size={24} className='fill-red-600 ' />
            </button>
          </div>
        </div>
        
      ))}
      </div>
    </>
   
  );




  // src={post.mediaUrl}
}

