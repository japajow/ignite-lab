import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

export function Event() {
  return (
    <div className="flex justify-center items-center">
      <Header />
      <main>
        <Video />
        <Sidebar />
      </main>
    </div>
  );
}
