import React, { useEffect, useState } from "react";
import axios from "axios";

const PeepsList: React.FC = () => {
  const [peeps, setPeeps] = useState([]);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const fetchPeeps = async () => {
      axios
        .get("https://localhost:5000/peeps", {
          cancelToken: source.token
        })
        .then((result) => setPeeps(result.data.peeps))
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.log("Peeps get request cancelled");
          } else {
            console.log("Error getting peeps");
          }
        });
    };
    fetchPeeps();

    return () => {
      source.cancel("Peeps get request cancelled");
    };
  }, []);

  return (
    <div>
      <div>Peeps List</div>
      {peeps.map((peep) => {
        return <div key={peep}>{peep}</div>;
      })}
    </div>
  );
};

export default PeepsList;
