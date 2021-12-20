import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="mx-auto d-inline-flex">
      <Form.Control
        id="search-box"
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mt-3"
      />
      <Button type="submit" variant="success" id="search-box-btn">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
