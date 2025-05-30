import "/styles/globals.css"; // Global CSS
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import Head from "next/head";
import { ToastContainer } from "react-toastify"; // Import Toastify container
import { ResumeProvider } from "../components/context/ResumeContext";
import { CoverLetterProvider } from "../components/context/CoverLetterContext";
import { useRouter } from "next/router"; // Import useRouter
import Meta from "../components/meta/Meta";
import PageLoader from "../components/pageloader";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Static excluded routes
  const excludedRoutes = [
    "/dashboard/resume-builder",
    "/dashboard/cv-builder",
    "/dashboard/aibuilder",
    "/dashboard/cvaibuilder",
  ];

  // Dynamic excluded patterns
  const dynamicExcludedPatterns = [
    /^\/dashboard\/resume-builder\/.*$/, // Matches any path after resume-builder/
    /^\/dashboard\/cv-builder\/.*$/, // Matches any path after cv-builder/
    /^\/dashboard\/aibuilder\/.*$/, // Matches any path after aibuilder/
    /^\/dashboard\/cvaibuilder\/.*$/, // Matches any path after cvaibuilder/
  ];

  // Check if the current route is excluded
  const isExcluded =
    excludedRoutes.includes(router.pathname) ||
    dynamicExcludedPatterns.some((pattern) => pattern.test(router.asPath));
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }
  return (
    <>
      {!isExcluded && (
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.chtlConfig = { chatbotId: "1256619196" };
              `,
            }}
          />
          <script
            async
            data-id="1256619196"
            id="chatling-embed-script"
            type="text/javascript"
            src="https://chatling.ai/js/embed.js"
          />
        </Head>
      )}
      <Meta
        title="Abroadium - AI Resume Builder"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
        keywords="ATS-friendly, Resume optimization..."
      />
      <ResumeProvider>
        <CoverLetterProvider>
          <PageLoader />
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
        </CoverLetterProvider>
      </ResumeProvider>
    </>
  );
}
