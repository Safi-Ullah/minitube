import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

class SearchBar extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.search}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" onChange={this.props.setQuery} />
                        <InputGroup.Button>
                            {/* <Glyphicon glyph="search" /> */}
                            <Button type='submit'>Search</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        );
    }
}

export default SearchBar;