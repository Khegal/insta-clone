import { Footer } from "./Footer";
import { Header } from "./Header";
export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="pt-[57px] pb-[53px]">{children}</main>
      <Footer />
    </>
  );
};
