/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, color } from '@mui/system';
import { Grid, List, Paper, Typography, AppBar, Container, Toolbar, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import { ListItemText, ListItem, ListItemIcon } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { SignupModel } from 'ui-component/SignStepper/SignupModel';
import { Button } from '@mui/material';

import './style.css';

function LandingPage() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode == 'dark' ? '#1A2027' : '#fff',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }));
    const CardWrapper = styled(MainCard)(({ theme }) => ({
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: -30,
            right: -180
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
            borderRadius: '50%',
            top: -160,
            right: -130
        }
    }));

    const styles = {
        Item: {
            height: '100%'
        }
    };
    return (
        <>
            {/* <button type="submit" className="btn btn-outline-info" onClick={() => handleOpen()}>
                                Let's&nbsp;Get&nbsp;Started
                            </button>
                        </div>
                       */}

            {/* <SignupModel open={open} handleClose={handleClose} /> */}
            <CardWrapper border={false} content={false}>
                <Box>
                    <Grid container spacing={1}>
                        <Grid xs={12} md={12} item style={styles.Item} className="hero" sx={{ display: 'flex' }}>
                            <Grid xs={12} md={6} item style={styles.Item}>
                                <Typography variant="h6" sx={{ float: 'left', marginLeft: '20px', marginTop: '20px' }}>
                                    <h2 className="logo">
                                        EM<span className="span">PS</span>
                                    </h2>
                                </Typography>
                            </Grid>
                            <Grid xs={12} md={6} item style={styles.Item}>
                                <Box sx={{ float: 'right', marginRight: '20px' }}>
                                    <Button>
                                        <a href="/login" className="btn btn-outline-info">
                                            Sign&nbsp;in
                                        </a>
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={12} item style={styles.Item} className="hero" sx={{ display: 'flex' }}>
                            <Grid xs={12} md={8} item style={styles.Item}>
                                <h1 className="text">
                                    Smart <span className="txt"> time and attendance</span> software
                                </h1>
                                <Typography className="textCenter text p">
                                    Our team helps you track your team's attendance, configure shifts, manage time logs, and do so much more
                                    in a matter of minutes. Our consolidated software allows you to record, store, and access information in
                                    real time. Save time and effort, and do more on the go!
                                </Typography>
                                <button type="submit" className="btn btn-outline-info" onClick={() => handleOpen()}>
                                    Let's&nbsp;Get&nbsp;Started
                                </button>
                            </Grid>
                            <Grid xs={12} md={4} item style={styles.Item} sx={{ float: 'right', marginRight: '40px' }}>
                                <video autoPlay muted loop className="video1">
                                    <source type="video/mp4" src={require('../../assets/images/home/video.mp4')} />
                                </video>
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={12} item style={styles.Item}>
                            <h2 className="title">Everything you need in one place.</h2>
                            <Typography className="manage-text">
                                View what’s happening in the organization with more clarity than ever before. Track employee attendance and
                                use timesheets to analyze your employee potential and performance.
                            </Typography>
                        </Grid>
                        <Grid xs={12} md={4} item style={styles.Item}>
                            <Item sx={{ border: '1px solid #bababa' }}>
                                <img className="imgtext" src={require('../../assets/images/home/box1.png')} alt="" />
                                <h5 className="h5">Manage</h5>
                                <div>
                                    <p className="pra">Take complete control of employee attendance, shifts, and job tracking.</p>
                                </div>
                            </Item>
                        </Grid>
                        <Grid xs={12} md={4} item style={styles.Item}>
                            <Item sx={{ border: '1px solid #bababa' }}>
                                <img className="imgtext" src={require('../../assets/images/home/box2.png')} alt="" />
                                <h5 className="h5">Empower</h5>
                                <div>
                                    <p className="pra">Enable your remote and mobile workforce to check from anywhere.</p>
                                </div>
                            </Item>
                        </Grid>
                        <Grid xs={12} md={4} item style={styles.Item}>
                            <Item sx={{ border: '1px solid #bababa' }}>
                                <img className="imgtext" src={require('../../assets/images/home/box3.png')} alt="" />
                                <h5 className="h5">Analyze</h5>
                                <div>
                                    <p className="pra">Generate precise reports and accelerate your team’s productivity.</p>
                                </div>
                            </Item>
                        </Grid>

                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <img src={require('../../assets/images/home/img1.png')} alt="" />
                            </Item>
                        </Grid>
                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <h1 className="heading img3">
                                    <b>Core HR simplified</b>
                                </h1>
                                <Typography className="content img3">
                                    Say goodbye to mundane spreadsheets or rigid systems to manage HR tasks. Get smarter and more efficient
                                    software with features designed to free you from administrative work.
                                </Typography>
                                <List sx={{ marginLeft: '50px' }}>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>An employee database that scales</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Efficient employee case management</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Smart HR workflows</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Insightful analytics</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <a href="#" className="learn-more">
                                            Learn More
                                        </a>
                                    </ListItem>
                                </List>
                            </Item>
                        </Grid>
                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <h1 className="heading img3">
                                    <b>Optimize your time and attendance</b>
                                </h1>
                                <Typography className="content img3">
                                    Spend less time tracking time and days off. Our People's time and attendance system lets you focus on
                                    employee productivity while accurately tracking work hours and providing error-free reporting.
                                </Typography>
                                <List sx={{ marginLeft: '50px' }}>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Track attendance with ease</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Schedule shifts effortlessly</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Track days off efficiently</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Convert time to timesheets</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <a href="#" className="learn-more">
                                            Learn More
                                        </a>
                                    </ListItem>
                                </List>
                            </Item>
                        </Grid>
                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <img src={require('../../assets/images/home/img2.png')} alt="" className="img2" />
                            </Item>
                        </Grid>
                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <img src={require('../../assets/images/home/img3.png')} alt="" className="img3" />
                            </Item>
                        </Grid>
                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <h1 className="heading img3">
                                    <b>Performance management at its best</b>
                                </h1>
                                <Typography className="content img3">
                                    Enrich the talent that nurtures your business. Get insight on how each team is performing, every
                                    individual's skills,and all the ways you can improve organizational performance.
                                </Typography>
                                <List sx={{ marginLeft: '50px' }}>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Flexible goal setting and KRA mapping</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Continuous reviews and performance appraisals</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>360-degree feedback</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Analytics to identify performance gaps</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <a href="#" className="learn-more">
                                            Learn More
                                        </a>
                                    </ListItem>
                                </List>
                            </Item>
                        </Grid>
                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <h1 className="heading">
                                    <b>Reimagine learning and development</b>
                                </h1>
                                <Typography className="content">
                                    {' '}
                                    Our People provides a powerful but simple way to manage and deliver the best learning experience to your
                                    employees. Our learning and development system enables dynamic learning for every team with engaging
                                    content and virtual training.
                                </Typography>
                                <List sx={{ marginLeft: '50px', marginTop: '30px', marginBottom: '50px' }}>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Blended learning with virtual classNamerooms</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Centralized course management</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                                        <ListItemText>Quiz and assessments</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <a href="#" className="learn-more">
                                            Learn More
                                        </a>
                                    </ListItem>
                                </List>
                            </Item>
                        </Grid>
                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <img src={require('../../assets/images/home/img4.png')} className="img3" alt="" />
                            </Item>
                        </Grid>
                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <img src={require('../../assets/images/home/block1.png')} className="img" alt="" />
                                <h2 className="heading">Trust and security</h2>
                                <p className="content">
                                    Trust and customer security is the foundation of everything we do at EMPS. Built on our own cloud,
                                    battle-tested infrastructure, we deploy industry-leading safety measures so you can rest assured that
                                    your data is protected 24/7.
                                </p>
                                <a href="#" className="learn-more head">
                                    Data security and privacy
                                </a>
                            </Item>
                        </Grid>
                        <Grid xs={12} md={6} item style={styles.Item}>
                            <Item>
                                <img src={require('../../assets/images/home/block2.png')} className="img1" alt="" />
                                <h2 className="heading">Increased business agility</h2>
                                <p className="content">
                                    The skills your company needs, where employees work and how your company itself functions continue
                                    evolving. our hrms you with the ability to adapt to these changes, to have consistent, accurate, and
                                    real-time visibility.
                                </p>
                                <a href="#" className="learn-more head">
                                    Why us
                                </a>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
            <SignupModel open={open} handleClose={handleClose} />
        </>
    );
}

export default LandingPage;
