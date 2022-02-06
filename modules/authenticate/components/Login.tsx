import { FC } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import useForm from 'common/hooks/useForm';
import { errToast } from 'common/lib/toasts';
import { validateEmail } from 'common/lib/validators';
import Template from './Template';
import { Input } from 'common/components/Input';

const Login: FC = () => {
  const router = useRouter();

  const [formData, , toggleChecked, handleInputChange, checkValidity] = useForm(
    {
      email: { value: '', required: true },
      password: { value: '', required: true },
    }
  );

  const { email, password } = formData;

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkValidity()) return;
    if (!validateEmail(email.value)) {
      toggleChecked('email');
      return;
    }

    axios
      .post<UserType>('/api/auth/login', {
        email: email.value,
        password: password.value,
      })
      .then(res => {
        if (res.status === 200) router.push('/');
      })
      .catch(err => {
        if (err.response.status === 403) {
          errToast('Incorrect password!');
        }
        if (err.response.status === 404) {
          errToast('Account with that email not found!');
        }
      });
  };

  return (
    <Template
      handleFormSubmit={handleLogin}
      btnTitle="Login"
      redirectTo="register"
    >
      <Input
        placeholder="Email"
        value={email.value}
        onChange={handleInputChange}
        name="email"
        type="email"
        warn={email.checked}
      />
      <Input
        placeholder="Password"
        value={password.value}
        onChange={handleInputChange}
        name="password"
        type="password"
        warn={password.checked}
      />
    </Template>
  );
};

export default Login;
