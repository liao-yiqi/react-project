import './cart.scss'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import Count from "../Count";
import {clearCart, decreaseCount, increaseCount} from '../../store/modules/takeaway'

const Cart = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const {cartList} = useSelector(({foods}) => foods)
    const onShow = () => {
        if (cartList.length > 0) setVisible(!visible)
    }
    const clear = () => {
        setVisible(false)
        dispatch(clearCart())
    }
    const totalPrice = cartList.reduce((a, c) => a + c.price * c.count, 0)
    return (
        <div className='cartContainer'>
            <div className={classNames('cartOverlay', visible && 'visible')}
                 onClick={() => setVisible(false)}
            />
            <div className='cart'>
                <div onClick={onShow}
                     className={classNames('icon', cartList.length > 0 && 'fill')}>
                    {cartList.length > 0 && <div className="cartCornerMark">
                        {cartList.length}
                    </div>
                    }
                </div>
                <div className='main'>
                    <div className='price'>
                        <span className='payableAmount'>
                            <span className='payableAmountUnit'>￥</span>
                            {totalPrice.toFixed(2)}
                        </span>
                    </div>
                    <span className="text">预估另需配送费 ¥5</span>
                </div>
                {cartList.length > 0 ? (<div className="goToPreview">去结算</div>) : (
                    <div className="minFee">1元起送</div>)}
            </div>
            <div className={classNames('cartPanel', visible && 'visible')}>
                <div className='header'>
                    <span className='text'>购物车</span>
                    <span className='clearCart' onClick={() => clear()}>清空购物车</span>
                </div>
                <div className='scrollArea'>
                    {cartList.map(item => {
                        return (<div className='cartItem' key={item.id}>
                            <div className='shopPic'/>
                            <div className='main'>
                                <div className='skuInfo'>
                                    <div className="name">{item.name}</div>
                                </div>
                                <div className="payableAmount">
                                    <span className="yuan">¥</span>
                                    <span className="price">{item.price}</span>
                                </div>
                            </div>
                            <div className='skuBtnWrapper btnGroup'>
                                <Count
                                    count={item.count}
                                    onMinus={() => dispatch(decreaseCount(item.id))}
                                    onPlus={() => dispatch(increaseCount(item.id))}
                                />
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        </div>)
}

export default Cart