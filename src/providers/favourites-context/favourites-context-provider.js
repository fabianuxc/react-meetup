import React, { createContext, useState, useContext, useEffect } from "react";

const FavouritesContext = createContext();

export const useFavourites = () => {
  return useContext(FavouritesContext);
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (meetup) => {
    setFavourites((prev) => [...prev, meetup]);
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((meetup) => meetup.id !== id));
  };

  const isFavourited = (id) => {
    return favourites.some((meetup) => meetup.id === id);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourited,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
