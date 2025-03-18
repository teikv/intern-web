import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-6 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-700">Hekate</div>

        {/* Menu điều hướng */}
        <nav className="flex space-x-6">
          <Link href="/about" className="hover:text-blue-700">Về chúng tôi</Link>
          <Link href="/contact" className="hover:text-blue-700">Liên hệ</Link>
          <Link href="/terms" className="hover:text-blue-700">Điều khoản</Link>
        </nav>

        {/* Mạng xã hội */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" className="text-blue-700">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" className="text-blue-700">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" className="text-blue-700">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
