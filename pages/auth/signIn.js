import { getProviders, signIn as signInNextAuth } from "next-auth/react";

export default function signIn({ providers }) {
  return (
    <div className="flex justify-center mt-20 space-x-4">
      <img
        className="hidden object-cover md:w-44 md:h-80 rotate-6 md:inline-flex"
        src="/images/login.png"
        alt="twitter image inside a phone"
      />
      <div className="">
        {Object.values(providers).map((provider) => (
          <div className="flex flex-col items-center">
            <img
              className="w-36 object-cover"
              src="/images/logo.png"
              alt="twitter logo"
            />
            <p className="text-center text-sm italic my-10 ">
              This app is created for learning purposes
            </p>
            <button
              onClick={() => signInNextAuth(provider.id, { callbackUrl: "/" })}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
