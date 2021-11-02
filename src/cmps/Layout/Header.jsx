import React from 'react'
import mealsImage from '../../assets/images/meals.jpg'
import HeaderCartButton from '../Layout/HeaderCartButton'
import classes from './Header.module.css'

const Header = props => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
        {/* <img src="https://some-url.com/to-some-image.jpg" /> */}
      </div>
    </React.Fragment>
  )
}
export default Header