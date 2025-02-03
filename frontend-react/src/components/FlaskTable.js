import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

function FlaskTable() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/socials")
      .then((response) => {
        setSocials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching socials:", error);
      });
  }, []);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/members")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }, []);

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/collections")
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
      });
  }, []);

  return (
    <div>
      <h1>Socials List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Social ID</th>
            <th>Instagram</th>
            <th>Facebook</th>
            <th>Website</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {socials.map((social) => (
            <tr key={social.social_id}>
              <td>{social.social_id}</td>
              <td>{social.instagram}</td>
              <td>{social.facebook}</td>
              <td>{social.website}</td>
              <td>{social.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Members List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Social ID</th>
            <th>Minor ID</th>
            <th>Major ID</th>
            <th>Name</th>
            <th>Year</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.member_id}>
              <td>{member.member_id}</td>
              <td>{member.social_id}</td>
              <td>{member.minor_id}</td>
              <td>{member.major_id}</td>
              <td>{member.member_name}</td>
              <td>{member.member_year}</td>
              <td>{member.member_age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Collections List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr key={collection.collection_id}>
              <td>{collection.collection_id}</td>
              <td>{collection.collection_name}</td>
              <td>{collection.collection_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlaskTable;