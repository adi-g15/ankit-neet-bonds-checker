import React, { useEffect, useState } from 'react';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/global.css";
import ScreenshotCommand from "../screenshots/command.png";
import ScreenshotChoiceFilling from "../screenshots/choice-filling.png";
import ScreenshotCopyObject from "../screenshots/copy-object.png";

import Helmet from "react-helmet";

export default function CS4401() {
    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content="CS4401 bina password" />
                    <meta name="theme-color" content="#20b2aa" />
                    <meta name="lang" content="en" />
                    <title>NEET Bond Checker</title>
                </Helmet>
            </div>
            <NavBar title="NEET Bond Checker" />

            <hr className="separation" />
            <h3 className="centered">Help</h3>
np            <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                <div className="container">
                    <strong>{"1. Go to \"Choice Filling\" (Sign In -> Choice Filling)"}</strong>
                    <br />
                    <img className="centered" style={{margin: "8px"}} width="90%" src={ScreenshotChoiceFilling} />
                    <br />
                </div>
                <div className="container">
                    <strong>{"2. Press F12, then click on 'Console'"}</strong>
                    <br />
                </div>
                <div className="container">
                    <strong>{"3. Copy paste this into console:"}</strong>
                    <br />
                    {"JSON.stringify(Array.from(document.querySelectorAll(\"#filledChoiceContainer tr\")).map(obj => ({name: obj.children[1].textContent}) );"}
                    <br />
                    <img className="centered" style={{margin: "8px"}} width="90%" src={ScreenshotCommand} />
                    <br />
                </div>
                <div className="container">
                    <strong>{"4. Right click on the string printed, chose \"Copy Object\", then paste below"}</strong>
                    <br />
                    <img className="centered" style={{margin: "8px"}} width="90%" src={ScreenshotCopyObject} />
                    <br />
                </div>
            </div>
            <Footer />
        </>);
}
