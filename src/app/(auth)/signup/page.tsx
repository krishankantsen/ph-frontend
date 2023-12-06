"use client";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const theme = createTheme();
/* eslint-disable */
const emailrex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const passrex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailrex.test(email)) {
      alert("Enter Valid Email");
      return;
    } else if (!passrex.test(password)) {
      alert(
        "Password should be 8 characters long and must contain Uppercase, Lowercase, Number, and Special Character"
      );
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // sending data to backend
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      } else {
        alert(data.success);
      }

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Error during form submission:", error);
      // Handle error as needed
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            mb:1,
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            p: 5,
            borderRadius: "16px",
            backgroundColor: "white",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Welcome to PulseHub
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            textAlign="center"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
          <Typography>
            Have an Account ?{" "}
            <span
              onClick={() => {
                router.push("/signin");
              }}
              style={{
                cursor: "pointer",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              SignIn
            </span>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
