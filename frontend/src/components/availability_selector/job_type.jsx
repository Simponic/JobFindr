import { Row, Col } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const JobType = ({ jobType, onSelected, selected, icon}) => {
  let CurrIcon = icon;
  return (
    <Col xs={12} md={6} onClick={onSelected} style={{ cursor: 'pointer' }}>
      <Row style={{ margin: '8px', borderRadius: '4px', border: `1px solid ${(selected ? 'green' : 'red')}` }}>
        <Col md={4} style={{ fontSize : '24px', textAlign: 'center' }}>
          {selected ? <FaCheckCircle /> : <FaTimesCircle />}
        </Col>
        <Col md={8}>
          {jobType.job_type}
          <br />
          <CurrIcon />
        </Col>
      </Row>
    </Col>
  );
};
