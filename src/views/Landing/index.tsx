import { useRef } from "react";
import Features from "./Features";
import { Hero } from "./Hero";

const Landing: React.FC = () => {
  const aboutRef = useRef(null);

  return (
    <>
      <Hero aboutRef={aboutRef} />
      <Features aboutRef={aboutRef} />
    </>
  );
};

export default Landing;
