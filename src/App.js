import {useState} from 'react'

function App() {
    function mapList() {
        const nameList = [
            {id: 100, name: '张三'},
            {id: 200, name: '李四'},
            {id: 300, name: '王五'}
        ]
        return (
            <ul className='bg'>
                {nameList.map(item => {
                    return <li key={item.id}>{item.name}</li>
                })}
            </ul>
        )
    }

    function currentType(type) {
        switch (type) {
            case 1:
                return (
                    <div>🚀</div>
                )
            case 2:
                return (
                    <div>💥</div>
                )
            case 3:
                return (
                    <div>💊</div>
                )
            default:
                return (
                    <div>👍</div>
                )
        }
    }

    function MyComponent() {
        const [count, setCount] = useState(0)
        const addCount = () => {
            setCount(count + 1)
        }
        return (
            <div>
                <div>{count}</div>
                <button onClick={addCount}>+1</button>
            </div>
        )
    }


    return (
        <div className="App">
            {mapList()},
            {currentType(1)}
            {MyComponent()}
        </div>
    );
}

export default App;
