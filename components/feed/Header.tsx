import { ArrowLeftIcon, SparklesIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

type Props = {
  showSparkIcon?: boolean;
  headerTitle: string;
  showBackIcon: boolean;
};

export default function Header({
  showSparkIcon,
  headerTitle,
  showBackIcon,
}: Props) {
  const router = useRouter();
  return (
    <div
      className={
        "flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200" +
        (showBackIcon === true ? " items-center space-x-2" : "")
      }
    >
      {showBackIcon && (
        <div
          className="hoverEffect"
          onClick={() => {
            router.push("/");
          }}
        >
          <ArrowLeftIcon className="h-5 " />
        </div>
      )}

      <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
        {headerTitle}
      </h2>
      {showSparkIcon && (
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      )}
    </div>
  );
}
