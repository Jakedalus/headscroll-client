import React, { Component } from 'react';


export default class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      profileImage: ''
    };

    this.fileInput = React.createRef();
  }

  componentDidMount() {
    this.props.removeError();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? 'signup' : 'signin';

    if (authType === 'signup') {
      console.log('handleSubmit, file uploaded:', this.fileInput.current.files[0].name);

      var formData = new FormData();  // multer on server expecting FormData
      formData.append(`profileImage`, this.fileInput.current.files[0]);
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      formData.append('username', this.state.username);
      // formData.append('test', 'test');

      console.log('handleSubmit, formData:', formData, formData.entries());
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1])
      }

      console.log('handleSubmit, this.state:', this.state);

      this.props.onAuth(authType, formData)
        .then(() => this.props.history.push('/'))
        .catch(() => {
          return;
        });
    }

    this.props.onAuth(authType, this.state)
      .then(() => this.props.history.push('/'))
      .catch(() => {
        return;
      });
  }

  render() {
    console.log('AuthForm, state, props:', this.state, this.props);
    const { email, username, password, profileImage } = this.state;
    const { heading, buttonText, signUp, errors, history, removeError } = this.props;

    history.listen(() => {
      removeError();
    });

    // console.log('AuthForm:', this.state, this.props);

    return (
      <div className="container">
        <form className="auth-form" onSubmit={this.handleSubmit} enctype="multipart/form-data">
          <h2>{heading}</h2>

          {errors.message && <div className="alert alert-danger">{errors.message}</div>}

          <div className="auth-form__input">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              className="form-control"
              id="email"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>

          <div className="auth-form__input">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="form-control"
              id="password"
              name="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>

          {
            signUp && (
              <div className="auth-form__input">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                />
              </div>
            )
          } 
          {
            signUp && (
              <div className="auth-form__input">
                <label htmlFor="profileImage">Upload a Profile Image</label>
                <input 
                  type="file" 
                  className="form-control"
                  name="profileImage" 
                  id="profileImage" 
                  accept="image/*"
                  ref={this.fileInput}
                />
              </div>
            )
          }

          
 

          <button type="submit" className="btn btn-primary btn-lg">
            {buttonText}
          </button>

        </form>
      </div>
    );
  }
}