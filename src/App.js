import {useState} from "react";
import './App.scss'
import avatar from './images/bozai.png'
import classNames from "classnames/dedupe";
import orderBy from 'lodash/orderBy'

// 评论列表
const defaultList = [
    {
        personId: 3,
        user: {
            userId: '13258165',
            avatar: '',
            uname: '王五',
        },
        content: '...5',
        ctime: '10-20 11:00',
        like: 88,
    },
    {
        personId: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: '李四',
        },
        content: '...7',
        ctime: '11-13 11:29',
        like: 50,
    },
    {
        personId: 1,
        user: {
            uid: '30009257',
            avatar,
            uname: 'react',
        },
        content: '....6',
        ctime: '10-19 09:00',
        like: 66,
    },
]
// 当前用户信息
const user = {
    uid: '30009257',
    avatar,
    userName: '张三'
}
// 导航
const tabs = [
    {type: 'hot', text: '最热'},
    {type: 'time', text: '最新'},
]

const App = () => {
    const [list, setList] = useState(defaultList)
    const onDelete = (id) => {
        setList(list.filter(item => item.personId !== id))
    }
    const [activeTab, setActiveTab] = useState('hot');
    const onToggle = (type) => {
        setActiveTab(type)
        let newList
        if (type === 'time') {
            newList = orderBy(list, 'ctime', 'desc')
        } else {
            newList = orderBy(list, 'like', 'desc')
        }
        setList(newList)
    }
    return (
        <div className='app'>
            <div className="reply-navigation">
                <ul className='nav-bar'>
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        <span className="total-reply">{defaultList.length}</span>
                    </li>
                    <li className="nav-sort">
                        {tabs.map(item => {
                            return (
                                <span key={item.type} className={
                                    classNames('nav-item', {active: activeTab === item.type})
                                }
                                      onClick={() => {
                                          onToggle(item.type)
                                      }}>
                                    {item.text}
                                </span>
                            )
                        })
                        }
                    </li>
                </ul>
            </div>
            <div className='reply-wrap'>
                <div className="box-normal">
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="用户头像"/>
                        </div>
                    </div>
                    <div className='reply-box-wrap'>
                        <textarea
                            className="reply-box-textarea"
                            placeholder="发一条友善的评论"
                        />
                        <div className="reply-box-send">
                            <div className="send-text">发布</div>
                        </div>
                    </div>
                </div>
                <div className='reply-list'>
                    {list.map(item => {
                        return (
                            <div key={item.personId} className="reply-item">
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
                                    <div className="user-info">
                                        <div className="user-name">{item.user.uname}</div>
                                    </div>
                                    <div className="root-reply">
                                        <span className="reply-content">{item.content}</span>
                                        <div className="reply-info">
                                            <span className="reply-time">{item.ctime}</span>
                                            <span className="reply-time">点赞数:{item.like}</span>
                                            {user.userId === item.user.userId && (
                                                <span className="delete-btn"
                                                      onClick={() => onDelete(item.personId)}>
                                                    删除
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default App