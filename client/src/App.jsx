import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useRef } from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify"; // Ensure toast and ToastContainer are imported
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported
import { setOpenSidebar } from "./Redux/slices/authSlice";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import TaskDetails from "./Pages/TaskDetails";
import Tasks from "./Pages/Tasks";
import TrashPage from "./Pages/TrashPage";
import UsersPage from "./Pages/UsersPage";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import ErrorBoundary from "./ErrorBoundary";

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-opacity duration-700"
      enterFrom="opacity-x-10"
      enterTo="opacity-x-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-x-100"
      leaveTo="opacity-x-0"
    >
      {(ref) => (
        <div
          ref={(node) => (mobileMenuRef.current = node)}
          className={clsx(
            "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={() => closeSidebar()}
        >
          <div className="bg-white w-3/4 h-full">
            <div className="w-full flex justify-end px-5 ">
              <button
                onClick={() => closeSidebar()}
                className="flex justify-end items-end"
              >
                <IoClose size={25} />
              </button>
            </div>

            <div className="-mt-10">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6] ">
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/completed/:status" element={<Tasks />} />
            <Route path="/in-progress/:status" element={<Tasks />} />
            <Route path="/todo/:status" element={<Tasks />} />
            <Route path="/team" element={<UsersPage />} />
            <Route path="/trashed" element={<TrashPage />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Route>
          <Route path="/log-in" element={<LoginPage />} />
        </Routes>
      </ErrorBoundary>
      <ToastContainer />
    </main>
  );
}

export default App;
