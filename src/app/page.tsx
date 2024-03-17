"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  if (token) {
    return router.push("/userHome");
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: ["100%", "100vw", "100vw"],
        height: ["100%", "97vh", "97vh"],
        flexDirection: ["column", "row", "row"],
      }}
    >
      <Box
        sx={{
          justifyContent: ["", "", "center"],
          display: "flex",
          width: ["100%", "100%", "100%"],
          height: ["100%", "100%", "100%"],
        }}
      >
        <Stack spacing={1} sx={{ mt: [10, 24, 24], zIndex: 1000, ml: 1 }}>
          <Typography
            variant="h3"
            fontFamily={"Rubik,sans-serif"}
            color={"#8b54c4"}
            sx={{
              "@media (max-width:600px)": {
                fontSize: "2rem",
              },
              textAlign:"center"
            }}
          >
            Welcome To
          </Typography>
          <Stack direction="row" spacing={0}>
            <Typography
              variant="h1"
              fontFamily={"Rubik,sans-serif"}
              fontWeight="bolder"
              sx={{
                "@media (max-width:600px)": {
                  fontSize: "4rem",
                },
              }}
            >
              Pulse
            </Typography>
            <Typography
              variant="h1"
              fontWeight="bolder"
              fontFamily={"Rubik,sans-serif"}
              color={"#8b54c4"}
              sx={{
                "@media (max-width:600px)": {
                  fontSize: "4rem",
                },
              }}
            >
              Hub
            </Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              fontSize: "16px",
              mb: 2,
              fontWeight: "bold",
              background:
                "#8b54c4",
              alignSelf: "center",
              borderRadius: "14px",
              "&:hover": { bgcolor: "#8b54c4", transform: "scale(1.05)" },
            }}
            onClick={() => {
              router.push("/signup");
            }}
          >
            Join Now
          </Button>
        </Stack>
      </Box>
      {/* <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: ["50%", "100%", "100%"],
            width:["100%","50%","50%"]
          }}
        >
          <Image
            src={img}
            priority={true}
            alt="home-picture"
            style={{ width: "100%", height: "100vh" }}
          ></Image>
        </Box> */}
    </Box>
  );
}
