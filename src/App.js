const Item = ({name, num, array, child}) => {
    return (
        <div>
            <div style={{color: 'pink'}}>{name}</div>
            <div style={{color: 'blue'}}>{num}</div>
            {array.map(item => {
                return (
                    <span key={item}>{item}</span>
                )
            })}
            <div>
                {child()}
            </div>
        </div>
    )
}

const App = () => {
    const message = '22'
    const num = 11
    const array = ['a', 'b', 'c']
    const child = () => {
        return (
            <a href=''>this is child message</a>
        )
    }
    return (
        <Item name={message} num={num} array={array} child={child}/>
    )
}

export default App