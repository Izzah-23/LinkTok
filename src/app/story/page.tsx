"use client";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateStoryMutation, useGetuserstoryQuery } from "@/lib/linkTokApi";
import { Toaster } from "@/ui/toaster";
import { useToast } from "@/ui/use-toast";
interface FormState {
  media: File | null;
}
export default function page() {
  const { toast } = useToast();

  const [formData, setformData] = useState<FormState>({ media: null });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setformData({ ...formData, media: e.target.files[0] });
    }
  };

  const [createStory]=useCreateStoryMutation();
  const apiFormData = new FormData();
  formData.media && apiFormData.append("media", formData.media);
 
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await createStory(apiFormData).unwrap();
      toast({
        title: "Success",
        description: response.message,
      });
    } catch (err: any) {
      const errorMessages = err.data?.errors
        ? Object.values(err.data.errors).flat().join("\n")
        : "An unexpected error occurred.";
      toast({
        title: "Error",
        description: errorMessages,
        variant: "destructive",
      });
    }
  };

 const {data}=useGetuserstoryQuery(); 
console.log(data);
  return (
    <>

<div className="bg-gradient-to-br from-red-400 to-yellow-100 flex justify-center">
  <div className="">
    <div className="p-0 min-h-screen  items-start min-w-24 ">
      <form onSubmit={handleSubmit} className="w-full max-w-sm  items-center  pt-4 px-8">
        <div className=" grid w-full max-w-sm items-center gap-1.5   ">
          <Label htmlFor="media" className=" w-full font-bold text-lg">Upload story</Label>
          <Input
            id="picture"
            name="media"
            type="file"
            onChange={handleChange}
          />
        </div>
       < div className="text-center mt-3">
  <Button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md shadow-md hover:bg-red-400 hover:text-black 
   focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-500">
    Upload Story
  </Button>
</div>
        <Toaster />
      </form>


      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-3">Friend's Story</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data?.stories.slice().reverse().map((stories) => (
            
            <div key={stories.user_id} className="bg-neutral-200 shadow rounded-lg p-4">
               <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{stories.username}</h2>
              </div>
              {stories.storyType === 'photo' ? (
             <img className="h-48 w-full object-contain rounded-t-lg" src={stories.mediaURL} alt="Post Media" />
              ) : (
              // Display video if it's a video
              <video
                className="h-48 w-full object-contain rounded-t-lg"
                controls
                muted
                loop
              >
                <source src={stories.mediaURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

             
            </div>
          ))}
          </div>
          </div>
          </div>
          </div>
         </div>
    </>
  );
}
