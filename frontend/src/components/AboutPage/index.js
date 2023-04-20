import "./AboutPage.css"

const AboutPage = () => {
    return (
        <>
            <div className="about-full-page">
                <div className="about-header-holder">
                    <img src={`../../../../assets/magellan_faviconv2.png`} className="about-logo"></img>
                    <div className="about-header">eet the team</div>
                </div>
                <div className="teammates-holder">
                    <div className="teammate-holder">
                        <div className="teammate-avatar-holder">
                         <img src={`../../../../assets/avatar1.png`} className="teammate-avatar"></img>
                        </div>
                        <div className="teammate-name">Dan Holodak</div>
                        <div className="teammate-title">Team Lead, Flex</div>
                        <div className="about-socials-holder">
                            <div className="teammate-github-icon">
                                <a href="https://github.com/danholodak">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div className="teammate-linkedin-icon">
                                <a href="https://www.linkedin.com/in/danholodak/">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="teammate-holder">
                        <div className="teammate-avatar-holder">
                         <img src={`../../../../assets/avatar4.png`} className="teammate-avatar"></img>
                        </div>
                        <div className="teammate-name">Yong Lin</div>
                        <div className="teammate-title">Flex</div>
                        <div className="about-socials-holder">
                            <div className="teammate-github-icon">
                                <a href="https://github.com/YLinDev">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div className="teammate-linkedin-icon">
                                <a href="https://www.linkedin.com/in/yong-lin-b7142a40/">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="teammate-holder">
                        <div className="teammate-avatar-holder">
                            <img src={`../../../../assets/avatar3.png`} className="teammate-avatar"></img>
                        </div>
                        <div className="teammate-name">Steve Paalz</div>
                        <div className="teammate-title">Backend</div>
                        <div className="about-socials-holder">
                            <div className="teammate-github-icon">
                                <a href="https://www.linkedin.com/in/steve-paalz/">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div className="teammate-linkedin-icon">
                                <a href="https://github.com/stevenpaalz">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="teammate-holder">
                        <div className="teammate-avatar-holder">
                            <img src={`../../../../assets/avatar2.png`} className="teammate-avatar"></img>
                        </div>
                        <div className="teammate-name">Jamie Burchfield</div>
                        <div className="teammate-title">Frontend</div>
                        <div className="about-socials-holder">
                            <div className="teammate-github-icon">
                                <a href="https://github.com/cjburchfield">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div className="teammate-linkedin-icon">
                                <a href="https://www.linkedin.com/in/jamieburchfield/">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutPage;