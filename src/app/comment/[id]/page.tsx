"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../../api/api";

export default function Comment({params}) {
  const [post, setPost] = useState(null);

  const [comment, setComment] = useState([]);

  const getPost = async () => {

    await api
      .get("/posts/" + params.id)
      .then((result) => {
        setPost(result.data);
      })
      .catch((err) => {});
  };

  const getComment = async () => {

    await api
      .get("/posts/" + params.id + "/comments")
      .then((result) => {
        setComment(result.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getPost()
    getComment()
  }, []);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComment([...comment, formData]); // Add the new comment to the existing array
    setFormData({ name: "", email: "", body: "" }); // Clear the form

  };

  return <div style={{marginLeft:20, marginTop:20}}>
    <p>{post?.title}</p> <br/>
    <p>{post?.body}</p><br />

    <ul>
        
    {comment.map(v => {
        return (<><div>
            <p>name:{v?.name}</p>
            <p>email: {v?.email}</p>
            <p>body: {v?.body}</p>
        </div><br /><br /></>)
    })}

    </ul>

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="body">Message:</label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>

  </div>;
}
