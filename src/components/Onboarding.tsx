import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { ConnectWallet, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { onboarding } from '../fetchers/onboarding';
import { useStorage } from '../hooks/useStorage';
import { Token, useTokenBalance2 } from '../hooks/useTokenBalance';
import Input from './Input';
import { Link } from 'react-router-dom';
import Select from './Select';

const schema = yup.object().shape({
  tokenId: yup.string().required('Token ID is required'),
  orgName: yup.string().required('Organization Name is required'),
  agentName: yup.string().required('Agent Name is required'),
  knowledgeBase: yup
    .string()
    .max(120, 'Knowledge Base must not be more that 120 characters')
    .optional(),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Onboarding = () => {
  const address = useAddress();
  const navigate = useNavigate();
  const { getItem: getAuth } = useStorage('session');
  const auth = getAuth('auth');
  const { contract: tokenContract } = useContract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    'nft-collection',
  );
  const { data: tokenBalance, isLoading } = useOwnedNFTs(tokenContract, address);

  const { tokenIds } = useTokenBalance2(tokenBalance as unknown as Token[]);

  const [notConnectedError, setNotConnectedError] = useState('');
  const [noTokenError, setNoTokenError] = useState('');

  useEffect(() => {
    if (!address) {
      setNotConnectedError('Please connect your wallet to continue');
    }

    if (!tokenIds.length) {
      setNoTokenError('You need to own at least one VH Brain to continue');
    }

    if (address) {
      setNotConnectedError('');
    }

    if (tokenIds.length) {
      setNoTokenError('');
    }
  }, [address, tokenIds.length]);

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      tokenId: '',
      orgName: '',
      agentName: '',
      knowledgeBase: '',
      email: '',
      password: '',
    },
  });

  const canSave = !notConnectedError && !noTokenError;

  const mutation = useMutation(onboarding, {
    onSuccess: () => {
      navigate('/profile');
    },
  });

  const onSubmit = methods.handleSubmit((input) => {
    let rearrangedTokenIds = tokenIds;

    if (tokenIds.length > 1) {
      const index = tokenIds.indexOf(input.tokenId);
      rearrangedTokenIds = [...tokenIds];
      rearrangedTokenIds.splice(index, 1);
      rearrangedTokenIds.unshift(input.tokenId);
    }

    const data = {
      tokenIds: rearrangedTokenIds,
      orgName: input.orgName,
      agentName: input.agentName,
      knowledgeBase: input.knowledgeBase,
      email: input.email,
      password: input.password,
    };

    mutation.mutate({ ...data, token: auth?.accessToken });
  });

  return (
    <FormProvider {...methods}>
      
      <form className='flex flex-col border-neutral-700 text-[#757575] max-w-xl mx-auto mt-20'>
      <div className='mb-10'>
        <p className='gradient-text text-4xl font-bold w-fit'>Sign Up</p>
        <p className='text-[12px]'>already have an account? <Link to='/'  className='underline'>Sign in</Link></p>
      </div>
        <div className='text-center border-sky-500 bg-[#0D0D0D] py-5 text-white rounded-full flex gap-5 justify-center'>
          🧠{' '}
          <a
            href='https://opensea.io/collection/god-hates-ai'
            className='hover:underline'
            target='_blank'
          >
            Buy VH Brain Now on Opensea
          </a>{' '}
          🎉
        </div>
        {notConnectedError && (
          <div className='mb-5 space-y-3 border-b-[0.5px] border-b-[#262626] '>
            <p className='text-center text-red-400'>{notConnectedError}!</p>
            <ConnectWallet className='!mx-auto !mb-5 !w-full bg-slate-900 !py-5 text-sm uppercase gradient dark:bg-opacity-10 dark:!text-white !rounded-full' />
          </div>
        )}
        {isLoading && address && (
          <p className='text-black font-bold'>Checking your wallet balance...</p>
        )}
        <fieldset disabled={methods.formState.isSubmitting || !canSave} className='space-y-3 flex flex-col gap-7'>
          <Select
            required
            
            name='tokenId'
            label='Token ID (VH Brain)'
            placeholder='Select a Brain'
            options={tokenIds.map((tokenId: string) => ({
              label: tokenId ? `VH Brain #${tokenId}` : '',
              value: tokenId ?? '',
            }))}
            error={noTokenError}
            className=''
          />
          <Input
            required
            name='orgName'
            label='Company Name'
            type='text'
            placeholder='Alpha Company'
            className='text-black'
          />
          <Input
            required
            name='agentName'
            label='Agent Name'
            type='text'
            placeholder='James Bond'
            className='text-black'
          />
          <Input
            required
            name='email'
            label='Email'
            type='text'
            placeholder='example@gmail.com'
            className='text-black'
          />
          <Input
            required
            name='password'
            label='Password'
            type='password'
            placeholder='********'
            className='text-black'
          />
        </fieldset>

        <button
          type='submit'
          className='w-full bg-[#47E2BD] font-bold py-4 my-7 rounded-full disabled:opacity-40 disabled:cursor-not-allowed'
          disabled={!canSave}
          onClick={onSubmit}
        >
          Sign up
        </button>
      </form>
    </FormProvider>
  );
};

export default Onboarding;
