import React from "react";
import Footer from "../components/Footer";
import "../index.css";
import InformationCard from "../components/InformationCard";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Home() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      <div className="container text-center homepage mb-5">
        <div className="row mt-2">
          <div className="col">
            <InformationCard
              title="SAVE THE TIME AND MONEY"
              image="images/save time and money.png"
            />
          </div>
          <div className="col">
            <InformationCard
              title="GET EASILY QUALITY SERVICE"
              image="images/handyman.png"
            />
          </div>
        </div>
        <div className="row">
          <div className="col register_text rounded-5">
            <p className="mt-2">
              Welcome to our Get Work Give Work app! Finding a job quickly has
              never been easier!
              <br />
              The registration process is simple and only takes a few minutes.
              And best of all, it's completely free! Get Work Give Work is one
              of the most reliable platforms for job seekers and employers. Get
              Work Give Work is the easiest and fastest way to find the best job
              opportunities.Thank you, The Get Work Give Work Team
            </p>
            <div className="d-flex justify-content-end me-5">
              {isAuthenticated ? (
                <>
                  <button className="button bg-primary text-white border-0 mb-2 me-5 rounded-2 p-1 px-3">
                    <Nav.Link as={NavLink} to="/hauswork">
                      HausWork
                    </Nav.Link>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => loginWithRedirect()}
                    className="button bg-primary text-white border-0 mb-2 me-5 rounded-2 p-1 px-3"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-0 mt-5">
        <Footer />
      </div>
    </>
  );
}

export default Home;
