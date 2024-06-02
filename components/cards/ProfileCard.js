/* eslint-disable react/button-has-type */
import React from 'react';
import { useAuth } from '../../utils/context/authContext';

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <div className="mt-5">
      <div className="text-center">
        <img src={user.imageUrl} alt="User Profile" width={150} height={150} className="rounded-2" />
      </div>
      <div className="text-center mt-3">
        <h3 className="mt-2 mb-0 fw-bold">
          {user.firstName} {user.lastName}
        </h3>
        <span className="silent">@{user.username}</span>
      </div>
    </div>
  );
}
