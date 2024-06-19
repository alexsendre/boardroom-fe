/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { CircleUserRound, ShoppingCart } from 'lucide-react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>BoardRoom</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/feed">
              <Nav.Link>Feed</Nav.Link>
            </Link>
            {user.isSeller ? (
              <div className="d-flex flex-row">
                <Link passHref href="/rooms/new">
                  <Nav.Link>Create Room</Nav.Link>
                </Link>
                <Link passHref href="/tags/new">
                  <Nav.Link>Create Tag</Nav.Link>
                </Link>
              </div>
            ) : ''}

          </Nav>
        </Navbar.Collapse>
        <div className="d-flex flex-row gap-3">
          <Link passHref href="/profile">
            <CircleUserRound size={32} color="white" className="cart" />
          </Link>
          <Link passHref href="/orders">
            <ShoppingCart size={32} color="white" className="cart" />
          </Link>
          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
