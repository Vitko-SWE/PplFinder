import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, isFavorites }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [favoriteUsers, setFavoriteUsers] = useState(() => {
      const saved = localStorage.getItem("favoriteUsers");
      const fetchedFavoriteUsers = JSON.parse(saved);
      return fetchedFavoriteUsers || [];
  });

  const [brazil, setBrazil] = useState(false);
  const [australia, setAustralia] = useState(false);
  const [canada, setCanada] = useState(false);
  const [germany, setGermany] = useState(false);
  const [spain, setSpain] = useState(false);

  useEffect(() => {
    localStorage.setItem("favoriteUsers", JSON.stringify(favoriteUsers));
  }, [favoriteUsers]);

  /**
   * This function determines which users to display
   * based on the tab the user is in. If it is the "Favorites"
   * tab it will return only favorite users, else it will
   * return all users.
   * 
   * @returns {Array} Array of user objects
   */
  const currentUsersToDisplay = () => {
      if (isFavorites)
      {
        return favoriteUsers;
      }

      return users;
  }

  /**
   * This function will handle which country filter
   * was chosen and update the value of that country.
   * 
   * @param {String} country - The country that was selected
   */
  const handleCheckBoxClick = (country) => {
    if (country === "BR")
    {
      setBrazil(!brazil);
    }
    else if (country === "AU")
    {
      setAustralia(!australia);
    }
    else if (country === "CA")
    {
      setCanada(!canada);
    }
    else if (country === "DE"){
      setGermany(!germany);
    }
    else {
      
      console.log("spain = " + spain)
      setSpain(!spain);
    }
  }

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  /**
   * This function will handle the click on the heart icon.
   * It will check if the user is already in favorites array,
   * if it is, it will remove it from favorites, else, it will
   * add the user to favorites.
   *  
   * @param {Object} user - The current user that was clicked on 
   */

  const handleIconClick = (user) => {
    var currentUser = favoriteUsers.find(favoriteUser => favoriteUser.login.uuid === user.login.uuid);

    if (currentUser)
    {
      var copyOfFavoriteUsers = [];
      for (let i = 0; i < favoriteUsers.length; i++)
      {
        if (favoriteUsers[i].login.uuid != currentUser.login.uuid)
        {
          copyOfFavoriteUsers.push(favoriteUsers[i]);
        }
      }
      setFavoriteUsers(copyOfFavoriteUsers);
    }
    else{
      setFavoriteUsers(favoriteUsers => [...favoriteUsers, user])
    }
  }

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleCheckBoxClick} />
        <CheckBox value="AU" label="Australia" onChange={handleCheckBoxClick} />
        <CheckBox value="CA" label="Canada" onChange={handleCheckBoxClick} />
        <CheckBox value="DE" label="Germany" onChange={handleCheckBoxClick} />
        <CheckBox value="ESP" label="Spain" onChange={handleCheckBoxClick} />
      </S.Filters>
      <S.List>
        {currentUsersToDisplay().filter(user => (user.location.country === "Brazil" && brazil) ||
                                                (user.location.country === "Australia" && australia) ||
                                                (user.location.country === "Canada" && canada) ||
                                                (user.location.country === "Germany" && germany) ||
                                                (user.location.country === "Spain" && spain) ||
                                                (!brazil && !australia && !canada && !germany && !spain))
                                .map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId || favoriteUsers.find(favoriteUser => favoriteUser.login.uuid === user.login.uuid)}>
                <IconButton onClick={() => handleIconClick(user)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
