import './App.scss'
import NavBar from './component/NavBar'
import Menu from "./component/Menu";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFoodsList} from "./store/modules/takeaway";
import FoodsCategory from "./component/FoodsCategory";
import Cart from "./component/Cart";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFoodsList()).then()
    }, [dispatch]);
    const {foodsList, activeIndex} = useSelector(state => state.foods)
    return (
        <div className='home'>
            {/*导航栏*/}
            <NavBar/>
            {/*内容*/}
            <div className='content-wrap'>
                <div className='content'>
                    <Menu/>
                    <div className='list-content'>
                        <div className='goods-list'>
                            {foodsList.map((item, index) => {
                                return (
                                    activeIndex === index &&
                                    <FoodsCategory
                                        key={item.tag}
                                        name={item.name}
                                        foods={item.foods}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/*购物车*/}
            <Cart/>
        </div>
    )
}

export default App
