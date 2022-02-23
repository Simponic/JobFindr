import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { APIUserContext } from "../../services/api";

export const AvailabilitySelector = () => {
  const api = useContext(APIUserContext);
  const { id } = useParams();
  
  const updateAvailability = async () => {
    const res = await api.post(`/api/worker/${id}/availabilities`, {
      a: 2
    })
    console.log(res);
  }

  return <div><button onClick={updateAvailability}>Update Me!</button></div>
}
