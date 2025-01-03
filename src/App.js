import {useEffect, useState, useRef} from 'react'
import './App.scss'
import avatar from './images/bozai.png'
import orderBy from 'lodash/orderBy'
import axios from "axios";
import dayjs from "dayjs";

// 评论列表数据
const defaultList = [
    {
        // 评论id
        personId: 3,
        // 用户信息
        user: {
            uid: '13258165',
            avatar: '',
            uname: '周杰伦',
        },
        // 评论内容
        content: '哎哟，不错哦',
        // 评论时间
        ctime: '10-18 08:15',
        like: 88,
    },
    {
        personId: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: '许嵩',
        },
        content: '我寻你千百度 日出到迟暮',
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        personId: 1,
        user: {
            uid: '30009257',
            avatar,
            uname: '黑马前端',
        },
        content: '学前端就来黑马',
        ctime: '10-19 09:00',
        like: 66,
    },
]
// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar,
    // 用户昵称
    uname: '黑马前端',
}


// 导航 Tab 数组
const tabs = [
    {type: 'hot', text: '最热'},
    {type: 'time', text: '最新'},
]

function useGetList() {
    const [list, setList] = useState([])
    useEffect(() => {
        async function getList() {
            const result = await axios.get('http://localhost:3008/list')
            setList(result.data)
        }

        getList().then()
    }, [])
    return {
        list, setList
    }
}

function Item({item, onDelete}) {
    return (
        <div className="reply-item">
            {/* 头像 */}
            <div className="root-reply-avatar">
                <div className="bili-avatar">
                    <img
                        className="bili-avatar-img"
                        src={item.user.avatar}
                        alt=""
                    />
                </div>
            </div>

            <div className="content-wrap">
                {/* 用户名 */}
                <div className="user-info">
                    <div className="user-name">{item.user.uname}</div>
                </div>
                {/* 评论内容 */}
                <div className="root-reply">
                    <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                        {/* 评论时间 */}
                        <span className="reply-time">{item.ctime}</span>
                        {/* 评论数量 */}
                        <span className="reply-time">点赞数:{item.like}</span>
                        {user.uid === item.user.uid && (
                            <span
                                className="delete-btn"
                                onClick={() => onDelete(item.personId)}
                            >
                          删除
                        </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const App = () => {
    // 导航 Tab 高亮的状态
    const [activeTab, setActiveTab] = useState('hot')
    const {list, setList} = useGetList()

    // 删除评论
    const onDelete = personId => {
        // 如果要删除数组中的元素，需要调用 filter 方法，并且一定要调用 setList 才能更新状态
        setList(list.filter(item => item.personId !== personId))
    }

    // tab 高亮切换
    const onToggle = type => {
        setActiveTab(type)
        let newList
        if (type === 'time') {
            // 按照时间降序排序
            // orderBy(对谁进行排序, 按照谁来排, 顺序)
            newList = orderBy(list, 'ctime', 'desc')
        } else {
            // 按照喜欢数量降序排序
            newList = orderBy(list, 'like', 'desc')
        }
        setList(newList)
    }

    const inputRef = useRef(null)
    const [content, setContent] = useState('')
    const handlePush = () => {
        setList([...list, {
            personId: new Date().getTime(),
            user: {
                uid: '30009257',
                avatar,
                uname: 'du',
            },
            content: content,
            ctime: dayjs(new Date()).format('MM-DD hh:mm'),
            like: Math.random().toFixed(2)
        }])
        setContent('')
        inputRef.current.focus()
    }

    return (
        <div className="app">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        <span className="total-reply">{list.length}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名： active */}
                        {tabs.map(item => {
                            return (
                                <div
                                    key={item.type}
                                    className={
                                        item.type === activeTab ? 'nav-item active' : 'nav-item'
                                    }
                                    onClick={() => onToggle(item.type)}
                                >
                                    {item.text}
                                </div>
                            )
                        })}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    {/* 当前用户头像 */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="用户头像"/>
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="发一条友善的评论"
                            ref={inputRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {/* 发布按钮 */}
                        <div className="reply-box-send">
                            <div className="send-text" onClick={() => handlePush()}>发布</div>
                        </div>
                    </div>
                </div>
                {/* 评论列表 */}
                <div className="reply-list">
                    {/* 评论项 */}
                    {list.map((item, index) => <Item key={item.id + index} item={item} onDelete={onDelete}/>)}
                </div>
            </div>
        </div>
    )
}

export default App