import React from "react";
import "../index.css";

function AboutUs() {
  return (
    <div className="text-center about_me mb-0">
      <div className="row">
        <div class="col mt-3 ms-5">
          <div className="profil_image">
            <img className="w-100" src="images/myprofil.png" alt="profil" />
          </div>
        </div>
        <div className="col text_content m-3 mx-5 text-center">
          <h2 className="text-white">Who am I?</h2>
          <p className="text-white fs-5 text-justify">
            I am Nusret Karsli. I would like to begin by sharing my story. Three
            years ago, I came to Switzerland as a refugee. I stayed in an asylum
            center for fifteen months, after which I received a B permit. My
            primary goal was to improve my German language skills, and within a
            year, I obtained my B2 Telc certificate. I completed the Full-Stack
            course at HICODERS, which lasted for a year. During this time, I was
            able to deepen my knowledge and skills and gain new experiences. I
            find the development of software solutions and working in a team
            particularly exciting.
          </p>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col text_content m-5">
          <h2 className="text-white mt-2">What is getWork-giveWork?</h2>
          <p className="text-white fs-5 text-justify ">
            GetWork is a business application designed to help employers and job
            seekers connect with each other more easily. The app also utilizes a
            direct messaging feature that allows employers and job seekers to
            communicate with each other through WhatsApp. This provides instant
            access and facilitates immediate communication between the parties.
            Overall, GetWork offers a convenient and effective solution for
            individuals seeking to find qualified job candidates and for those
            who are looking for new opportunities in their respective fields.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
