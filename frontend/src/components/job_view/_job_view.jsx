import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { APIUserContext } from "../../services/api";
import { AuthContext } from '../../services/auth';
import { MapContainer } from "../maps/_map_container";
import moment from 'moment';
import toast from 'react-hot-toast';
import { UserCard } from '../user_card/_user_card';

export const JobView = () => {
  const { id } = useParams();  
  const api = useContext(APIUserContext);
  const auth = useContext(AuthContext);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);

  let CurrIcon = null;
  const icons = require('react-icons/gi');
  const getIcon = (iconName) => {
    CurrIcon = icons[iconName]; 
  }

  const fetchJob = async () => {
    const res = await api.get(`/api/jobs/${id}`);
    if (res.success) {
      setResult(res);
      setLoading(false);
    } else if (res.message) {
      toast.error(res.message);
    }
  }

  useEffect(() => {
    fetchJob();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Row className="mt-5">
        {auth.user.role === "owner" || result?.job?.user_id == auth.user.id ? <Link to={`/job/${result.job.id}/edit`}>Edit</Link> : null}
        <Col lg={4}>
          <h3>Job Details</h3>
          <ul>
            <li>
              Job type: {result?.job?.job_type.job_type} 
              <br />
              {getIcon(result?.job?.job_type.icon)}
              <CurrIcon className="list-icons" />
            </li>
            <li>
              {result?.job?.address ? `Address: ${result?.job?.address}` : `Location: ${result?.job?.coords.lat}, ${result?.job?.coords.lng}`}
            </li>
            <li>
              Price: ${result?.job?.price.toFixed(2)}
            </li>
            {
              auth.user && auth.user.role === 'worker' ?
                <li>
                  Compensation: ${result?.job?.compensation.toFixed(2)}
                </li>
                : null
            }
            <li>
              Available to complete: {moment(result?.job?.start_time*1000).format('M/D/Y H:mm')} - {moment(result?.job?.end_time*1000).format('M/D/Y H:mm')}
            </li>
            <li>
              Time estimate: {result?.job?.time_estimate} hours
            </li>
            <li>
              Extra notes: {result?.job?.comment}
            </li>
            <li>
              Status: {result?.job?.status}
            </li>
            {
              result?.job?.status === "assigned" && result?.job_time ?
              <li>
                <strong>Scheduled: {moment(result?.job_time?.start_time*1000).format('M/D/Y H:mm')} - {moment(result?.job_time?.end_time*1000).format('M/D/Y h:mm')}</strong>
              </li>
              : null
            }
          </ul>
        </Col>

        <Col lg={4}>
          <h3>Location</h3>
          <MapContainer spec={{
            style: {
              'height': '300px',
              'width': '100%'
            },
            coords: [result?.job?.coords],
            center: result?.job?.coords,
            zoom: 15,
          }} />
        </Col>

        <Col lg={4}>
          <h3>People</h3>
          <div>
          {
            result?.customer ?
            <UserCard showContact={true} user={result?.customer} />
            : null
          }
          </div>
          <br />
          <div>
          {
            result?.worker ?
            <UserCard showContact={true} user={result?.worker} />
            : null
          }
          </div>
        </Col>
      </Row>
    </>
  )
}