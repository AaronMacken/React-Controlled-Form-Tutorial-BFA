import React from "react";
import "./App.css";

import { send } from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const INITIAL_STATE = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  message: "",
  firstNameEmptyBlur: false,
  lastNameEmptyBlur: false,
  emailEmptyBlur: false,
  messageEmptyBlur: false,
  error: false
};

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = INITIAL_STATE
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleBlur = e => {
    if (e.target.value.length === 0) {
      this.setState({ [`${e.target.name}EmptyBlur`]: true })
    } else {
      this.setState({ [`${e.target.name}EmptyBlur`]: false })
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    if (!this.isInputValid()) {
      return;
    }

    send(
      'service_un2jval',
      'template_u9egv7q',
      {
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        email: this.state.email,
        message: this.state.message
      },
      'user_sXpRkJBScmWGiZNwlv2il'
    )
    .then(response => {
      console.log('success', response.status, response.text);
      this.successToast();
      this.setState(INITIAL_STATE);
    })
    .catch(err => {
      console.log('failed!', err);
      this.errorToast();
    })

  }

  isInputValid = () => {
    if (
      this.state.firstName === ""
      || this.state.lastName === ""
      || this.state.email === "" 
      || this.state.message === ""
    ) {
      this.setState({ error: true });

      return false;
    }

    return true;
  }

  renderError = () => {
    return this.state.error ? <label className="error">ya dun goof'd</label> : null
  }

  successToast = () => toast("Thanks for reaching out! We will be in contact soon");
  errorToast = () => toast.error("Something went wrong! Please try again later!")

  render() {
    return (
      <>
        <ToastContainer />
        <div className="app">

          <div className="contactText">
            <h1>Drop us a line!</h1>
            <p>
              Interested in our products or services?
              Send us a message and we will get back to you soon!
            </p>
          </div>

          <form className="form" onSubmit={this.handleSubmit}>

            { this.renderError() }

            <label className="label">First Name</label>
            <input
              className={ this.state.firstNameEmptyBlur ? "inputError" : "input" }
              type="text"
              name="firstName"
              value={this.state.firstName}
              onBlur={this.handleBlur}
              onChange={this.handleInputChange}
            />

            <label className="label">Middle Name</label>
            <input
              className="input"
              type="text"
              name="middleName"
              value={this.state.middleName}
              onChange={this.handleInputChange}
            />

            <label className="label">Last Name</label>
            <input
              className={ this.state.lastNameEmptyBlur ? "inputError" : "input" }
              type="text"
              name="lastName"
              value={this.state.lastName}
              onBlur={this.handleBlur}
              onChange={this.handleInputChange}
            />

            <label className="label">Email</label>
            <input 
              className={ this.state.emailEmptyBlur ? "inputError" : "input" }
              type="email" 
              name="email"
              value={this.state.email}
              onBlur={this.handleBlur}
              onChange={this.handleInputChange}
            />

            <label className="label">Message</label>
            <textarea 
              className={ this.state.messageEmptyBlur ? "inputError" : "input" }
              name="message"
              value={this.state.message}
              onBlur={this.handleBlur}
              onChange={this.handleInputChange}
            />
            
            <button className="submitBtn">Send Message</button>
          </form>

        </div>
      </>
    );
  }
}

export default App;
