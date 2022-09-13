// Import All needed dependencies
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// Import Action
import { setPage, setTags } from '../../app/Features/Product/actions'

// Receive prop value from page Home
const Tags = ({value}) => {
  // State
  const [active, setActive] = React.useState(false);

  // Initial the useDispatch and useSelector from redux
  // useSelector is function to read value from the global state and then return that result
  const products = useSelector((state) => state.product);
  // Dispatch an action, so that it triggers a global state change
  const dispatch = useDispatch();

  // Event handler click tag on 
  const handleClickOn = (e) => {
    setActive(true)
    dispatch(setTags([...products.tags, e.target.innerText]));
  }

  // Event handler click tag off
  const handleClickOff = (e) => {
    setActive(false)
    dispatch(setTags([...products.tags].filter(value => value !== e.target.innerText)));
  }

  // Each state active changes and dispatch triggers, set currentPage to page 1
  useEffect(() => {
    dispatch(setPage(1));
  }, [active, dispatch])

  return (
    <div>
        {/* If event click triggers, button background will change  */}
        {active ? (
          <button onClick={handleClickOff} className=" bg-blue-600  text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded focus:outline-0 focus:border-0 dark:bg-blue-200 dark:text-blue-800">{value}</button>
        ) : <button onClick={handleClickOn} className="bg-blue-100 hover:bg-blue-600 hover:text-white focus:outline-0 focus:border-0    text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{value}</button>}
    </div>
  )
}

export default Tags