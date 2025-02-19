import './count.scss'

const Count = ({count, onMinus, onPlus}) => {
    return (
        <div className='goods-count'>
            <span className="minus" onClick={onMinus}>-</span>
            <span className='count'>{count}</span>
            <span className="plus" onClick={onPlus}>+</span>
        </div>
    )
}
export default Count