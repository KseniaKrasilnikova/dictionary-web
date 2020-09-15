import React from 'react';
import PropTypes from 'prop-types';
import style from './button.css';

const Button = ({ title, img }) => (
  <button type="button" className="btn btn-secondary">
    {title}
    {img !== undefined ? (
      <img className={style.btnImg} src={img} alt={title} />
    ) : (
      ''
    )}
  </button>
);

Button.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
};

export default Button;
