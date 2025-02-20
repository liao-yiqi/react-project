import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const params = '🎈'
    const __params = '🎆'
    return <div>
        <button onClick={() => navigate(`/article?params=${params}`)}>跳转文章</button>
        <button onClick={() => navigate(`/article/${__params}`)}>跳转文章</button>
    </div>
}

export default Login
