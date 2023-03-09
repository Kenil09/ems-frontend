/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { SignupModel } from 'ui-component/SignStepper/SignupModel';

function Landing_page() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className="all">
                <div className="hero">
                    <nav>
                        <h2 className="logo">
                            EM<span>PS</span>
                        </h2>

                        <a href="#" className="btn btn-outline-info">
                            Sign&nbsp;in
                        </a>
                    </nav>

                    <div className="row header-top">
                        <div className="col-md-6">
                            <h1 className="text">
                                Smart <span className="txt"> time and attendance</span> software
                            </h1>
                            <p className="text">
                                Zoho People helps you track your team's attendance, configure shifts, manage time logs, and do so much more
                                in a matter of minutes. Our consolidated software allows you to record, store, and access information in
                                real time. Save time and effort, and do more on the go!
                            </p>
                            <button type="submit" className="btn btn-outline-info" onClick={() => handleOpen()}>
                                Let's&nbsp;Get&nbsp;Started
                            </button>
                        </div>
                        <div className="col-md-4 video">
                            <video autoPlay muted loop className="video1">
                                <source type="video/mp4" src={require('../../assets/images/home/video.mp4')} />
                            </video>
                        </div>
                    </div>
                </div>

                <div className="service">
                    <div className="title">
                        <h2>Everything you need in one place.</h2>

                        <p className="manage-text">
                            View what’s happening in the organization with more clarity than ever before. Track employee attendance and use
                            timesheets to analyze your employee potential and performance.
                        </p>
                    </div>
                    <div className="row box">
                        <div className="col-md-3 card">
                            <img className="imgtext" src={require('../../assets/images/home/box1.png')} alt="" />
                            <h5 className="h5">Manage</h5>
                            <div>
                                <p className="pra">Take complete control of employee attendance, shifts, and job tracking.</p>
                            </div>
                        </div>
                        <div className="col-md-3 card">
                            <img className="imgtext" src={require('../../assets/images/home/box2.png')} alt="" />
                            <h5 className="h5">Empower</h5>
                            <div>
                                <p className="pra">Enable your remote and mobile workforce to check-in from anywhere.</p>
                            </div>
                        </div>
                        <div className="col-md-3 card">
                            <img className="imgtext" src={require('../../assets/images/home/box3.png')} alt="" />
                            <h5 className="h5">Analyze</h5>
                            <div>
                                <p className="pra">Generate precise reports and accelerate your team’s productivity.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 right">
                        <img src={require('../../assets/images/home/img1.png')} alt="" />
                    </div>
                    <div className="col-md-5 left">
                        <h1 className="heading">
                            <b>Core HR simplified</b>
                        </h1>
                        <p className="content">
                            Say goodbye to mundane spreadsheets or rigid systems to manage HR tasks. Get smarter and more efficient software
                            with features designed to free you from administrative work.
                        </p>
                        <ul className="list">
                            <li className="list-item">
                                <b>An employee database that scales</b>
                            </li>
                            <li className="list-item">
                                <b>Efficient employee case management</b>
                            </li>
                            <li className="list-item">
                                <b>Smart HR workflows</b>
                            </li>
                            <li className="list-item">
                                <b>Insightful analytics</b>
                            </li>
                        </ul>
                        <a href="#" className="learn-more">
                            Learn More
                        </a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 right">
                        <h1 className="heading">
                            <b>Optimize your time and attendance</b>
                        </h1>
                        <p className="content">
                            Spend less time tracking time and days off. Zoho People's time and attendance system lets you focus on employee
                            productivity while accurately tracking work hours and providing error-free reporting.
                        </p>
                        <ul className="list">
                            <li className="list-item">
                                <b>Track attendance with ease</b>
                            </li>
                            <li className="list-item">
                                <b>Schedule shifts effortlessly</b>
                            </li>
                            <li className="list-item">
                                <b>Track days off efficiently</b>
                            </li>
                            <li className="list-item">
                                <b>Convert time to timesheets</b>
                            </li>
                        </ul>
                        <a href="#" className="learn-more">
                            Learn More
                        </a>
                    </div>

                    <div className="col-md-5 img2">
                        <img src={require('../../assets/images/home/img2.png')} alt="" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4  img3">
                        <img src={require('../../assets/images/home/img3.png')} alt="" />
                    </div>
                    <div className="col-md-6 div3">
                        <h1 className="heading">
                            <b>Performance management at its best</b>
                        </h1>
                        <p className="content">
                            Enrich the talent that nurtures your business. Get insight on how each team is performing, every individual's
                            skills and potential, and the ways you can improve organizational performance.
                        </p>
                        <ul className="list">
                            <li className="list-item">
                                <b>Flexible goal setting and KRA mapping</b>
                            </li>
                            <li className="list-item">
                                <b>Continuous reviews and performance appraisals</b>
                            </li>
                            <li className="list-item">
                                <b>360-degree feedback</b>
                            </li>
                            <li className="list-item">
                                <b>Analytics to identify performance gaps</b>
                            </li>
                        </ul>
                        <a href="#" className="learn-more">
                            Learn More
                        </a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 right">
                        <h1 className="heading">
                            <b>Reimagine learning and development</b>
                        </h1>
                        <p className="content">
                            Zoho People provides a powerful but simple way to manage and deliver the best learning experience to your
                            employees. Our learning and development system enables dynamic learning for every team with engaging content and
                            virtual training.
                        </p>
                        <ul className="list">
                            <li className="list-item">
                                <b>Blended learning with virtual classNamerooms</b>
                            </li>
                            <li className="list-item">
                                <b>Centralized course management</b>
                            </li>
                            <li className="list-item">
                                <b>Quiz and assessments</b>
                            </li>
                        </ul>
                        <a href="#" className="learn-more">
                            Learn More
                        </a>
                    </div>

                    <div className="col-md-5 img2">
                        <img src={require('../../assets/images/home/img4.png')} alt="" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 right">
                        <img src={require('../../assets/images/home/block1.png')} className="img" alt="" />

                        <div className="head">
                            <h2>Trust and security</h2>
                        </div>
                        <div className="data">
                            <p>
                                Trust and customer security is the foundation of everything
                                <br /> &nbsp &nbsp we do at Zoho. Built on our own cloud, battle-tested
                                <br /> infrastructure, we deploy industry-leading safety measures so
                                <br /> you can rest assured that your data is safe and protected 24/7.
                            </p>
                        </div>
                        <div>
                            <a href="#" className="learn-more head">
                                Data security and privacy
                            </a>
                        </div>
                    </div>

                    <div className="col-md-5 div">
                        <img src={require('../../assets/images/home/block2.png')} className="img1" alt="" />

                        <h2>Increased business agility</h2>

                        <div className="data">
                            <p>
                                The skills your company needs, where employees work and how your company itself functions continue evolving.
                                Zoho arms you with the ability to adapt to these changes, to have consistent, accurate, and real-time
                                visibility of your global workforce with better decision-making.
                            </p>
                        </div>
                        <div>
                            <a href="#" className="learn-more head">
                                Why Zoho People
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <SignupModel open={open} handleClose={handleClose} />
        </>
    );
}

export default Landing_page;
