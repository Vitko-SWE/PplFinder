import React,  { useState, useEffect } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";

const Favorites = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([])

    useEffect (() => {
        setUsers(fetchFavoriteUsers)
    }, [])


    /**
     * This function fetches all favorite users
     * from local storage.
     * 
     * @returns {Array} Array of user objects
     */
    const fetchFavoriteUsers = () => {
        const saved = localStorage.getItem("favoriteUsers");
        const fetchedFavoriteUsers = JSON.parse(saved);
        setIsLoading(false);
        return fetchedFavoriteUsers || [];
    }
 
    return (
        <S.Home>
        <S.Content>
            <S.Header>
            <Text size="64px" bold>
                PplFinder Favorites
            </Text>
            </S.Header>
            <UserList users={users} isLoading={isLoading} isFavorites={true} />
        </S.Content>
        </S.Home>
    );
};

export default Favorites;