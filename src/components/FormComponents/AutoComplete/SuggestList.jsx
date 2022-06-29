import React, { Fragment, useState, useReducer, useEffect } from 'react';
import './_autocomplete.less';
import PropTypes from 'prop-types';

const initialState = { selectedIndex: 0 };

const SuggestList = (props) => {
  const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
      const downHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      };
      const upHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(false);
        }
      };

      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);

      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, [targetKey]);

    return keyPressed;
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'arrowUp':
        return {
          selectedIndex:
            state.selectedIndex !== 0
              ? state.selectedIndex - 1
              : props.suggestions.filteredSuggestions.length - 1
        };
      case 'arrowDown':
        return {
          selectedIndex:
            state.selectedIndex !== props.suggestions.filteredSuggestions.length - 1
              ? state.selectedIndex + 1
              : 0
        };
      case 'select':
        return { selectedIndex: action.payload };
      default:
        throw new Error();
    }
  }

  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: 'arrowUp' });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: 'arrowDown' });
    }
  }, [arrowDownPressed]);

  const onClickHandler = (e, index) => {
    dispatch({ type: 'select', payload: index });
    props.onClick(e);
  };

  return (
    <ul className='suggestions'>
      {props.suggestions.filteredSuggestions.map((suggestion, index) => {
        let suggestListClass;
        const suggestionParts = suggestion.text.split(new RegExp(`(${props.userInput})`, 'gi'));

        const suggParts =
          suggestionParts != undefined && Array.isArray(suggestionParts) ? suggestionParts : [];

        return (
          <Fragment key={index}>
            <li
              key={index}
              onClick={(e) => {
                onClickHandler(e, index);
              }}
              className={index === state.selectedIndex ? 'suggestion-active' : ''}
              aria-pressed={index === state.selectedIndex}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  dispatch({ type: 'select', payload: index });
                  e.target.blur();
                }
              }}
              value={suggestion.text}>
              {suggParts.map((part) =>
                part !== undefined && part.toLowerCase() === props.userInput.toLowerCase() ? (
                  <b>{part}</b>
                ) : (
                  part
                )
              )}
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
};

SuggestList.propTypes = {
  suggestions: PropTypes.any,
  userInput: PropTypes.any,
  onClick: PropTypes.func
};
export default SuggestList;
