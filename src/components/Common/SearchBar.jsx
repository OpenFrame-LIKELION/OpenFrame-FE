import { useState } from "react";
import styled from "styled-components";
import { SearchIcon } from "../../assets/icon/Icons";

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <Container>
            <SearchIcon />
            <SearchInput
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleSearch}
            />
        </Container>
    );
};

export default SearchBar;

const Container = styled.div`
    position: absolute;
    left: calc(50%);
    transform: translateX(-50%);
    z-index: 10;
    top: 45px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    width: 100%;
    max-width: 421.87px;
    height: 30px;
    border-radius: 10px;
    padding: 0px 15px;

    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 4px 10.3px rgba(0, 0, 0, 0.07);
    backdrop-filter: blur(5px);
`;

const SearchInput = styled.input`
    font-size: ${({ theme }) => theme.fonts.english.semiBold.size};
    font-weight: ${({ theme }) => theme.fonts.english.semiBold.weight};
    color: #444751;
    line-height: 1.3;
    letter-spacing: ${({ theme }) =>
        theme.fonts.english.semiBold.letterSpacing};

    &::placeholder {
        color: #444751;
    }

    background-color: transparent;
    border: none;
    outline: none;
    text-align: end;

    width: 100%;
`;
