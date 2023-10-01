import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { ConnectWallet, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { onboarding } from '../fetchers/onboarding';
import { useStorage } from '../hooks/useStorage';
import useTokenBalance, { Token } from '../hooks/useTokenBalance';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';

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

  const { tokenIds, getToken } = useTokenBalance(tokenBalance as unknown as Token[]);

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
      <form className='space-y-3 flex flex-col border-neutral-700 text-[#757575] max-w-xl mx-auto mt-20'>
        <div className='text-center block border-sky-500 bg-sky-200 py-3 text-blue-900'>
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
          <div className='border-b space-y-3'>
            <p className='text-center text-red-400'>{notConnectedError}!</p>
            <ConnectWallet className='!mx-auto !mb-5 !w-full bg-slate-900 pl-4 text-sm uppercase dark:bg-white dark:bg-opacity-10 dark:text-white' />
          </div>
        )}
        {isLoading && address && (
          <p className='text-black font-bold'>Checking your wallet balance...</p>
        )}
        <fieldset disabled={methods.formState.isSubmitting || !canSave} className='space-y-3'>
          <Select
            required
            name='tokenId'
            label='Token ID (VH Brain)'
            placeholder='Select a Brain'
            options={tokenIds.map((tokenId) => ({
              label: getToken(tokenId)!.label,
              value: tokenId,
            }))}
            error={noTokenError}
            className='text-black'
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
          <TextArea
            name='knowledgeBase'
            label='Knowledge Base'
            placeholder='Provide some instructions for your agent (max 120 characters)'
            className='placeholder:font-mono text-xs resize-none text-white'
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
          className='w-full bg-[#FFDA4C] font-bold py-2 my-4 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed'
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
