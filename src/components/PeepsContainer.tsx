import React, { useEffect, useState } from "react";
import axios from "axios";
import NewPeepForm from "./NewPeepForm";
import PeepsList from "./PeepsList";

const PeepsContainer: React.FC = () => {
  const [peeps, setPeeps] = useState<string[]>([]);

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

  const onNewPeep = () => {
    console.log("new peep");
  };

  return (
    <div>
      <NewPeepForm newPeepCallback={onNewPeep} />
      <PeepsList peeps={peeps} />
    </div>
  );
};

export default PeepsContainer;
