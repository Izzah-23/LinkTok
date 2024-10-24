'use client'
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useGetUserDetailQuery, useUpdatedetailsMutation,useGetAllLikesQuery,
  useGetallcommentsQuery,
  useGetallsharesQuery,
  useGetallimpressionsQuery,
  useGetallviewsQuery,
  useSignoutUserMutation} from "@/lib/linkTokApi";
  import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Toaster } from "@/ui/toaster";
import { useToast } from "@/ui/use-toast";
import { useRouter } from 'next/navigation';
import Loader from "@/ui/Loader";

interface updatedetailsResponse {
  message: string;
}

interface FormState {
  bio: string;
  media: File | null;
}

export default function page() {
  const router = useRouter();
  const { toast } = useToast();
  const { data, isError, isLoading, refetch } = useGetUserDetailQuery();
  const [updatedetails, { isSuccess }] = useUpdatedetailsMutation();

  const [formData, setFormData] = useState<FormState>({ bio: '', media: null });

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, bio: e.target.value });
  };

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, media: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const apiFormData = new FormData();
    apiFormData.append('bio', formData.bio);
    formData.media && apiFormData.append('media', formData.media);

    try {
      const response: updatedetailsResponse = await updatedetails(apiFormData).unwrap();
      toast({
        title: 'Success',
        description: response.message,
      });
    } catch (err: any) {
      const errorMessages = err.data?.errors ? Object.values(err.data.errors).flat().join('\n') : 'An unexpected error occurred.';
      toast({
        title: 'Error',
        description: errorMessages,
        variant: 'destructive'
      });
    }
  };

  

  const {data:allLikes ,refetch:refetchlikes}=useGetAllLikesQuery();
  const {data:allComments,refetch:refetchComments}=useGetallcommentsQuery();
const {data:allShares,refetch:refetchShares}=useGetallsharesQuery();
const {data:allImpressions,refetch:refetchImpressions}=useGetallimpressionsQuery();
const {data:allViews,refetch:refetchViews}=useGetallviewsQuery();
const [signoutUser]=useSignoutUserMutation();
const handlesignout=async ()=>{
 
  try{
    const response= await signoutUser().unwrap();
    toast({
      title: 'Success',
      description: response.message,
    });
    localStorage.removeItem('token');
    router.push('/');
  }catch(err:any){
    const errorMessages = err.data?.errors ? Object.values(err.data.errors).flat().join('\n') : 'An unexpected error occurred.';
    toast({
      title: 'Error',
      description: errorMessages,
      variant: 'destructive'
    });
  }
}

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
    refetchlikes();
    refetchComments();
    refetchShares();
    refetchImpressions();
refetchViews();
  }, [isSuccess, refetch]);

  if (isLoading) return <Loader/>;
  if (isError) return <div>Error occurred</div>;

  return (



<div className="flex items-center justify-center bg-gradient-to-br from-red-500 to-yellow-100 min-h-screen">


    <div className="bg-gray-100 min-h-screen">
    <div className="flex justify-end p-4">
    <Button   className="px-2 py-1  bg-transparent border-solid border-2  border-red-300 text-black rounded-md shadow-md hover:bg-orange-600 hover:text-white transition-colors duration-300" 
    onClick={handlesignout}>
      Sign Out
    </Button>



  </div>
  {data && (
        <div className="flex flex-col items-center pt-6">
          <div className="flex items-center">
          </div>
          <img className="h-32 w-32 rounded-full " src={data.profilePictureURL} alt="Profile" />
          {data.userBio && (
            <p className="mt-2 text-sm text-black text-center">{data.userBio}</p>
          )}
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <div className="flex justify-center pt-2">
          <h1 className="text-3xl font-bold">{data.username}</h1>
            <svg
              className="h-5 w-5 text-red-500 mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input type="text" id="bio" value={formData.bio} onChange={handleBioChange} className="w-60 p-2 border rounded" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="media" className="text-right">
                  Profile Picture
                </Label>
                <Input type="file" id="media" onChange={handleMediaChange} accept="image/jpeg,image/png" className="w-60 p-2 border rounded" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
  {/* Likes */}
  <div className="bg-red-300 p-4 rounded-lg shadow-md shadow-black border-2">
    <h2 className="text-lg font-bold text-black">Likes</h2>
    <p className="text-3xl text-black">{allLikes?.totalLikes}</p>
  </div>
  
  {/* Comments */}
  <div className="bg-red-300 p-4 rounded-lg shadow-md shadow-black border-2">
    <h2 className="text-lg font-semibold text-black">Comments</h2>
    <p className="text-3xl text-black">{allComments?.totalComments}</p>
  </div>
  
  {/* Shares */}
  <div className="bg-red-300 p-4 rounded-lg shadow-md shadow-black border-2">
    <h2 className="text-lg font-semibold textext-black">Shares</h2>
    <p className="text-3xl text-black">{allShares?.totalShares}</p>
  </div>
  
  {/* Impressions */}
  <div className="bg-red-300 p-4 rounded-lg shadow-md shadow-black border-2">
    <h2 className="text-lg font-semibold text-black">Impressions</h2>
    <p className="text-3xl text-black">{allImpressions?.totalImpressions}</p>
  </div>
  
  {/* Views */}
  <div className="bg-red-300 p-4 rounded-lg shadow-md shadow-black border-2">
    <h2 className="text-lg font-semibold textext-black">Views</h2>
    <p className="text-3xl text-black">{allViews?.totalViews}</p>
  </div>
</div>


      <Toaster />
    </div>
    </div>
  );
}