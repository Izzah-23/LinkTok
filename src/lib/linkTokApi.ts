import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useRouter } from 'next/router';

interface Response {
  message: string;
  redirect: string;
}

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface SigninCredentials {
  email: string;
  password: string;
}

interface SigninResponse {
  message: string;
  redirect: string;
  token: string;
}

interface UserDetailResponse {
  username: string;
  email: string;
  profilePictureURL: string;
  userBio: string;
  isActive: boolean;
}

interface createPostResponse {
  message: string;
}
interface getuserpostsResponse {
  message: string;
  posts: [
    {
      id: number;
      userId: number;
      caption: number;
      media: string;
      tags: string;
      location: string;
      scheduledAt: string;
      postType: string;
      is_scheduled: Boolean;
      likes: number;
      comments: number;
      shares: number;
      impressions: number;
      created_at: string;
      updated_at: string;
      mediaUrl: string;
    }
  ];
}

interface createStoryResponse {
  message: string;
}

interface getusersStroyResponse {
  stories: [
    {
      user_id: number;
      username: string;
      story_id: number;
      mediaURL: string;
      storyType: string;
    }
  ];
}

interface getusersearchResponse {
  search: [
    {
      id: number;
      username: string;
      isFollowing: boolean;
      profilePictureUrl: string;
    }
  ];
}

interface getFollowngResponse {
  following: [
    {
      target_id: number;
      username: string;
      profilePictureURL: string;
    }
  ];
}

interface getFollowergResponse {
  followers: [
    {
      user_id: number;
      username: string;
      profilePictureURL: string;
    }
  ];
}

interface updatedetailsResponse {
  message: string;
}

// Define a service using a base URL and expected endpoints
export const linkTokApi = createApi({
  
  reducerPath: "linkTokApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      
       
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation<Response, SignupCredentials>({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
    signinUser: builder.mutation<SigninResponse, SigninCredentials>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),

    signoutUser:builder.mutation<{message:string},void>({
      query: () => ({
        url: "logout",
        method: "Post",
      }),
    }),

    getUserDetail: builder.query<UserDetailResponse, void>({
      query: () => ({
        url: "userdetail",
        method: "GET",
      }),
    }),
    createPost: builder.mutation<createPostResponse, FormData>({
      query: (credentials) => ({
        url: "createpost",
        method: "Post",
        body: credentials,
      }),
    }),
    
    updatePost: builder.mutation<{ message: string }, { post_id: number, formData: FormData }>({
      query: (credentials) => ({
        url: "updatepost",
        method: "POST",
        body: credentials.formData, // Send formData directly as the body
        params: { post_id: credentials.post_id }, // Include post_id as a parameter
      }),
    }),

    deleltePost:builder.mutation<{message:string},{post_id:number}>({
      query: (credentials) => ({
        url: "deletepost",
        method: "Post",
        body: credentials,
      }),
    }),
    
    getuserposts: builder.query<getuserpostsResponse, void>({
      query: () => ({
        url: "getuserposts",
        method: "GET",
      }),
    }),
    createStory: builder.mutation<createStoryResponse, FormData>({
      query: (credentials) => ({
        url: "createstory",
        method: "Post",
        body: credentials,
      }),
    }),
    getuserstory: builder.query<getusersStroyResponse, void>({
      query: () => ({
        url: "viewstory",
        method: "GET",
      }),
    }),
    getusersearch: builder.query<getusersearchResponse, string>({
      query: (searchText) => ({
        url: `search?searchText=${encodeURIComponent(searchText)}`,
        method: "GET",
      }),
    }),
    sendRequest: builder.mutation<string, { target_id: number }>({
      query: (credentials) => ({
        url: "sendrequest",
        method: "POST",
        body: credentials,
      }),
    }),
    unfollow: builder.mutation<string, { target_id: number }>({
      query: (credentials) => ({
        url: "unfollow",
        method: "POST",
        body: credentials,
      }),
    }),
    getFollowing: builder.query<getFollowngResponse, void>({
      query: () => ({
        url: "getfollowing",
        method: "GET",
      }),
    }),
    getFollowers: builder.query<getFollowergResponse, void>({
      query: () => ({
        url: "getfollowers",
        method: "GET",
      }),
    }),
    updatedetails: builder.mutation<updatedetailsResponse, FormData>({
      query: (credentials) => ({
        url: "updatedetails",
        method: "POST",
        body: credentials,
      }),
    }),
    viewfollowingpost: builder.query<
      {
        followingPost: [
          {
            user_id: Number;
            username: string;
            profile_picture: string;
            post_id: number;
            postType:string;
            mediaURL: string;
            profilePictureUrl: string;
            like_count: number;
            comment_count: number;
          }
        ];
      },
      void
    >({
      query: () => ({
        url: "viewfollowingpost",
        method: "GET",
      }),
    }),
    likepost: builder.mutation< {message:string} , { post_id: Number }>({
      query: (credentials) => ({
        url: "likepost",
        method: "POST",
        body: credentials,
      }),
    }),
    
    createcomment: builder.mutation<
      { message: string },
      { post_id: number; commentText: string }
    >({
      query: (credentials) => ({
        url: "createcomment",
        method: "POST",
        body: credentials,
      }),
    }),
   

    viewcomments: builder.query<{ commentsData: Array<{ id:number;username: string; profilePictureUrl: string; commentText: string }> },number>({
      query: (post_id) => ({
        url: `viewcomments?post_id=${encodeURIComponent(post_id)}`,
        method: "GET",
      }),
    }),
    


    createReport:builder.mutation<string, {post_id:number,reason:string,user_id:number}>({
      query: (credentials) => ({
        url: `/createreport`,
        method: 'POST',
        body: credentials,
      }),
    }),
    //admin endpointes 
      // getreports
      // deletereport
      // getblockedusers
      // blockuser
      // unblockuser
      // getactiveusers
      // getinactiveusers

      getReposts: builder.query<{
        reports: Array<{
          reportId: number;
          reportedById: number;
          reportedByUsername: string;
          reportedByProfilePic: string;
          reportedForId: number;
          reportedForUsername: string;
          reportedForProfilePic: string;
          post: {
            id: number;
            userId: number;
            caption: string;
            media: string;
            tags: string;
            location: string | null;
            scheduledAt: string | null;
            postType: string;
            is_scheduled: number;
            likes: number;
            comments: number;
            shares: number;
            impressions: number;
            isblocked: number;
            created_at: string;
            updated_at: string;
          };
          mediaUrl:string;
          reason: string;
        }>;
      }, number>({
        query: () => ({
          url: "admin/getreports", 
          method: "GET",
        }),
      }),
      
     
      deleteReport: builder.mutation<void, number>({
        query: (reportId) => ({
          url: `/admin/deletereport`,
          method: 'POST',
          body: { report_id: reportId },
        }),
      }),
   

      getBlockedUsers: builder.query<{ blockedUsers: Array<{ id: number; username: string; email: string; profilePicture: string; userBio: string | null; isActive: number; isAdmin: number; isblocked: number; remember_token: string | null; created_at: string; updated_at: string; profilePictureUrl: string; }> }, void>({
        query: () => ({
          url: '/admin/getblockedusers',
          method: 'GET',
        }),
      }),



      blockUser: builder.mutation<{ message: string }, number>({
        query: (userId) => ({
          url: '/admin/blockuser',
          method: 'POST',
          body: { user_id: userId },
        }),
      }),
      


unblockUser: builder.mutation<{ message: string }, number>({
  query: (userId) => ({
    url: '/admin/unblockuser',
    method: 'POST',
    body: { user_id: userId },
    
  }),
}),

blockpost: builder.mutation<{ message: string }, number>({
  query: (post_id) => ({
    url: '/admin/blockpost',
    method: 'POST',
    body: { post_id: post_id },
  }),
}),


Share: builder.mutation<{ message: string }, number>({
  query: (post_id) => ({
    url: '/share',
    method: 'POST',
    body: {post_id},
  }),
}),



createimpression: builder.mutation<{ message: string }, number>({
  query: (post_id) => ({
    url: '/createimpression',
    method: 'POST',
    body: {post_id},
  }),
}),

createview: builder.mutation<{ message: string }, number>({
  query: (post_id) => ({
    url: '/createview',
    method: 'POST',
    body: {post_id},
  }),
}),


getActiveUsers: builder.query<{ activeUsers: Array<{ id: number; username: string; email: string; password: string; profilePicture: string; userBio: string | null; isActive: number; isAdmin: number; isblocked: number; remember_token: string | null; created_at: string; updated_at: string; profilePictureUrl: string; }> }, void>({
  query: () => ({
    url: '/admin/getactiveusers',
    method: 'GET',
    
  }),
}),

// Add this inside your reportApi.ts or equivalent file where you define your API endpoints

getInactiveUsers: builder.query<{ inactiveUsers: Array<{ id: number; username: string; email: string; password: string; profilePicture: string; userBio: string | null; isActive: number; isAdmin: number; isblocked: number; remember_token: string | null; created_at: string; updated_at: string; profilePictureUrl: string; }> }, void>({
  query: () => ({
    url: '/admin/getinactiveusers',
    method: 'GET',
    
  }),
}),



getForYouVideos: builder.query<{ posts: Array<{ id: number, mediaUrl: string }> }, void>({
  query: () => ({
    url: '/getforyouvideos',
    method: 'GET',
  }),
  transformResponse: (response: { posts: any }) => response, // Assuming the API returns an object with a 'posts' array
}),



getPost: builder.query({
  query: (post_id) => `getpost?post_id=${encodeURIComponent(post_id)}`,
  transformResponse: (response: { post: any }, meta, arg) => {
    // You can perform any transformation here if needed
    return response.post;
  },

}),


// getAllLikes
// getallcomments
// getallshares
// getallimpressions
getAllLikes: builder.query<{ "totalLikes":number}, void>({
  query: () => ({
    url: "getAllLikes",
    method: "GET",
  }),
}),

getallcomments: builder.query<{totalComments:number}, void>({
  query: () => ({
    url: "getallcomments",
    method: "GET",
  }),
}),


getallshares: builder.query<{totalShares:number}, void>({
  query: () => ({
    url: "getallshares",
    method: "GET",
  }),
}),


getallimpressions: builder.query<{totalImpressions:number}, void>({
  query: () => ({
    url: "getallimpressions",
    method: "GET",
  }),
}),


getallviews: builder.query<{totalViews:number}, void>({
  query: () => ({
    url: "getallviews",
    method: "GET",
  }),
}),


  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignupUserMutation,
  useSigninUserMutation,
  useSignoutUserMutation,
  useGetUserDetailQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeleltePostMutation,
  useGetuserpostsQuery,
  useCreateStoryMutation,
  useGetuserstoryQuery,
  useGetusersearchQuery,
  useSendRequestMutation,
  useUnfollowMutation,
  useGetFollowingQuery,
  useGetFollowersQuery,
  useUpdatedetailsMutation,
  useViewfollowingpostQuery,
  useLikepostMutation,
  useCreatecommentMutation,
  useViewcommentsQuery,
  useGetRepostsQuery,
  useDeleteReportMutation,
  useBlockUserMutation,
  useBlockpostMutation,
  useUnblockUserMutation,
useGetPostQuery,
useShareMutation,
useCreateReportMutation,
useCreateimpressionMutation,
useCreateviewMutation,
useGetAllLikesQuery,
useGetallcommentsQuery,
useGetallsharesQuery,
useGetallimpressionsQuery,
useGetallviewsQuery,

  useGetActiveUsersQuery,
  useGetInactiveUsersQuery,
  useGetBlockedUsersQuery,
  useGetForYouVideosQuery,

} = linkTokApi;


//custom hook
