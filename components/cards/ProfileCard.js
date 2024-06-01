/* eslint-disable react/button-has-type */
import React from 'react';
import { useAuth } from '../../utils/context/authContext';

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <div>
      <div>
        <div>
          <div>
            <div className="text-center">
              <img src={user.imageUrl} alt="User Profile" width={100} height={100} />
            </div>
            <div className="text-center text-white mt-3">
              <h5 className="mt-2 mb-0">
                {user.firstName} {user.lastName}
              </h5>
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
