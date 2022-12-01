import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";


const userLogin = ({
  email,
  password
}
) => {
  return fetch("https://reqres.in/api/login", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    })
  }
  )
}

function Login() {
  const [details, setDetails] = useState({
    email: "",
    password: ""
  })

  const { isAuth, token, loginUser, logoutUser } = useContext(AppContext)



  const handleChange = (e) => {

    const { name, value } = e.target
    setDetails(
      {
        ...details,
        [name]: value
      }
    )

  }


  const handleSubmit = (e) => {
    e.preventDefault()
    userLogin({
      "email": details.email,
      "password": details.password
    }).then((res) => res.json()).then((res) => {
      loginUser(res.token)


    }).catch((err) => {
      console.log(err);
    })
    setDetails({
      email: "",
      password: ""
    })
  }

  if (isAuth) {
    return <Navigate to="/dashboard" />
  }
  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="login-form">
        <div>
          <label>
            Email
            <input name="email"
              value={details.email}
              onChange={handleChange}
              data-testid="email-input"
              type="email"
              placeholder="email" />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              name="password"
              value={details.password}
              onChange={handleChange}
              data-testid="password-input"
              type="password"
              placeholder="password"
            />
          </label>
        </div>
        <div>
          <input data-testid="form-submit" type="submit" value="SUBMIT" />
        </div>
      </form>
      <div>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
}
export default Login;
