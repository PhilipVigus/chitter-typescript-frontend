import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type IPeep = {
  username: string;
  text: string;
  timeCreated: string;
};

const Peep: React.FC = () => {
  const { id } = useParams();
  const [peep, setPeep] = useState<IPeep>();

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const fetchPeep = async () => {
      axios
        .get(`http://localhost:5000/peeps/${id}`, {
          cancelToken: source.token,
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
        .then((result) => {
          setPeep(result.data);
        })
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.log("Peep get request cancelled");
          } else {
            console.log("Error getting peep");
          }
        });
    };

    fetchPeep();

    return () => {
      source.cancel("Peep get request cancelled");
    };
  }, [id]);

  const getTimeCreatedString = () => {
    if (peep) {
      const date = new Date(peep?.timeCreated);
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
    } else {
      return "";
    }
  };

  return (
    <div>
      <h2>Individual peep</h2>
      {`${peep?.username} - ${peep?.text} - ${getTimeCreatedString()}`}
    </div>
  );
};

export default Peep;
