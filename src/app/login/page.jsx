import { login, signup } from './actions'

export default async function LoginPage({ searchParams }) {
  const error = await searchParams?.error
  const message = await searchParams?.message

  return (
    <div>
      <h1>Login</h1>

      {error && <p style={{color: 'red'}}>Error: {decodeURIComponent(error)}</p>}
      {message && <p style={{color: 'blue'}}>{decodeURIComponent(message)}</p>}

      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>

      <p><small>Note: After signing up, check your email for a confirmation link.</small></p>
    </div>
  )
}