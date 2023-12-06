"use client";
import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
export const Navbar = () => {
  const router = useRouter();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "40px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: 3,
        m: 1,
        position: "fixed",

        width: "99%",
        zIndex: 1000,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        style={{ cursor: "pointer" }}
        onClick={() => {
          router.push("/");
          router.refresh();
        }}
      >
        PulseHub
      </Typography>

      {isLoggedIn ? (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/signin");
              router.refresh();
            }}
          >
            Logout
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/signin");
            }}
          >
            SignIn
          </Button>

          <Button
            variant="contained"
            
            onClick={() => {
              router.push("/signup");
            }}
          >
            SignUp
          </Button>
        </Stack>
      )}
    </Toolbar>
  );
};
