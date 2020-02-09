import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ setQuery, search }) => <form onSubmit={search}>
    <FormGroup>
        <InputGroup>
            <FormControl type="text" onChange={setQuery} />
            <InputGroup.Button>
                <Button type='submit'>Search</Button>
            </InputGroup.Button>
        </InputGroup>
    </FormGroup>
</form>;

export default SearchBar;
