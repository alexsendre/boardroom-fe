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
import { ShoppingCart } from 'lucide-react';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/feed">
          <Navbar.Brand>boardroom</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/feed">
              <Nav.Link>feed</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>profile</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex flex-row gap-4">
          <Link passHref href="/cart">
            <ShoppingCart size={32} color="white" className="cart-margin" />
          </Link>
          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
