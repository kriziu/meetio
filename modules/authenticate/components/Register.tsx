import { FC } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import useForm from 'common/hooks/useForm';
import { errToast } from 'common/lib/toasts';
import { validateEmail } from 'common/lib/validators';
import Template from './Template';
import { Input } from 'common/components/Input';

const Register: FC = () => {
  const router = useRouter();

  const [formData, , toggleChecked, handleInputChange, checkValidity] = useForm(
    {
      fName: { value: '', required: true },
      lName: { value: '', required: true },
      email: { value: '', required: true },
      password: { value: '', required: true },
      checkPassword: { value: '', required: true },
    }
  );

  const { fName, lName, email, password, checkPassword } = formData;

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkValidity()) return;
    if (!validateEmail(email.value)) {
      toggleChecked('email');
      return;
    }
    if (password.value !== checkPassword.value) {
      toggleChecked('checkPassword');
      return;
    }

    axios
      .post('/api/auth/register', {
        fName: fName.value,
        lName: lName.value,
        email: email.value,
        password: password.value,
      })
      .then(res => {
        if (res.status === 201) router.push('/');
      })
      .catch(() => {
        errToast('Account with that email already exists!');
      });
  };

  return (
    <Template
      handleFormSubmit={handleRegister}
      btnTitle="Register"
      redirectTo="login"
    >
      <Input
        placeholder="First name"
        value={fName.value}
        onChange={handleInputChange}
        name="fName"
        type="fName"
        warn={fName.checked}
      />
      <Input
        placeholder="Last Name"
        value={lName.value}
        onChange={handleInputChange}
        name="lName"
        type="lName"
        warn={lName.checked}
      />
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
      <Input
        placeholder="Check password"
        value={checkPassword.value}
        onChange={handleInputChange}
        name="checkPassword"
        type="password"
        warn={checkPassword.checked}
      />
    </Template>
  );
};

export default Register;
