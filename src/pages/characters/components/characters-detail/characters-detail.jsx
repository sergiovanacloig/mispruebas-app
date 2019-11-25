import React, { Component } from 'react';
import './characters-detail.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppActions from '../../../../redux/actions/AppActions';
import CharactersActions from '../../redux/actions/characters.actions';

class CharactersDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.changeTitle('Character detail');
    }

    componentDidMount() {
        this.props.findCharacter(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearCharacterDetail();
    }

    render() {
        const character = this.props.characterDetail;
        return (
            <div>
                {character ?
                    (
                        <div className="content">
                            <h3 className="pl-1">{character.name}</h3>
                            <div className="divider"></div>
                            <div className="mt-4 pl-4">
                                <p className="card-text"><strong>Birth year: </strong> {character.birth_year}</p>
                                <p className="card-text"><strong>Gender: </strong> {character.gender}</p>
                                <p className="card-text"><strong>Eye color: </strong> {character.eye_color}</p>
                                <p className="card-text"><strong>Height: </strong> {character.height}</p>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="w-100 mt-4 d-flex align-items-center justify-content-center">
                            <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )
                } 
            </div>
        );
    }
}

function selectState(state) {
    return {
        characterDetail: state.characters.characterDetail
    };
}

 export default connect(
    selectState,
    dispatch => ({
        changeTitle: (title) => AppActions.changeTitle(title)(dispatch),
        findCharacter: (id) => CharactersActions.findCharacter(id)(dispatch),
        clearCharacterDetail: () => CharactersActions.clearCharacterDetail()(dispatch),
    })
)(withRouter(CharactersDetail));