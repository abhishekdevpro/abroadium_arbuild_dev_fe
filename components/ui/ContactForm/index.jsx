"use client";
import Image from "next/image";
import { useState } from "react";
import checklist from "../../../public/assets/contact-checklist.png";
import contactImg from "../../../public/assets/contact_form_img.png";
import { PhoneIcon } from "lucide-react";
import Button from "../Button";
import { companyEmail } from "../../Constant/constant";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    project: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="relative w-full bg-brand-lightblue">
      <div className=" max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Left Side */}
        <div className="flex flex-col gap-2  justify-center">
          <h2 className="text-4xl md:text-3xl font-bold leading-snug mb-6">
            Get Real Estimates And Ideal Solutions For Your Project.
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <Image src={checklist} alt="checklist" height={20} width={20} />
              <span>We will respond to you within 24 hours.</span>
            </li>
            <li className="flex items-center gap-2">
              <Image src={checklist} alt="checklist" height={20} width={20} />
              <span>We’ll sign an NDA if requested.</span>
            </li>
            <li className="flex items-center gap-2">
              <Image src={checklist} alt="checklist" height={20} width={20} />
              <span>Access to dedicated product specialists.</span>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src={contactImg}
              alt="Support"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-500 text-sm">Inquires.</p>
              <a
                href="mailto:sales@CFResume.com"
                className="text-brandBlue font-semibold"
              >
                {companyEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-8 space-y-6"
        >
          <div>
            <p className="font-semibold mb-3">1. Tell us about your company</p>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mb-3"
            />
            <div className="flex gap-3">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-1/2 p-3 border rounded-lg"
              >
                <option value="">Country</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
              </select>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-1/2 p-3 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <p className="font-semibold mb-3">
              2. Tell us more about your project
            </p>
            <textarea
              name="project"
              placeholder="Describe your project briefly"
              value={formData.project}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-28"
            />
          </div>

          <Button
            type="submit"
            variant="outline"
            endIcon={<PhoneIcon />}
            className="w-full"
          >
            Submit
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            By Sending This Form I Confirm That I Have Read And Accept The{" "}
            <a href="#" className="text-brandBlue underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>

      {/* <img
        src="/doodles/doodle2.svg"
        alt="doodle"
        className="absolute left-[-3.4%] right-[86.67%] top-[74.38%] bottom-[-3.92%] "
      /> */}
    </section>
  );
}
