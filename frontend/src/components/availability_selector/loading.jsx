import toast from 'react-hot-toast';
import { APIUserContext } from "../../services/api";
import { AuthContext } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const LoadingAvailability = () => {
  const api = useContext(APIUserContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const redir = async () => {
    try {
      api.get(`/api/user/${auth.user.id}`).then(r => {
        const workerId = r.worker.id;
        navigate(`/worker/${workerId}/availability`);
        toast.success('Sign up successful. Please enter availability.');
      });
    }
    catch {
      toast.error("Something went wrong, please try again.")
    }
  }
  redir();

  return <div>Loading...</div>
}