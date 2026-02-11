import Aside from "../aside/Aside";
import DashBoard from "../dashboard/DashBoard";

export default function Main() {
  return (
    <main className="w-full h-screen bg-gray-200 flex">
      <Aside />
      <DashBoard />
    </main>
  );
}
