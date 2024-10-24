'use client'

import Loader from '@/ui/Loader';
import { useGetActiveUsersQuery } from '@/lib/linkTokApi';

export default function page() {
  const { data: activeUsersData, isLoading, error } = useGetActiveUsersQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching active users.</div>;

  return (
    <div className='bg-white h-screen'>
      <h1 className="text-2xl font-bold p-4 ml-32 ">Active Users</h1>
      {activeUsersData && activeUsersData.activeUsers.length > 0 ? (
        <ul className='  ml-20 grid grid-cols-3'>
          {activeUsersData.activeUsers.map((user) => (
            <li key={user.id} className="p-4 mb-4 w-72 border-b rounded-lg bg-neutral-400">
              <div className="flex items-center space-x-4">
                <img
                  src={user.profilePictureUrl}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Bio:</strong> {user.userBio || 'Not provided'}</p>
                  {/* Add more user details as needed */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No active users found.</div>
      )}
    </div>
  );
}
