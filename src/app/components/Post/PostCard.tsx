import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Box,TextField, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function PostCard(props: any) {
  const user =useSelector((state:any)=>state.user.user);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [isLiked, setIsLiked] = useState(false);
  const addLike = async (postId: any) => {
    try {
      const response = await fetch(`http://localhost:5000/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        console.log("Liked");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "94%",
        backgroundColor: "white",
        borderRadius: "16px",
        maxHeight: "70%",
        p: 2,
        gap: 1,
        marginLeft: "12px",
      }}
    >
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            maxHeight: "45px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            src={props.profilePic}
            alt="profile"
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
              marginLeft: "2px",
            }}
          ></Image>
          <Typography sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
            <Typography
               fontFamily={"Rubik,sans-serif"}
               fontWeight={"700"}
               color={"#545454"}
            >
              {props.name}
            </Typography>
            <Typography
              fontSize={"12px"}
              color={"#949292"}
              fontFamily={"Geist Mono, monospace"}
            >
              {formatDistanceToNow(props.createdAt, { addSuffix: true })}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: "60px",
            overflow: "auto",
            minHeight: "20px",
            ml: 1,
          }}
        >
          <Typography fontFamily={"Rubik,sans-serif"}
      >
            {props.body}
          </Typography>
        </Box>
      </Box>
      {props.photo ? (
        <Box
          sx={{
            height: "320px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Image
            src={props.photo}
            alt="post-picture"
            width={0}
            priority
            height={0}
            sizes="100vw"
            style={{
              width: "auto",
              height: "100%",
              borderRadius: "16px",
              boxShadow: "0px 4px 10px rgb(80, 56, 237,0.2)",
            }}
          />
        </Box>
      ) : (
        ""
      )}
      <Box
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            m: "1px",
            flexDirection: "row",
            gap: 2,
            p: "2px",
            paddingBottom: "4px",
          }}
        >
            {isLiked?<FavoriteIcon
            sx={{ cursor: "pointer" }}
            fontSize="medium"
            onClick={() => addLike(props.postId)}/>:<FavoriteBorderRoundedIcon
              sx={{ cursor: "pointer" }}
              fontSize="medium"
              onClick={() => addLike(props.postId)}
            />}

          <CommentIcon fontSize="medium" />
        </Box>
        <Box
          sx={{
            height: "50px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          {user.profilePic && (
            <Image
              src={user.profilePic}
              alt="profile"
              width={40}
              priority
              height={40}
              style={{ borderRadius: "50%" }}
            />
          )}
          <TextField
            size="small"
            type="text"
            sx={{
              width: "100%",
              height: "%",
              borderRadius: "25px",
              fontFamily: "Geist Mono, monospace",
              border: "1px solid grey",
              fontSize: "15px",
              "& fieldset": { border: "none" },
            }}
            placeholder="Write Your Comment"
          />
          <Typography
            sx={{
              cursor: "pointer",
              color: "#8b54c4",
              fontWeight: "bold",
              fontFamily: "Geist Mono, monospace",
            }}
          >
            Post
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
