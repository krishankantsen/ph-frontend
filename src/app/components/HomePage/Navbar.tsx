"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Navbar = () => {
  const router = useRouter();
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("token");
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "50px",
        position: "fixed",
        // border:"0.5px solid grey",
        bgcolor:"white",
        width:"100vw",
        zIndex: 1000,
        p:2
      }}
      style={{ minHeight: "48px" }}
    >
      <Typography
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        fontWeight="700"
        fontFamily="Rubik,sans-serif"
                style={{
          cursor: "pointer",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => {
          if (localStorage.getItem("token")) {
            router.push("/userHome");
            router.refresh();
          } else {
            router.push("/");
            router.refresh();
          }
        }}
      >
        Pulse <Typography fontWeight="700" style={{
          cursor: "pointer",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          color: "#8b54c4",
        }} fontSize="clamp(1rem, 2rem, 2.25rem)"
       >Hub</Typography>
      </Typography>
      {isLoggedIn ? (
        <Stack direction="row" spacing={2}>
          <Typography
            fontFamily={"Rubik,sans-serif"}
            variant="h6"
            fontWeight={"700"}
            sx={{
              cursor: "pointer",
              color:"#545454",
              "&:hover": { color: "#8b54c4", transform: "scale(1.05)" },
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onClick={() => {
              router.push("/profile");
              router.refresh();
            }}
          >
            <AccountCircleIcon />
            Profile
          </Typography>
          <Typography
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
              router.refresh();
              toast.success("Logout Successfully", {
                duration: 1000,
              });
            }}
            fontWeight="bold"
            variant="h6"
            fontFamily={"Rubik,sans-serif"}
            sx={{
              cursor: "pointer",
              "&:hover": { color: "#8b54c4", transform: "scale(1.05)" },
              display: "flex",
              flexDirection: "row",
              color:"#545454",
              alignItems: "center",
            }}
          >
            <LogoutIcon />
            Logout
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography
            onClick={() => {
              router.push("/signin");
            }}
            fontFamily={"Rubik,sans-serif"}
            variant="h6"
            fontWeight={"700"}
            sx={{
              cursor: "pointer",
              color:"#545454",
              "&:hover": { color: "#8b54c4", transform: "scale(1.05)" },
            }}
          >
            SignIn
          </Typography>
          <Typography
            alignItems={"center"}
            onClick={() => {
              router.push("/signup");
            }}
            sx={{
              cursor: "pointer",
              color:"#545454",
              "&:hover": { color: "#8b54c4", transform: "scale(1.05)" },
            }}
            fontFamily={"Rubik,sans-serif"}
            variant="h6"
            fontWeight={"700"}
          >
            SignUp
          </Typography>
        </Stack>
      )}
    </Toolbar>
  );
};
