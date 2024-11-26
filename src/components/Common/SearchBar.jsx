import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SearchIcon } from "../../assets/icon/Icons";

const SearchBar = ({ nodes, setSelectedNode, handleFocusNode }) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResultOpen, setSearchResultOpen] = useState(false);
    const containerRef = useRef(null);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        setSearchResultOpen(true);
    };

    const handleClickOutside = (event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target)
        ) {
            setSearchResultOpen(false);
        }
    };

    const handleClickResult = (node) => {
        setSelectedNode(node);
        setSearchValue("");
        setSearchResultOpen(false);
        handleFocusNode(node);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Container ref={containerRef}>
            <SearchBox>
                <SearchIcon />
                <SearchInput
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleSearch}
                />
            </SearchBox>
            {searchResultOpen &&
                searchValue &&
                nodes
                    .filter((node) => node.text.includes(searchValue))
                    .map((node) => (
                        <ResultBox
                            key={node.id}
                            onClick={() => {
                                handleClickResult(node);
                            }}
                        >
                            {node.text}
                        </ResultBox>
                    ))}
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
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 14px;

    width: 100%;
    max-width: 441.87px;

    input,
    div {
        font-size: ${({ theme }) => theme.fonts.english.semiBold.size};
        font-weight: ${({ theme }) => theme.fonts.english.semiBold.weight};
        color: #444751;
        line-height: 1.3;
    }
`;

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    width: 100%;
    border-radius: 10px;
    padding: 6.25px 15px;

    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 4px 10.3px rgba(0, 0, 0, 0.07);
    backdrop-filter: blur(5px);
`;

const ResultBox = styled(SearchBox)`
    cursor: pointer;

    &:hover {
        box-shadow: 0px 4px 10.3px rgba(0, 0, 0, 0.2);
    }
`;

const SearchInput = styled.input`
    &::placeholder {
        color: #444751;
    }

    background-color: transparent;
    border: none;
    outline: none;
    text-align: end;

    width: 100%;
`;
