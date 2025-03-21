import './layout.scss'
import {Layout, Menu, Popconfirm} from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserInfo, logout} from "@/store/modules/user.js";
import {useEffect} from "react";

const {Header, Sider} = Layout

const menuItems = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined/>,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined/>,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined/>,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onMenuClick = (route) => {
        const path = route.key
        navigate(path)
    }
    const onLogout = () => {
        dispatch(logout())
        navigate('/login')
    }
    const location = useLocation()
    const selectedKey = location.pathname

    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);
    const userName = useSelector(state => state.user.userInfo.name)

    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <div className="user-info">
                    <span className="user-name">{userName}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
                             <LogoutOutlined/> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={selectedKey}
                        items={menuItems}
                        style={{height: '100%', borderRight: 0}}
                        onClick={onMenuClick}
                    >
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}}>
                    <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout