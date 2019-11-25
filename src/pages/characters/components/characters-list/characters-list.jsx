import React, { Component } from 'react';
import './characters-list.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppActions from '../../../../redux/actions/AppActions';
import CharactersActions from '../../redux/actions/characters.actions';

class CharactersList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.changeTitle('Characters list');
    }

    componentDidMount() {
        this.props.findCharacters();
    }

    selectCharacter = id => ev => {
        this.props.history.push(`/${id}`);
    }

    render() {
        return(
            <div className="row no-margin-row">
                {this.props.charactersList && this.props.charactersList.map((character, pos) => {
                    return(
                        <div key={pos} className="col-xl-3 col-lg-4 col-md-6 d-flex align-items-center justify-content-center" style={{marginTop: "40px"}}>
                            <div className="card border-dark" onClick={this.selectCharacter(pos + 1)} style={{width: "18rem"}}>
                                <div className="card-header">{character.name}</div>
                                <div className="card-body text-dark d-flex flex-column">
                                    <p className="card-text"><strong>Birth year: </strong> {character.birth_year}</p>
                                    <p className="card-text"><strong>Gender: </strong> {character.gender}</p>
                                    <p className="card-text"><strong>Eye color: </strong> {character.eye_color}</p>
                                    <p className="card-text"><strong>Height: </strong> {character.height}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

function selectState(state) {
    return {
        charactersList: state.characters.charactersList
    };
}

export default connect(
    selectState,
    dispatch => ({
        changeTitle: (title) => AppActions.changeTitle(title)(dispatch),
        findCharacters: () => CharactersActions.findCharacters()(dispatch),
    })
)(withRouter(CharactersList));