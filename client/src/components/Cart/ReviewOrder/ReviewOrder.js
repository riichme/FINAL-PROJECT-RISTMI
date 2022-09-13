// Import All needed dependencies
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import Actions
import { addItem, removeItem } from '../../../app/Features/Cart/actions';

// Import Component
import OrderItems from './OrderItems'

const ReviewOrder = () => {
  // Selector is function to read value from the global state and then return that result
  const carts = useSelector((state) => state.cart);

  // Initial the useDispatch from redux
  // Dispatch an action, so that it triggers a global state change
  const dispatch = useDispatch();

  // navigate is used for going to another pages
  const navigate = useNavigate();

  // each carts data changes, useEffect will be called
  useEffect(()=>{
    carts.length === 0 && navigate('/');
  }, [carts, navigate])


  return (
    <div className='lg:w-[40rem] xs:min-w-[20rem]'>
        <h3 className='mb-2 text-xl font-bold'>Review Your Order</h3>
        <hr className='border-black'/>
          {/* Order Items */}
          {carts.map((cart, i) => {
            return <OrderItems key={i} name={cart.name} qty={cart.qty} price={cart.price * cart.qty} image={cart.image_url} onItemInc={() => dispatch(addItem(cart))} onItemDec={() => dispatch(removeItem(cart))} />
          })}
        <hr className='border-black'/>
    </div>
  )
}

export default ReviewOrder