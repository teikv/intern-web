"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

export default function LoginPage() {
  const [dialog, setDialog] = useState({ open: false, message: "", type: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordErrors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        window.dispatchEvent(new Event("storage")); // Kích hoạt sự kiện để Navbar cập nhật
      
        setDialog({ open: true, message: "Login successful", type: "success" });
        setTimeout(() => {
          window.location.href = "http://localhost:3001/";
        }, 2000);
      } else {
        setDialog({ open: true, message: result.message || "Email hoặc mật khẩu không đúng.", type: "error" });
      }
    } catch (error) {
      setDialog({ open: true, message: "Lỗi kết nối đến server", type: "error" });
    }
  };

  const onForgotPasswordSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        setDialog({ open: true, message: "Yêu cầu đặt lại mật khẩu đã được gửi", type: "success" });
        setShowForgotPassword(false);
      } else {
        setDialog({ open: true, message: result.message || "Có lỗi xảy ra", type: "error" });
      }
    } catch (error) {
      setDialog({ open: true, message: "Lỗi máy chủ, vui lòng thử lại", type: "error" });
    }
  };

  useEffect(() => {
    if (dialog.open) {
      const timer = setTimeout(() => {
        setDialog({ open: false, message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dialog.open]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex w-3/4 max-w-5xl justify-between items-center space-x-12">
        <div className="w-1/2 p-10">
          {!showForgotPassword ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-black">Đăng nhập</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black">Email</label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="Nhập email"
                    className="border border-gray-300 bg-white text-black focus:ring-0 focus:outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black">Mật khẩu</label>
                  <Input
                    type="password"
                    {...register("password")}
                    placeholder="Nhập mật khẩu"
                    className="border border-gray-300 bg-white text-black focus:ring-0 focus:outline-none"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full bg-blue-600 text-white">Đăng nhập</Button>
              </form>
              <p className="text-sm text-blue-500 cursor-pointer mt-2" onClick={() => setShowForgotPassword(true)}>
                Quên mật khẩu?
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-black">Quên mật khẩu</h2>
              <form onSubmit={handleForgotPasswordSubmit(onForgotPasswordSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black">Email</label>
                  <Input
                    type="email"
                    {...registerForgotPassword("email")}
                    placeholder="Nhập email"
                    className="border border-gray-300 bg-white text-black focus:ring-0 focus:outline-none"
                  />
                  {forgotPasswordErrors.email && <p className="text-red-500 text-sm">{forgotPasswordErrors.email.message}</p>}
                </div>
                <Button type="submit" className="w-full bg-blue-600 text-white">Gửi yêu cầu</Button>
              </form>
              <p className="text-sm text-blue-500 cursor-pointer mt-2" onClick={() => setShowForgotPassword(false)}>
                Quay lại đăng nhập
              </p>
            </>
          )}
        </div>
        <div className="w-1/2 flex justify-center">
          <Image src="/login-image.png" alt="Login Illustration" width={500} height={500} className="object-cover" />
        </div>
      </div>
      {dialog.open && (
            <Dialog 
                title={dialog.type === "success" ? "Thành công" : "Lỗi"} 
                open={dialog.open} 
                onClose={() => setDialog({ open: false, message: "", type: "" })}
            >
                <DialogContent>{dialog.message}</DialogContent>
            </Dialog>
        )}
    </div>
  );
}