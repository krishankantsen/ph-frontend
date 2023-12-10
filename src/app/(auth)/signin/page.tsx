"use client";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
const theme = createTheme();
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        localStorage.setItem("token", data.token);
        alert(data.success);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            mb: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            p: 5,
            borderRadius: "16px",
            backgroundColor: "white",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            SignIn to you Account
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
              Sign In
            </Button>
          </Box>
          <Typography>
            Dont Have Account ?
            <span
              onClick={() => {
                router.push("/signup");
              }}
              style={{
                cursor: "pointer",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              SignUp
            </span>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignIn;
