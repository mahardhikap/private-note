import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { AdminHeader } from "@/data/header.data";
import Link from "next/link";
import withAuth from "@/utils/with-auth";
import Swal from "sweetalert2";

interface AdminProps {
  children: ReactNode;
}

const Admin: React.FC<AdminProps> = ({ children }) => {
  const router = useRouter();
  const path = router.pathname;

  const handleLogout = () => {
    Swal.fire({
      title: "Buru-buru amat?🤨",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd3333",
      cancelButtonColor: "#a5dc86",
      confirmButtonText: "Gas cabut",
      cancelButtonText:"Masih betah"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Jangan lupa mampir lagi!😁",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          localStorage.clear();
          router.replace("/login");
        });
      }
    });
  };

  return (
    <>
      <div className="text-center py-5 bg-white text-lg sticky top-0 z-10">
       <strong>TulisanQ</strong> Admin Dashboard💻
      </div>
      <div className="mx-auto container p-3">
        <div className="grid grid-cols-5 min-h-screen">
          <div className="col-span-1 sticky top-20 h-fit">
            <ul className="flex flex-col gap-5">
              {AdminHeader?.map((item, i) => {
                return item.action === "logout" ? (
                  <li key={i} onClick={handleLogout} className="cursor-pointer">
                    <span>{item.label}</span>
                  </li>
                ) : (
                  <Link href={item.url} key={i}>
                    <li>
                      <span
                        className={`${
                          item.url === path ? "border-b-2 border-black" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="col-span-4">{children}</div>
        </div>
      </div>
      <div className="text-center my-5 font-semibold">&copy;2025 TulisanQ. All rights reserved.</div>
    </>
  );
};

export default withAuth(Admin);
