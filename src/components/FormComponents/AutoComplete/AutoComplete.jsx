import './_autocomplete.less';
import '@hg/joy/src/globalstyles';
import React, { useState, useEffect } from 'react';
import SuggestList from './SuggestList';
import PropTypes from 'prop-types';

const AutoComplete = (props) => {
  useEffect(() => {
    setSearchValue(props.searchValue);
  }, [props.searchValue]);
  const suggestSettings = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false
  };
  useEffect(() => {
    setSearchValue(props.clientCodeValue);
  }, []);

  const [suggestions, setSuggestions] = useState(suggestSettings);
  const { textBoxData, searchType } = props;
  const [userInput, setUserInput] = useState(props.searchValue);

  const [searchValue, setSearchValue] = useState(props.searchValue);

  const onChange = (e) => {
    props.onChangeHandler(e);

    let data = getSuggestData();

    suggestSettings.filteredSuggestions = data;

    suggestSettings.showSuggestions = true;
    suggestSettings.activeSuggestion = -1;
    setSuggestions(suggestSettings);
    if (e.target.value.length < 3) {
      suggestSettings.showSuggestions = false;
      suggestSettings.activeSuggestion = 0;
      suggestSettings.filteredSuggestions = [];
      setSuggestions(suggestSettings);
    }
  };

  const getSuggestData = () => {
    let arr = [];
    if (searchType == 'clientData') {
      if (props.suggestData != undefined && Array.isArray(props.suggestData)) {
        props.suggestData.map((x) => {
          let data = { text: '', values: {} };
          if (
            x.ClientName.toLowerCase().indexOf(props.searchValue.toLowerCase()) > -1 ||
            x.ClientCode.toLowerCase().indexOf(props.searchValue.toLowerCase()) > -1
          ) {
            data.text = x.DisplayClientCode;
            data.values = x.ClientToProductCode;
            arr.push(data);
          }
        });
      }
    }
    return arr;
  };

  const onClick = (e) => {
    e.preventDefault();
    let data = suggestions.filteredSuggestions.filter(
      (x) => x.text.trim() === e.currentTarget.innerText
    );
    props.onSelectedItem(data);
    setUserInput(e.currentTarget.innerText);
    setSuggestions(suggestSettings);

    setSearchValue(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
    suggestSettings.filteredSuggestions = suggestions.filteredSuggestions;
    if (e.keyCode === 13) {
      e.preventDefault();
      setUserInput(suggestions.filteredSuggestions[suggestions.activeSuggestion]);
      let selectedItem = suggestions.filteredSuggestions[suggestions.activeSuggestion + 1];
      let data = suggestions.filteredSuggestions.filter((x) => x.text.trim() === selectedItem.text);
      props.onSelectedItem(data);
      suggestSettings.filteredSuggestions = [];
      setSuggestions(suggestSettings);
    } else if (e.keyCode === 38) {
      if (suggestions.activeSuggestion === 0) {
        return;
      }
      suggestSettings.activeSuggestion = suggestions.activeSuggestion - 1;
      setSuggestions(suggestSettings);
    } else if (e.keyCode === 40) {
      if (suggestions.activeSuggestion - 1 === suggestions.filteredSuggestions.length) {
        return;
      }
      suggestSettings.activeSuggestion = suggestions.activeSuggestion + 1;
      setSuggestions(suggestSettings);
    }
  };
  return (
    <div className='autosuggest-container'>
      {textBoxData && (
        <div>
          <input
            id={textBoxData.id}
            name={textBoxData.name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={searchValue}
            type='text'
            placeholder={textBoxData.placeholder}
          />
        </div>
      )}
      <SuggestList suggestions={suggestions} userInput={searchValue} onClick={(e) => onClick(e)} />
    </div>
  );
};

AutoComplete.propTypes = {
  textBoxData: PropTypes.object,
  suggestData: PropTypes.object,
  getSuggestData: PropTypes.func,
  getSelectedSuggestion: PropTypes.func,
  onChangeHandler: PropTypes.func,
  searchValue: PropTypes.string,
  type: PropTypes.string,
  onSelectedItem: PropTypes.func
};

export default AutoComplete;
