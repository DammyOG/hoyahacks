import React from "react";
import SpotlightCreator from "./spotlightcreator";

const Spotlight = () => {
  const categories = [
    {
      title: "Spotlight",
      cards: [
        {
          title: "King",
          content:
            "This project does things. Things are important. Things inspire.",
          img: "/images/laptop.jpg",
        },
        {
          title: "Queen",
          content:
            "This project does things. Things are important. Things inspire.",
          img: "/images/tree.jpg",
        },
        {
          title: "Prince",
          content:
            "This project does things. Things are important. Things inspire.",
          img: "/images/tech.jpeg",
        },
        {
          title: "Princess",
          content:
            "This project does things. Things are important. Things inspire.",
          img: "/images/techcity.jpg",
        },
      ],
    },
    {
      title: "Mobile App Development",
      cards: [
        {
          title: "App1",
          content:
            "This project does things. Things are important. Things inspire.",
          img: "/images/laptop.jpg",
        },
        {
          title: "App2",
          content:
            "Mobile Dev: This project does things. Things are important. Things inspire.",
          img: "/images/tech.jpeg",
        },
        {
          title: "App3",
          content:
            "This project does things. Things are important. Things inspire.",
          img: "/images/laptop.jpg",
        },
      ],
    },
    {
      title: "Web Development",
      cards: [
        {
          title: "Web1",
          content:
            "Web Dev: This project does things. Things are important. Things inspire.",
          img: "/images/tree.jpg",
        },
        {
          title: "Web2",
          content:
            "This project does things. Things are important. Things inspire.",
          img: "/images/laptop.jpg",
        },
      ],
    },
  ];

  return <SpotlightCreator categories={categories} />;
};

export default Spotlight;
