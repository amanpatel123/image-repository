import React, { useRef } from 'react'
import { useCurrentUserQuery, CURRENT_USER_QUERY } from '../../data/queries';
import { useMutation, SIGN_IN_USER_MUTATION } from '../../data/mutations';
import './SignInForm.css';

const SignInForm = () => {
    const [ signIn  ] = useMutation(SIGN_IN_USER_MUTATION, {
      update(cache, { data: { userSignIn } }) {
        cache.writeQuery({
          query: CURRENT_USER_QUERY,
          data: { currentUser: userSignIn.user },
        });
      }
    });
  const email = useRef(null);
  const password = useRef(null);
  
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          signIn({
            variables: { input: { userEmail: email.current.value, password: password.current.value }},
          }).then(({ data: { userSignIn: { token } } }) => {
            if (token) {
              localStorage.setItem('mlToken', token);
            }
          });
        }}
      >
        <input
          ref={email}
          className = "input"
          type="email"
          placeholder="your email"
        />
        <input
          ref={password}
          className = "input"
          type="password"
          placeholder="your password"
        />
        <input
          type="submit"
          className="button"
          value="Sign In"
        />
      </form>
    </div>
  );
}

export { SignInForm };