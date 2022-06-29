import React from 'react';
import './_header.less';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Header = (props) => {
  const { columns } = props;
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('date');
  const showPanel = props.isShow;

  const onSortHandler = (sortOption, sortBy) => {
    setSortOrder(sortOption);
    const sortType = sortBy.split(' ');
    setSortBy(sortType[1]);
    props.onSort(sortOption, sortType[1]);
  };
  // const showHandler = (isShow) => {
  //   props.showHandler(isShow);

  // };

  return (
    <div className='header-section'>
      <div className='header-container'>
        <div className='header'>
          {columns.map((column, index) =>
            !column.isShow && showPanel ? null : column.IsSortBy ? (
              <div key={index} className={column.ClassName}>
                <div
                  onClick={() =>
                    onSortHandler(sortOrder == 'asc' ? 'desc' : 'asc', column.ClassName)
                  }>
                  <span className='sort'>{column.ColumnName}</span>

                  {sortOrder == 'asc' ? (
                    <span
                      id={column.ColumnName}
                      className={column.IsSorted ? 'icon_up' : ''}></span>
                  ) : (
                    <span
                      id={column.ColumnName}
                      className={column.IsSorted ? 'icon_down' : ''}></span>
                  )}
                </div>
              </div>
            ) : (
              <div key={index} className={column.ClassName}>
                <div>
                  <span className='no-sort'>{column.ColumnName}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  columns: PropTypes.array,
  onSort: PropTypes.func,
  isShow: PropTypes.bool
};
export default Header;
