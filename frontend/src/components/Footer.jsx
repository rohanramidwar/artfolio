import React from "react";

const Footer = () => {
  return (
    <footer class="bg-white  mt-14  ">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            Artfolio
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;