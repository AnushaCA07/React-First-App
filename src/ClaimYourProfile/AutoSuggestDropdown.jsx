import React from 'react';

//stylesheet import
import './_autoSuggestDropdown.less';

export const AutoSuggestDropdown = (props) => {
  const suggestionData = props.suggestions;
  const formatPartToBold = (str, strToChange) => {
    return str.replace(
      str.substr(str.toLowerCase().indexOf(strToChange), strToChange.length),
      `<strong>${str.substr(str.toLowerCase().indexOf(strToChange), strToChange.length)}</strong>`
    );
  };

  return (
    <ul className='auto-suggest-container'>
      {suggestionData.map((data, index) => (
        <li key={index} className='auto-suggest-value' onClick={() => props.clickHandler(data.data)}>
          <a
            href
            dangerouslySetInnerHTML={{
              __html: formatPartToBold(data.text, props.keyWord)
            }}
          />
        </li>
      ))}
    </ul>
  );
};
