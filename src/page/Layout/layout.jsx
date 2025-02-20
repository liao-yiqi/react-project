import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return <div>
        layout一级路由
        <div>
            <Link to='/about'>关于</Link>
        </div>
        <div>
            <Link to='/board'>面板</Link>
        </div>
        <Outlet/>
    </div>
}

export default Layout