import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import SignUp from '../../components/SignForm';
import { AuthServices } from '../../services';
import SignContainer from '../../components/SignContainer';
import { RootState } from '../../store';

const RegisterPage: NextPage = () => {
  const { authenticated } = useSelector(
    (state: RootState) => state.sessionReducer
  );
  const router = useRouter();

  if (authenticated) router.push('/');

  const onSubmit = async (values: any) => {
    const { username, password } = values;
    const toastLoadingId = toast.loading('Logging in');

    const res = await AuthServices.register({ username, password });
    console.log('res', res);

    if (res) {
      toast.dismiss(toastLoadingId);
      toast.success('Signing up', { duration: 1 });
      router.push('/login');
    } else {
      toast.dismiss(toastLoadingId);
      toast.error('Sign up error', { duration: 1 });
    }
  };

  return (
    <div>
      <Head>
        <title>Register | Maya</title>
      </Head>
      <SignContainer mode="register">
        <SignUp onSubmit={onSubmit} />
      </SignContainer>
    </div>
  );
};

export default RegisterPage;
