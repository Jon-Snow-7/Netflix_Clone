import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 mt-10 w-[100%] !text-white">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="flex flex-wrap justify-between gap-16 px-4 py-6 lg:py-8">
            <div className="">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Company
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="#" className=" hover:underline !text-gray-500 ">
                    About
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500 ">
                    Careers
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500 ">
                    Brand Center
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500 ">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Help center
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500 ">
                    Discord Server
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    Twitter
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    Facebook
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    Licensing
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Download
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    iOS
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    Android
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    Windows
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline !text-gray-500">
                    MacOS
                  </a>
                </li>
              </ul>
            </div>
          </div>
                  </div>
      </footer>
    </div>
  );
};

export default Footer;
