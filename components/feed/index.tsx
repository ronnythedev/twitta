import Header from "./Header";
import Input from "./Input";

export default function Index() {
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <Header />
      <Input />
    </div>
  );
}
