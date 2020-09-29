import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../service/firebase';
import LoginString from '../login/LoginString';
import './Login.css'
import { Card } from 'react-bootstrap';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextFeild from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: "",
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    componentDidMount() {
        if (localStorage.getItem(LoginString.ID)) {
            this.setState({ isLoading: false }, () => {
                this.setState({ isLoading: false })
                this.props.showToast(1, 'Login Success')
                this.props.history.push('./chat')
            })
        } else {
            this.setState({ isLoading: 'false' })
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: "" });

        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async result => {
                let user = result.user;
                if (user) {
                    await firebase.firestore().collection('users')
                        .where('id', "==", user.uid)
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                const currentdata = doc.data()
                                localStorage.setItem(LoginString.FirebaseDocumentId, doc.id)
                                localStorage.setItem(LoginString.ID, currentdata.id)
                                localStorage.setItem(LoginString.Name, currentdata.name)
                                localStorage.setItem(LoginString.Email, currentdata.email)
                                localStorage.setItem(LoginString.Password, currentdata.password)
                                localStorage.setItem(LoginString.PhotoURL, currentdata.URL)
                                localStorage.setItem(LoginString.Description, currentdata.description)
                            })
                        })
                    this.props.history.push('/chat')
                }
            }).catch(function (error) {
                this.setState({
                    error: "Error logining in"
                })
            })

    }
    render() {

        return (
            <Grid container component="main">
                <CssBaseline />
                <Grid item xs={1} sm={4} md={7} className="image">
                    <div className="image1"></div>
                </Grid>
                <Grid item xs={12} sm={8} md={8} elevation={6} square>
                    <Card >
                        <div>
                            <Avatar>
                                <LockOutlinedIcon width="50px" height="50px" />
                            </Avatar>
                        </div>
                        <div>
                            <Typography component="h1" variant="h5"
                                Sign in
                                To
                            />
                        </div>
                        <Link to="/">
                            <button class="btn">
                                <i class="fa fa-home"></i>
                                Webchat
                            </button>
                        </Link>
                    </Card>
                    <div>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextFeild
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                onChange={this.handleChange}
                                value={this.state.email} />

                            <TextFeild
                                variant="outlined"
                                name="password"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="password"
                                type="password"
                                autoComplete="current-passowrd"
                                autoFocus
                                onChange={this.handleChange}
                                value={this.state.password} />

                            <FormControlLabel
                                control={<Checkbox
                                    value="remember"
                                    color="primary" />}

                                label="Remember me" />

                            <Typography component="h6" variant="h5">
                                {this.state.error ? (
                                    <p className="text-danger">{this.state.error}</p>
                                ) : null}
                            </Typography>
                            <div className="CenterAligningItems">
                                <button class="button1" type="submit">
                                    <span>Login</span>
                                </button>
                            </div>

                            <div className="CenterAligningItems">
                                <p>Don't have an account</p>
                                <Link to="/signup" variant="body2">Sign up</Link>
                            </div>
                        </form>

                    </div>
                </Grid>
            </Grid>
        )
    }
}