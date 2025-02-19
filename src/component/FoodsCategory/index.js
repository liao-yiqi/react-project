import './foodsCategory.scss'
import FoodsItem from './FoodsItem/index'

const FoodsCategory = ({name, foods}) => {
    return (
        <div className="category">
            <dl className='cate-list'>
                <dt className='cate-title'>{name}</dt>
                {foods.map(item => <FoodsItem key={item.id} {...item}/>)}
            </dl>
        </div>
    )
}
export default FoodsCategory