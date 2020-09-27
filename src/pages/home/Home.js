import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Home.css';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    render() {

        return (
            <div>
                <Header />
                <div className="splash-container">
                    <div className="splash">
                        <h1 className="splash-head"> Chat App </h1>
                        <p className="splash-subhead">
                            Connecting the world
                        </p>
                        <div id="custom-button-wrapper">
                            <Link to='/login'>
                                <span className="buttoncooltext">Start Chatting</span>
                            </Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )

    }
}