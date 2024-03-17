"use client";
import { Box, Typography } from "@mui/material";
import { debounce } from 'lodash';
import { useEffect, useState } from "react";

import CreatePost from "../Post/CreatePost";
import PostCard from "../Post/PostCard";
import ProtectedRoute from "../ProtectedRoute";

type posttype = any;

const PostRender = () => {
  const [posts, setPosts] = useState<posttype[]>([]);
  const [page, setPage] = useState(1);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const [fetchOnMount, setFetchOnMount] = useState(true);

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/getPosts?page=${page}&limit=5`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.length === 0) {
        setNoMorePosts(true);
      } else {
        const shuffledArray = shuffleArray(data);
        setPosts((prevPosts) => [...prevPosts, ...shuffledArray]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debouncedHandleScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Check if the user has scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight - 100 && !noMorePosts) {
      fetchData();
    }
  }, 200);

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
      setFetchOnMount(false);
    }

    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedHandleScroll, fetchOnMount]);

  return (
    <ProtectedRoute>
      <Box
        component="section"
        sx={{
          width: ["100%", "100%", "100%"],
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          justifyContent: "center",
          p: 1,
          gap: 2,
        }}
      >
        <CreatePost></CreatePost>
        {posts.map((post: any, index: number) => (
          <PostCard
            key={post.id || index}
            name={post.postedBy.name}
            profilePic={post.postedBy.profilePic}
            createdAt={post.createdAt}
            body={post.body}
            photo={post.photo}
            likeCount={post.likes.length}
            postId={post._id}
          />
        ))}
        {noMorePosts ? (
          <Typography sx={{ textAlign: "center" }}>No More Post ..</Typography>
        ) : ""}
      </Box>
    </ProtectedRoute>
  );
};

export default PostRender;


