"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Lỗi khi parse JSON:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    getUser();

    const handleStorageChange = () => getUser();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-blue-700 text-3xl font-bold">
          Hekate
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-700">
            Trang chủ
          </Link>
          <Link href="/jobs" className="text-gray-700 hover:text-blue-700">
            Việc làm
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-700">
            Về chúng tôi
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-700">
            Liên hệ
          </Link>
        </div>

        {/* Kiểm tra trạng thái đăng nhập */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {user ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-700 font-semibold hover:text-blue-700 focus:outline-none"
              >
                Xin chào, {user.name} ▼
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
              Đăng nhập
            </Link>
          )}
        </div>

        {/* Toggle Mobile Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-white p-4 shadow-md">
          <Link href="/" className="text-gray-700 hover:text-blue-700">
            Trang chủ
          </Link>
          <Link href="/jobs" className="text-gray-700 hover:text-blue-700">
            Việc làm
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-700">
            Về chúng tôi
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-700">
            Liên hệ
          </Link>

          {user ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-700 text-center font-semibold"
              >
                Xin chào, {user.name} ▼
              </button>
              {dropdownOpen && (
                <div className="flex flex-col items-center bg-white border rounded-md shadow-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 w-full text-center py-2 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-700 text-white text-center py-2 rounded-md hover:bg-blue-800"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
