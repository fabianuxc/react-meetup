import { useFetch } from "./../../util-hooks/useFetch";
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { useState } from "react";
import { useFavourites } from "../../providers/favourites-context/favourites-context-provider";

export default function MeetupItem({ data: item }) {
  const { addFavourite, removeFavourite, isFavourited } = useFavourites();

  const handlerFavourite = () => {
    if (isFavourited(item.id)) {
      removeFavourite(item.id);
    } else {
      addFavourite(item);
    }
  };

  return (
    <li className={classes.item} data-test="meet-up-item">
      <Card>
        <div className={classes.image}>
          <img src={item.image} alt={item.title} />
        </div>
        <div className={classes.content}>
          <h3>{item.title}</h3>
          <address>{item.address}</address>
          <p>{item.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={handlerFavourite}>
            {isFavourited(item.id)
              ? "Remove from favorites"
              : "Add to favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}
