import { useContext } from "react";
import { AuthContext } from "../../services/auth";
import { About } from "../about_page/about";
import { JobsPage } from "../jobs_page/jobs_page";

export const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      {
        auth.user ?
          <JobsPage />
          :
          <About />
      }
    </>
  );
}