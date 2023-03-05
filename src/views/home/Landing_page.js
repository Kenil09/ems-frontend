/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function Landing_page() {
    return (
        <div>
            <div class="hero">
                <nav>
                    <h2 class="logo">
                        EM<span>PS</span>
                    </h2>

                    <a href="#" class="btn a">
                        Sign&nbsp;in
                    </a>
                </nav>

                <div class="row header-top">
                    <div class="col-md-6">
                        <h1 class="text">
                            Smart <span class="txt"> time and attendance</span> software
                        </h1>
                        <p class="text">
                            Zoho People helps you track your team's attendance, configure shifts, manage time logs, and do so much more in a
                            matter of minutes. Our consolidated software allows you to record, store, and access information in real time.
                            Save time and effort, and do more on the go!
                        </p>
                        <button type="submit" class="btn a">
                            Let's&nbsp;Get&nbsp;Started
                        </button>
                    </div>
                    <div class="col-md-4 video">
                        <video
                            autoplay=""
                            loop=""
                            muted=""
                            poster="https://www.zohowebstatic.com/sites/zweb/images/people/smart-time-header.jpg"
                            width="350"
                            height="400"
                        >
                            <source type="video/mp4" src="https://www.zohowebstatic.com/sites/zweb/images/people/smart-time-header.mp4" />
                        </video>
                    </div>
                </div>
            </div>

            <div class="service">
                <div class="title">
                    <h2>Everything you need in one place.</h2>

                    <p class="manage-text">
                        View what’s happening in the organization with more clarity than ever before. Track employee attendance and use
                        timesheets to analyze your employee potential and performance.
                    </p>
                </div>

                <div class="box">
                    <div class="card">
                        <img src="https://www.zohowebstatic.com/sites/zweb/images/people/manage-time.png" alt="" />
                        <h5>Manage</h5>
                        <div class="pra">
                            <p>Take complete control of employee attendance, shifts, and job tracking.</p>
                        </div>
                    </div>

                    <div class="card">
                        <img src="https://www.zohowebstatic.com/sites/zweb/images/people/engage-time.png" alt="" />
                        <h5>Empower</h5>
                        <div class="pra">
                            <p>Enable your remote and mobile workforce to check-in from anywhere.</p>
                        </div>
                    </div>

                    <div class="card">
                        <img src="https://www.zohowebstatic.com/sites/zweb/images/people/analyze-time.png" alt="" />
                        <h5>Analyze</h5>
                        <div class="pra">
                            <p>Generate precise reports and accelerate your team’s productivity.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-5 right">
                    <img src="public\assets\images\img1.png" alt="" />
                </div>
                <div class="col-md-5 left">
                    <h1 class="heading">
                        <b>Core HR simplified</b>
                    </h1>
                    <p class="content">
                        Say goodbye to mundane spreadsheets or rigid systems to manage HR tasks. Get smarter and more efficient software
                        with features designed to free you from administrative work.
                    </p>
                    <ul class="list">
                        <li class="list-item">
                            <b>An employee database that scales</b>
                        </li>
                        <li class="list-item">
                            <b>Efficient employee case management</b>
                        </li>
                        <li class="list-item">
                            <b>Smart HR workflows</b>
                        </li>
                        <li class="list-item">
                            <b>Insightful analytics</b>
                        </li>
                    </ul>
                    <a href="#" class="learn-more">
                        Learn More
                    </a>
                </div>
            </div>

            <div class="row">
                <div class="col-md-5 right">
                    <h1 class="heading">
                        <b>Optimize your time and attendance</b>
                    </h1>
                    <p class="content">
                        Spend less time tracking time and days off. Zoho People's time and attendance system lets you focus on employee
                        productivity while accurately tracking work hours and providing error-free reporting.
                    </p>
                    <ul class="list">
                        <li class="list-item">
                            <b>Track attendance with ease</b>
                        </li>
                        <li class="list-item">
                            <b>Schedule shifts effortlessly</b>
                        </li>
                        <li class="list-item">
                            <b>Track days off efficiently</b>
                        </li>
                        <li class="list-item">
                            <b>Convert time to timesheets</b>
                        </li>
                    </ul>
                    <a href="#" class="learn-more">
                        Learn More
                    </a>
                </div>

                <div class="col-md-5 img2">
                    <img src="../p" alt="" />
                </div>
            </div>

            <div class="row">
                <div class="col-md-4  img3">
                    <img src="../public/assets/images/home/img4.1.png" alt="" />
                </div>
                <div class="col-md-6 div3">
                    <h1 class="heading">
                        <b>Performance management at its best</b>
                    </h1>
                    <p class="content">
                        Enrich the talent that nurtures your business. Get insight on how each team is performing, every individual's skills
                        and potential, and the ways you can improve organizational performance.
                    </p>
                    <ul class="list">
                        <li class="list-item">
                            <b>Flexible goal setting and KRA mapping</b>
                        </li>
                        <li class="list-item">
                            <b>Continuous reviews and performance appraisals</b>
                        </li>
                        <li class="list-item">
                            <b>360-degree feedback</b>
                        </li>
                        <li class="list-item">
                            <b>Analytics to identify performance gaps</b>
                        </li>
                    </ul>
                    <a href="#" class="learn-more">
                        Learn More
                    </a>
                </div>
            </div>

            <div class="row">
                <div class="col-md-5 right">
                    <h1 class="heading">
                        <b>Reimagine learning and development</b>
                    </h1>
                    <p class="content">
                        Zoho People provides a powerful but simple way to manage and deliver the best learning experience to your employees.
                        Our learning and development system enables dynamic learning for every team with engaging content and virtual
                        training.
                    </p>
                    <ul class="list">
                        <li class="list-item">
                            <b>Blended learning with virtual classrooms</b>
                        </li>
                        <li class="list-item">
                            <b>Centralized course management</b>
                        </li>
                        <li class="list-item">
                            <b>Quiz and assessments</b>
                        </li>
                    </ul>
                    <a href="#" class="learn-more">
                        Learn More
                    </a>
                </div>

                <div class="col-md-5 img2">
                    <img src="public\assets\images\img4.png" alt="" />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 right">
                    <img src="public\assets\images\zp-privacybanner.png" class="img" alt="" />

                    <div class="head">
                        <h2>Trust and security</h2>
                    </div>
                    <div class="data">
                        <p>
                            Trust and customer security is the foundation of everything
                            <br /> &nbsp &nbsp we do at Zoho. Built on our own cloud, battle-tested
                            <br /> infrastructure, we deploy industry-leading safety measures so
                            <br /> you can rest assured that your data is safe and protected 24/7.
                        </p>
                    </div>
                    <div>
                        <a href="#" class="learn-more head">
                            Data security and privacy
                        </a>
                    </div>
                </div>

                <div class="col-md-5 div">
                    <img src="public\assets\images\zp-grow.png" class="img1" alt="" />

                    <h2>Increased business agility</h2>

                    <div class="data">
                        <p>
                            The skills your company needs, where employees work and how your company itself functions continue evolving.
                            Zoho arms you with the ability to adapt to these changes, to have consistent, accurate, and real-time visibility
                            of your global workforce with better decision-making.
                        </p>
                    </div>
                    <div>
                        <a href="#" class="learn-more head">
                            Why Zoho People
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing_page;
