import { useState, useEffect } from "react";

export function useStorage() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const storedMeetups = localStorage.getItem("meetups");
    if (storedMeetups) {
      setMeetups(JSON.parse(storedMeetups));
    }
  }, []);

  const addMeetup = (meetup) => {
    const updatedMeetups = [...meetups, meetup];
    setMeetups(updatedMeetups);
    localStorage.setItem("meetups", JSON.stringify(updatedMeetups));
  };

  return {
    meetups,
    addMeetup,
  };
}
