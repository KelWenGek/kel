import React, { createClass } from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import { VISIBILITY_FILTER } from '../store/constant';

let FooterLink = createClass({
  displayName: "FooterLink",
  shouldComponentUpdate(nextProps, nextState) {

    return !is(this.props, nextProps);
  },
  render() {
    let { left, curFilter, onFilter } = this.props;
    return (
      <div
        className="footer"
        style={{
          display: left === 0
            ? 'none'
            : 'block'
        }}>
        <span className="todo-count">
          <strong>{left + ' item' + (left > 1
            ? 's'
            : '') + ' left'}</strong>
        </span>
        <ul className="filters">
          {Object
            .keys(VISIBILITY_FILTER)
            .map((filterName, index) => {
              return (
                <li key={index}>
                  <a
                    href="javascript:void(0)"
                    className={curFilter === VISIBILITY_FILTER[filterName]
                      ? 'selected'
                      : ''}
                    onClick={() => {
                      onFilter(VISIBILITY_FILTER[filterName])
                    }}>{filterName.substr(0, 1) + filterName
                      .substr(1)
                      .toLowerCase()}</a>
                </li>
              )
            })}
        </ul>
      </div>
    );
  }
});

FooterLink.propTypes = {
  left: PropTypes.number,
  curFilter: PropTypes.string,
  onFilter: PropTypes.func
};
export default FooterLink;
