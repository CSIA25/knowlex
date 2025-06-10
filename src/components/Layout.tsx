import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import AnnouncementBanner from "./AnnouncementBanner";
import { CommandMenu } from "./CommandMenu";

const Layout = () => {
  const [openCommandMenu, setOpenCommandMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50">
        <AnnouncementBanner />
        <Navigation setOpenCommandMenu={setOpenCommandMenu} />
      </header>
      <CommandMenu open={openCommandMenu} setOpen={setOpenCommandMenu} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;