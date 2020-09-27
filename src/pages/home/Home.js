import React, { Component } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './Home.css'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
    render() {

        return (
            <div>
                <Header />
                <div class="splash-container">
                    <div class="splash">
                        <h1 class="splash-head"> Chat App </h1>
                        <p class="splash-subhead">
                            Connecting the world
                        </p>
                        <div id="custom-button-wrapper">
                            <Link to='/login'>
                                <a class="my-super-cool-btn">
                                    <span className="buttoncooltext">Start Chatting</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}