"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../Navbar/logo.png";

export default function Footer() {
  return (
    <footer
      className="relative bg-black/90 text-gray-300 py-12"
      style={{
        backgroundImage: "url('/footer/footer-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/70"></div> */}

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 z-10">
        {/* Logo and About */}
        <div>
          <Link href="/" className="flex items-center mb-5">
            <Image src={logo} alt="logo" className="h-12 w-auto" />
          </Link>
          <p className="text-sm leading-relaxed text-gray-300">
            There Are Many Variations Of Passages Of Lorem Ipsum Available, But
            The Majority Have Suffered Alteration In Some Form, By Injected
            Humour, Or Randomised Words Which Don’t Look Even Slightly
            Believable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className="hover:text-white transition"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/career" className="hover:text-white transition">
                Career
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Scope & Products */}
        <div>
          <h4 className="text-white font-semibold mb-4">Scope & Products</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/resume-builder"
                className="hover:text-white transition"
              >
                AI Resume Builder
              </Link>
            </li>
            <li>
              <Link href="/skill-tests" className="hover:text-white transition">
                AI Skill Tests
              </Link>
            </li>
            <li>
              <Link href="/cv-parsing" className="hover:text-white transition">
                AI CV Parsing
              </Link>
            </li>
          </ul>
        </div>

        {/* AI Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">AI Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/resume-accuracy"
                className="hover:text-white transition"
              >
                AI - Resume Accuracy
              </Link>
            </li>
            <li>
              <Link
                href="/resume-enhancer"
                className="hover:text-white transition"
              >
                AI - Resume Enhancer
              </Link>
            </li>
            <li>
              <Link href="/job-match" className="hover:text-white transition">
                AI - Job Match & Apply
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-sm">info@example.com</p>

          {/* Email Subscription */}
          <div className="flex mt-3">
            <input
              type="email"
              placeholder="Enter Your Email..."
              className="p-2 text-sm rounded-l bg-white text-gray-900 w-full outline-none"
            />
            <button className="bg-black text-white px-4 rounded-r text-sm hover:bg-gray-800">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6 z-10">
        <p className="text-sm">
          © 2025 Inspireambitions.In All Rights Reserved
        </p>

        {/* Social Icons */}
        {/* <div className="flex gap-3 mt-4 md:mt-0">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 p-2 rounded text-white hover:opacity-80"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-400 p-2 rounded text-white hover:opacity-80"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 p-2 rounded text-white hover:opacity-80"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 p-2 rounded text-white hover:opacity-80"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 p-2 rounded text-white hover:opacity-80"
          >
            <FaLinkedinIn />
          </a>
        </div> */}
        <div className="flex gap-3 mt-4 md:mt-0">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src="/footer/footer_fb_icon.png" // 👉 your path here
              alt="Facebook"
              width={32}
              height={32}
              className="rounded"
            />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src="/footer/footer_twitter_icon.png" // 👉 your path here
              alt="Twitter"
              width={32}
              height={32}
              className="rounded"
            />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src="/footer/footer_yt_icon.png"
              alt="YouTube"
              width={32}
              height={32}
              className="rounded"
            />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src="/footer/footer_insta_icon.png"
              alt="Instagram"
              width={32}
              height={32}
              className="rounded"
            />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src="/footer/footer_linkedine_icon.png"
              alt="LinkedIn"
              width={32}
              height={32}
              className="rounded"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
