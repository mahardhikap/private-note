import React from "react";
import { MainHeader } from "@/data/header.data";
import { useRouter } from "next/router";
import Link from "next/link";
import TypingAnimation from "./index/animate-typing";

const Header: React.FC = () => {
  const router = useRouter();
  const path = router.pathname;
  const textRunning = ["Nasihat   ", "Pengingat   "]

  return (
    <div className="py-5 bg-white sticky top-0 z-10">
      <div className="container flex justify-between mx-auto w-10/12 lg:w-2/3 xl:w-3/5">
        <div className="font-bold text-xl truncate">TulisanQ: <span className="font-normal"><TypingAnimation texts={textRunning}/></span></div>
        <ul className="flex flex-row gap-5 list-none">
          {MainHeader?.map((item, i) => {
            return (
              <Link href={`${item.url}`} key={i}>
                <li
                  className={`${
                    item.url === path ? "border-b-2 border-black" : ""
                  } cursor-pointer`}
                >
                  {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
