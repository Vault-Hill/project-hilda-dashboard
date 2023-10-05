import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { loginUser } from "../fetchers/loginUser";
import { useStorage } from "../hooks/useStorage";
import Input from "./Input";
import { useTokenBalance2, Token } from "../hooks/useTokenBalance";
import Select from "./Select";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setItem: setAuth } = useStorage("session");
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data.accessToken) {
        setAuth({ auth: data });
        navigate("/profile", { replace: true });
      }
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutation.mutate(data);
  });
  const address = useAddress();
  const { getItem: getAuth } = useStorage("session");
  const auth = getAuth("auth");
  const { contract: tokenContract } = useContract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    "nft-collection"
  );
  const { data: tokenBalance, isLoading } = useOwnedNFTs(
    tokenContract,
    address
  );

  const { tokenIds } = useTokenBalance2(tokenBalance as unknown as Token[]);

  const [notConnectedError, setNotConnectedError] = useState("");
  const [noTokenError, setNoTokenError] = useState("");

  useEffect(() => {
    if (!address) {
      setNotConnectedError("Please connect your wallet to continue");
    }

    if (!tokenIds.length) {
      setNoTokenError("You need to own at least one VH Brain to continue");
    }

    if (address) {
      setNotConnectedError("");
    }

    if (tokenIds.length) {
      setNoTokenError("");
    }
  }, [address, tokenIds.length]);

  return (
    <FormProvider {...methods}>
      <form className="max-w-xl mx-auto my-20 flex flex-col gap-5 text-gray-500">
        <div className="mb-10">
          <p className="gradient-text text-4xl font-bold w-fit">Sign In</p>
          <p className="text-[12px]">
            already have an account?{" "}
            <Link to="/" className="underline">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="text-center border-sky-500 bg-[#0D0D0D] py-5 text-white rounded-full flex gap-5 justify-center">
          🧠{" "}
          <a
            href="https://opensea.io/collection/god-hates-ai"
            className="hover:underline"
            target="_blank"
          >
            Buy VH Brain Now on Opensea
          </a>{" "}
          🎉
        </div>
        {notConnectedError && (
          <div className="mb-5 space-y-3 border-b-[0.5px] border-b-[#262626] ">
            <p className="text-center text-red-400">{notConnectedError}!</p>
            <ConnectWallet className="!mx-auto !mb-5 !w-full bg-slate-900 !py-5 text-sm uppercase gradient dark:bg-opacity-10 dark:!text-white !rounded-full" />
          </div>
        )}
        {isLoading && address && (
          <p className="text-black font-bold">
            Checking your wallet balance...
          </p>
        )}
       

        <fieldset disabled={methods.formState.isSubmitting} className="flex flex-col gap-5">
          <Select
            required
            name="tokenId"
            label="Token ID (VH Brain)"
            placeholder="Select a Brain"
            options={tokenIds.map((tokenId: string) => ({
              label: tokenId ? `VH Brain #${tokenId}` : "",
              value: tokenId ?? "",
            }))}
            error={noTokenError}
            className=""
          />
          <Input
            required
            name="email"
            label="Email"
            type="text"
            placeholder="example@gmail.com"
            className="text-black"
          />
          <Input
            required
            name="password"
            label="Password"
            type="password"
            placeholder="• • • • • • • • •"
            className="text-black"
          />
        </fieldset>

        <button
          type="submit"
          onClick={onSubmit}
          disabled={mutation.isLoading}
          className="w-full bg-[#47E2BD] font-bold py-4 mt-7 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/onboarding" className="underline">
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default Login;
