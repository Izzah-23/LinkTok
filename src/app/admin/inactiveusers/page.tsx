'use client'

import Loader from '@/ui/Loader';
import { useGetInactiveUsersQuery } from '@/lib/linkTokApi';

export default function page() {
  const { data: inactiveUsersData, isLoading, error } = useGetInactiveUsersQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching Active Users.</div>;

  return (
    <div className='bg-white'>
      <h1 className="text-2xl font-bold p-4 ml-32">In-Active Users</h1>
      {inactiveUsersData && inactiveUsersData.inactiveUsers.length > 0 ? (
        <ul className='ml-20 grid grid-cols-3'>
          {inactiveUsersData.inactiveUsers.map((user) => (
            <li key={user.id} className=" p-4 mb-4 w-72 border-b rounded-lg bg-neutral-400">
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
        <div className='ml-40'>No In-active users found.</div>
      )}
    </div>
  );
}
