import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Container,
} from "@mui/material";
import { saveUser } from "../utils/storage";
import {
  validatePassword,
  validateEmail,
  validateName,
} from "../utils/validation";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const countriesWithCities = {
  Egypt: ["Cairo", "Alexandria", "Giza", "Ismailia"],
  Spain: ["Madrid", "Barcelona", "Sevillia"],
  France: ["Paris", "Lyon", "Marseille"],
  England: ["London", "Manchester", "Liverpool"],
  Germany: ["Berlin", "Munchin", "Frankfurt"],
};

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (submitted) validateField(name, value);
  };

  useEffect(() => {
    if (form.country) {
      setCities(countriesWithCities[form.country]);
    } else {
      setCities([]);
    }
  }, [form.country]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstname":
      case "lastname":
        if (!validateName(value)) {
          error = "Must be more than 3 characters and contain no numbers.";
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          error = "Invalid email.";
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          error = "Must include at least 6 characters and a special character.";
        }
        break;
      case "country":
        if (!value) {
          error = "Country is required.";
        }
        break;
      case "city":
        if (!value) {
          error = "City is required.";
        }
        break;
      case "gender":
        if (!value) {
          error = "Gender is required.";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let formIsValid = true;
    const newErrors = {};

    Object.keys(form).forEach((name) => {
      validateField(name, form[name]);
      if (form[name] === "" || errors[name]) {
        formIsValid = false;
        if (!errors[name]) {
          newErrors[name] = "This field is required";
        }
      }
    });

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    if (formIsValid) {
      saveUser(form);
      console.log("Form submitted Succesfully", form);
      navigate("/login", { replace: true });
    } else {
      console.log("Form Failed");
    }
  };

  return (
    <Container maxWidth="sm">
      {/* <Navbar /> */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Firstname"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.firstname}
          helperText={errors.firstname}
        />
        <TextField
          label="Lastname"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.lastname}
          helperText={errors.lastname}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={
            errors.password ||
            "Must include at least 6 characters and a special character"
          }
        />
        <FormControl
          component="fieldset"
          margin="normal"
          fullWidth
          error={!!errors.gender}
        >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="gender"
            value={form.gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
          {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.country}>
          <InputLabel>Country</InputLabel>
          <Select name="country" value={form.country} onChange={handleChange}>
            {Object.keys(countriesWithCities).map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
          {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
        </FormControl>
        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.city}
          disabled={!form.country}
        >
          <InputLabel>City</InputLabel>
          <Select
            name="city"
            value={form.city}
            onChange={handleChange}
            disabled={!form.country}
          >
            {cities.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
          {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
        </FormControl>
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
