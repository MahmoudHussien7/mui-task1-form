// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { getUser } from "../utils/storage";
import { validatePassword } from "../utils/validation";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registeredUser = getUser();
    if (
      registeredUser &&
      registeredUser.email === form.email &&
      registeredUser.password === form.password
    ) {
      console.log("Logged in successfullly");
    } else {
      console.log("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          helperText="Must include at least 6 characters and a special character"
        />
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
