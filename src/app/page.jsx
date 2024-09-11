"use client"
import { useState, useEffect } from "react";
import {  posts } from "../api/post";
import api from "../api/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [post, setPost] = useState([])

  const getPost = async () => {
    await api.get("/posts").then((result) => {
      setPost(result.data)
    }).catch((err) => {
      
    });
  }
  useEffect(() => {
    getPost()
  }, [])

  return (
    <>
    {post?.map((v, i) => {
      return <div style={{marginLeft:20}}><Link href={`/comment/${v?.id}`}>{i+1} - {v.title}</Link> <br/><br></br></div>
    })}
    </>
  );
}
