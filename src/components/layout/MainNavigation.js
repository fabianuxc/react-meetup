import { Link } from "react-router-dom";
import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./../../utils/constants";

import classes from "./MainNavigation.module.css";

import React, { useState, useEffect } from "react";
import { useFavourites } from "../../providers/favourites-context/favourites-context-provider";

export default function MainNavigation() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { favourites } = useFavourites();

  useEffect(() => {
    const handleHeaderScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleHeaderScroll);

    return () => {
      window.removeEventListener("scroll", handleHeaderScroll);
    };
  }, [lastScrollY]);
  return (
    <header
      className={`${classes.header} ${
        showHeader ? classes.show : classes.hide
      }`}
      data-test="navigation-header"
    >
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/all-meetups">All Meetups</Link>
          </li>

          <li>
            <Link to="/new-meetups">New Meetup</Link>
          </li>
          <li>
            <Link to="/favorites">
              My Favorites <span className={classes.badge}>{favourites.length}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
