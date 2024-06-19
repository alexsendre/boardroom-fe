import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getTagById } from '../api/tagData';

export default function TagDisplay({ id }) {
  const [tag, setTag] = useState({});

  useEffect(() => {
    getTagById(id).then(setTag);
  }, [id]);

  return (
    <Badge
      className="d-flex justify-content-center"
      id={`tag-${tag.id}`}
    >
      {tag.label}
    </Badge>
  );
}

TagDisplay.propTypes = {
  id: PropTypes.number.isRequired,
};
