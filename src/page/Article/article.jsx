import {useParams, useSearchParams} from "react-router-dom";

const Article = () => {
    const [params] = useSearchParams()
    let _params = params.get('params')
    const ___params = useParams()
    return (
        <div>文章{_params} {___params.name}</div>
    )
}
export default Article