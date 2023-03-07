import { useState } from "react";
import { useQuery } from "react-query";
import Character from "./Character";
const Characters = () => {
  const [page, setPage] = useState(1);
  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return response.json();
  };
  const { data, status, isPreviousData, isLoading, isError } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );
  if (isLoading) {
    return <div>loading</div>;
  }
  // if (status === "error") or
  if (isError) {
    return <div>error</div>;
  }
  return (
    <div className="characters">
      {data.results.map((character) => (
        <Character character={character} key={character.id} />
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>
          Previous
        </button>
        <button
          disabled={isPreviousData && !data.info.next}
          onClick={() => setPage((old) => old + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Characters;
