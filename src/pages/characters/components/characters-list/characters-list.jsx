import React, { Component } from 'react';
import './characters-list.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppActions from '../../../../redux/actions/AppActions';
import CharactersActions from '../../redux/actions/characters.actions';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';

class CharactersList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.changeTitle('Characters list');
        this.changeLanguage.bind(this);
    }

    componentDidMount() {
        this.props.findCharacters();
    }

    selectCharacter = id => ev => {
        this.props.history.push(`/${id}`);
    }

    changeLanguage() {
        i18next.language.includes('en') ? i18next.changeLanguage('es') : i18next.changeLanguage('en');
    }

    render() {
        return(
            <div>
                <div className="d-flex flex-row m-2">
                    <span>{this.props.t('global.title')}</span>
                    <button className="ml-auto" onClick={this.changeLanguage}>{this.props.t('global.changeLanguage')}</button>
                </div>
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
            </div>
        );
    }
}

function selectState(state) {
    return {
        charactersList: state.characters.charactersList
    };
}

export default compose(withTranslation('osudio'), connect(
    selectState,
    dispatch => ({
        changeTitle: (title) => AppActions.changeTitle(title)(dispatch),
        findCharacters: () => CharactersActions.findCharacters()(dispatch),
    })
))(withRouter(CharactersList));