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

      var formData = new FormData();
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
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
              <h2>{heading}</h2>

              {errors.message && <div className="alert alert-danger">{errors.message}</div>}

              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                value={email}
              />

              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                value={password}
              />

              {
                signUp && (
                <div>
                  <label htmlFor="username">Username</label>
                  <input 
                    type="text" 
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                  />

                  <label htmlFor="profileImage">Profile Image URL</label>
                  <input 
                    type="file" 
                    className="form-control"
                    name="profileImage" 
                    id="profileImage" 
                    accept="image/*"
                    ref={this.fileInput}
                  />
                  {/* <input 
                    type="text" 
                    className="form-control"
                    id="profileImage"
                    name="profileImage"
                    onChange={this.handleChange}
                    value={profileImage}
                  /> */}
                </div>
                )
              }

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                {buttonText}
              </button>

            </form>
          </div>
        </div>
      </div>
    );
  }
}