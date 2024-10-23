import { useFetch } from "./../../util-hooks/useFetch";
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { useState } from "react";

export default function MeetupItem() {
  const { data } = useFetch({
    url: "/data.json",
  });

  const [isFavourited, setIsFavourited] = useState(false);
  const handlerFavourite = () => {
    setIsFavourited((prevState) => !prevState); 
  };

  if (!data) return <p>Loading...</p>;
  let [item] = data;

  return (
    <li className={classes.item} data-test='meet-up-item'>
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
          <button onClick={handlerFavourite}>{isFavourited ? "Remove from favorites" : "Add to favorites"}</button>
        </div>
      </Card>
    </li>
  );
}
