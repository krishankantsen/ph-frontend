"use client";
import { Send } from "@mui/icons-material";
import { Box, Button, Input, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from "sonner";

import img from "../images/imgicon.jpg"
import ProtectedRoute from "../ProtectedRoute";

export default function CreatePost() {
  const user = useSelector((state:any) => state.user.user);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [body, setbody] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showImage, setShowImage] = useState("");

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setShowImage(result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = async () => {
    const formData = new FormData();
    let finalData: any;
    let picture: any;
    if (selectedImage) {
      formData.append("file", selectedImage);
      formData.append("upload_preset", "pulsehub");
      formData.append("cloud_name", "pulsehubcloud");
      try {
        const cloudResponse = await fetch(
          "https://api.cloudinary.com/v1_1/pulsehubcloud/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        finalData = await cloudResponse.json();
        picture = finalData.url;
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const response = await fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body, picture }),
      });
      const data = await response.json();
      if (data.error)
        return toast.error(data.error, {
          duration: 1000,
        });
      else
        toast.success(data.message, {
          duration: 1000,
        });
      setbody("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "94%",
          backgroundColor: "white",
          borderRadius: "16px",
          height: "20%",
          p: 1,
          marginLeft: "12px",
        }}
      >
        <Box
          maxWidth={"100%"}
          sx={{
            display: "flex",
            flexDirection: "row",
            maxHeight: "50%",
            borderRadius: "16px",
            alignItems: "center",
            gap: 2,
          }}
        >
          {user?.profilePic && (
            <Image
              src={user.profilePic}
              alt="profile"
              width={45}
              height={45}
              style={{ borderRadius: "50%" }}
            />
          )}
          <TextField
            type="text"
            size="small"
            value={body}
            onChange={(e) => setbody(e.target.value)}
            sx={{
              width: "85%",
              height: "80%",
              margin: "10px",
              borderRadius: "25px",
              border:"1px solid grey",
              fontFamily: "Geist Mono, monospace",

              "& fieldset": { border: "none" },
            }}
            placeholder="Write Your Thoughts........"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderRadius: "16px",
            alignItems: "center",
            height: "50%",
            justifyContent: "space-between",
          }}
        >
          <Button
            component="label"
            sx={{
              color:"#545454",
              gap: 1,
              fontWeight: "bold",
              fontFamily: "Geist Mono, monospace",
            }}
          >
            <Image src={img} width={25} height={25} alt="imglogo"></Image>
            <Input
              type="file"
              onChange={handleImageChange}
              sx={{ display: "none", }}
            />
            Image
          </Button>
          {selectedImage && (
            <Image
              src={showImage}
              alt="post-picture"
              width={150}
              height={150}
              style={{ borderRadius: "16px" }}
            ></Image>
          )}

          <Button
            variant="contained"
            startIcon={<Send />}
            sx={{
              mr: 2,
                color: "#FFFFFF",
                backgroundColor:  "#9968cc",
                borderRadius: "3rem",
                "&:hover": { bgcolor: "#8b54c4", transform: "scale(1.01)" },
            }}
            onClick={handleAddPost}
          >
            POST
          </Button>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
