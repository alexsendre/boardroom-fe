/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Card, CardBody } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <Card className="mt-5 m-auto" style={{ width: 400, borderRadius: 12 }}>
      <CardBody>
        <div className="text-center">
          <img src={user.imageUrl} alt="User Profile" width={150} height={150} className="rounded-2" />
        </div>
        <div className="text-center mt-3">
          <h3 className="mt-2 mb-0 fw-bold">{user.firstName} {user.lastName}</h3>
          <span className="silent">@{user.username}</span>
          <div className="mt-2">
            {user.isSeller ? <h5><strong>Seller</strong></h5> : <h5><strong>Shopper</strong></h5>}
          </div>
          <div className="profile-bio m-auto">
            <h5 className="mt-1">{user.bio}</h5>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
