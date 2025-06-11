/*
UNIT TESTER
page.test.js
*/

process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'fake-key';

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
const mockPush = jest.fn();

// Import pages to test
import HomePage from '../page';
import LoginPage from '../login/page';

// ============ MOCK ROUTER ============ //
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// ============ MOCK SUPABASE ============ //
const mockSignIn = jest.fn();
jest.mock('../../utils/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignIn,
      getUser: () => Promise.resolve({ data: { user: null } }),
    },
  }),
}));


// ============ MOCK FETCH ============ //
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {username: 'Player1@mail.com',score: 10,wins: 5,losses: 2,draws: 3,best_win_streak: 4,},
          { username: 'Player2@mail.com',score: 8,wins: 4,losses: 3,draws: 1,best_win_streak: 2,},
          {username: 'Player3@mail.com',score: 6,wins: 2,losses: 2,draws: 6,best_win_streak: 1,},
        ]),
    })
  );
});

// Clear the mock after each test
afterEach(() => {
  global.fetch.mockClear();
});

// ============================================
// TEST HOME - HOMEPAGE SHOWS
// src/app/page.js 
// ============================================
test('TEST - src/app/page.js - title,login button, leaderboard', async () => {
  render(<HomePage />);

  // CHECK title
  const heading = screen.getByRole('heading', {
    level: 1,
    name: /Rock Paper Scissors/i,
  });
  expect(heading).toBeInTheDocument();

  // CHECK login
  const loginButton = screen.getByRole('button', {
    name: /login to play/i,
  });
  expect(loginButton).toBeInTheDocument();

  // CHECK top 3 leaderboard works
  await waitFor(() => {
    expect(screen.getByText(/🥇 Player1@mail.com/)).toBeInTheDocument();
    expect(screen.getByText(/🥈 Player2@mail.com/)).toBeInTheDocument();
    expect(screen.getByText(/🥉 Player3@mail.com/)).toBeInTheDocument();
  });
});

// ============================================
// TEST LOGIN - Successful Login
// src/app/login 
// ============================================
test('TEST LOGIN successful - correct login', async () => {
  mockSignIn.mockResolvedValueOnce({ data: {}, error: null });
  render(<LoginPage />);

  // CREATE username
  fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
    target: {value: 'test@mail.com'},
  });

  // CREATE Password
  fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
    target: {value: 'pass'},
  });

  // CLICK on login
  fireEvent.click(screen.getByRole('button', { name: /continue/i }));

  // CHECK the login
  await waitFor(() => {
    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@mail.com',
      password: 'pass',
    });
    expect(mockPush).toHaveBeenCalledWith('/home');
  });
});

// ============================================
// TEST LOGIN - Failed Login
// src/app/login 
// ============================================


/*
SOURCES:
Unit testing with Next.js and Jest
https://nextjs.org/docs/app/guides/testing/jest


Expect jest
https://jestjs.io/docs/expect


*/
