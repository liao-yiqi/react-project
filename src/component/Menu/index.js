import {useDispatch, useSelector} from "react-redux";
import {changeActiveIndex} from "../../store/modules/takeaway";
import classNames from 'classnames'
import './menu.scss'

const Menu = () => {
    const dispatch = useDispatch()
    const {activeIndex, foodsList} = useSelector(state => state.foods)
    const menus = foodsList.map(item => ({tag: item.tag, name: item.name}))
    return (
        <nav className='list-menu'>
            {menus.map((item, index) => {
                return (
                    <div key={item.tag}
                         className={classNames(
                             'list-menu-item',
                             activeIndex === index && 'active'
                         )}
                         onClick={() => dispatch(changeActiveIndex(index))}
                    >
                        {item.name}
                    </div>
                )
            })}
        </nav>
    )
}

export default Menu
