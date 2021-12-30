import "./App.css";
import "./assets/ckeditor/ckeditor.css";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import LandingPage from "./pages/landingPage";
import NewsPage from "./pages/PostsPage";
import EachNews from "./componenets/postSection/PostDetails";
import AllPhilos from "./pages/PhilosPage";
import Attend from "./pages/Attend";
import AllProjects from "./pages/ProjectsPage";
import PhiloDetails from "./componenets/philoSection/PhiloDetails";
import ProjectDetails from "./componenets/projectSection/ProjectDetails";
import ImagesObj from "./componenets/aboutSection/Appreciation";
import AboutUs from "./componenets/aboutSection/AboutUs";
import Header from "./componenets/common-components/Header";
import Footer from "./componenets/common-components/Footer";
import { ArrowUpward } from "@material-ui/icons";
import ScrollToTop from "./componenets/common-components/ScrollToTop";


function App() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="App">
      <Container maxWidth="lg" style={{ minHeight: "90vh" }}>
        <Router>
          <ScrollToTop>
          <Header />
          <div style={{ marginBottom: "3em" }}></div>
          <div
            className="arrow"
            id="topicon"
            onClick={scrollToTop}
            style={{ display: visible ? "inline" : "none" }}
          >
            {" "}
            <ArrowUpward
              fontSize="large"
              style={{ color: "#fff", marginBlock: 7 }}
            />{" "}
          </div>
          <Switch>
            <Route path="/Attend" exact component={Attend} />
            <Route path="/Philanthropists" exact component={AllPhilos} />
            <Route path="/Projects/:status" exact component={AllProjects} />
            <Route path="/News/:id" component={EachNews} />
            <Route path="/News" exact component={NewsPage} />
            <Route path="/Philanthropists/:id" component={PhiloDetails} />
            <Route path="/Overhauled/:id" component={ProjectDetails} />
            <Route path="/Completed/:id" component={ProjectDetails} />
            <Route path="/HalfBuilt/:id" component={ProjectDetails} />
            <Route path="/UnderConstruction/:id" component={ProjectDetails} />
            <Route path="/About" component={AboutUs} />
            <Route path="/Appreciations" component={ImagesObj} />
            <Route path="/" component={LandingPage} />
          </Switch>
          </ScrollToTop>
        </Router>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
