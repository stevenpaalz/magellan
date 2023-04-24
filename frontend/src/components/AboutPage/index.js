import "./AboutPage.css"

const AboutPage = () => {
    return (
        <>
            <div className="about-full-page">
                <div className="about-header-holder">
                    <img src={`../../../../assets/biglogo.png`} className="about-logo"></img>
                    <div className="about-header">eet the team</div>
                </div>
                <div className="teammates-holder">
                    <div className="teammate-holder">
                        <div className="teammate-avatar-holder">
                         <a href="https://www.linkedin.com/in/danholodak/" target="_blank">
                            <img src={`../../../../assets/avatar1.png`} className="teammate-avatar"></img>
                         </a>
                        </div>
                        <div className="teammate-name">Dan Holodak</div>
                        <div className="teammate-title">Team Lead, Flex</div>
                        <div className="about-socials-holder">
                                <a href="https://github.com/danholodak" target="_blank">
                            <div className="teammate-github-icon">
                                    <i className="fa-brands fa-github"></i>
                            </div>
                                </a>
                                <a href="https://www.linkedin.com/in/danholodak/" target="_blank">
                            <div className="teammate-linkedin-icon">
                                    <i className="fa-brands fa-linkedin-in"></i>
                            </div>
                                </a>
                        </div>
                    </div>

                    <div className="teammate-holder">
                        <div className="teammate-avatar-holder">
                            <a href="https://www.linkedin.com/in/steve-paalz/" target="_blank">
                                <img src={`../../../../assets/avatar3.png`} className="teammate-avatar"></img>
                            </a>
                        </div>
                        <div className="teammate-name">Steve Paalz</div>
                        <div className="teammate-title">Backend</div>
                        <div className="about-socials-holder">
                                <a href="https://github.com/stevenpaalz" target="_blank">
                            <div className="teammate-github-icon">
                                    <i className="fa-brands fa-github"></i>
                            </div>
                                </a>
                                <a href="https://www.linkedin.com/in/steve-paalz/" target="_blank">
                            <div className="teammate-linkedin-icon">
                                    <i className="fa-brands fa-linkedin-in"></i>
                            </div>
                                </a>
                        </div>
                    </div>

                    <div className="teammate-holder">
                        <div className="teammate-avatar-holder">
                            <a href="https://www.linkedin.com/in/yong-lin-b7142a40/" target="_blank">
                                <img src={`../../../../assets/avatar4.png`} className="teammate-avatar"></img>
                            </a>
                        </div>
                        <div className="teammate-name">Yong Lin</div>
                        <div className="teammate-title">Flex</div>
                        <div className="about-socials-holder">
                                <a href="https://github.com/YLinDev" target="_blank">
                            <div className="teammate-github-icon">
                                    <i className="fa-brands fa-github"></i>
                            </div>
                                </a>
                                <a href="https://www.linkedin.com/in/yong-lin-b7142a40/" target="_blank">
                                    <div className="teammate-linkedin-icon">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </div>
                                </a>
                        </div>
                    </div>


                    <div className="teammate-holder">
                        <div className="teammate-avatar-holder">
                            <a href="https://www.linkedin.com/in/jamieburchfield/" target="_blank">
                                <img src={`../../../../assets/avatar2.png`} className="teammate-avatar"></img>
                            </a>
                        </div>
                        <div className="teammate-name">Jamie Burchfield</div>
                        <div className="teammate-title">Frontend</div>
                        <div className="about-socials-holder">
                                <a href="https://github.com/cjburchfield" target="_blank">
                            <div className="teammate-github-icon">
                                    <i className="fa-brands fa-github"></i>
                            </div>
                                </a>
                                <a href="https://www.linkedin.com/in/jamieburchfield/" target="_blank">
                            <div className="teammate-linkedin-icon">
                                    <i className="fa-brands fa-linkedin-in"></i>
                            </div>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutPage;