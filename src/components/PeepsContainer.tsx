import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import NewPeepForm from "./NewPeepForm";
import PeepsList from "./PeepsList";
import { PeepSummaryProps } from "./PeepSummary";
import { UserContext } from "../contexts/UserContext";

const PeepsContainer: React.FC = () => {
  const [peeps, setPeeps] = useState<PeepSummaryProps[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
  const [userState] = useContext(UserContext);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const fetchPeeps = async () => {
      axios
        .get("http://localhost:5000/peeps", {
          cancelToken: source.token,
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
        .then((result) => {
          setPeeps(result.data.peeps);
        })
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
  }, [lastUpdateTime]);

  const onNewPeep = () => {
    setLastUpdateTime(Date.now());
  };

  return (
    <div>
      {userState.name}
      <NewPeepForm newPeepCallback={onNewPeep} />
      <PeepsList peeps={peeps} />
    </div>
  );
};

export default PeepsContainer;
