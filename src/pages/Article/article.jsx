import './article.scss'
import {Link} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import {useChannel} from "@/hooks/useChannel.js";
import {useEffect, useState} from "react";
import {getArticleListAPI} from "@/api/article.js";

const {RangePicker} = DatePicker

const Article = () => {
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: () => <Tag color="green">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: () => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}/>
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined/>}
                        />
                    </Space>
                )
            }
        }
    ]
    const {channelList} = useChannel()
    const [params, setParams] = useState({
        page: 1,
        per_page: 4
    })
    const onSubmit = (value) => {
        const {date, ...oldValue} = value
        setParams({
            ...params,
            ...oldValue,
            begin_pubdate: date[0].format('YYYY-MM-DD'),
            end_pubdate: date[1].format('YYYY-MM-DD')
        })
    }
    const [form] = Form.useForm()
    const resetData = () => {
        form.resetFields()
        setParams({
            page: 1,
            per_page: 4
        })
    }
    const [articlesList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getArticleData = async () => {
            setLoading(true)
            const {data} = await getArticleListAPI(params)
            setArticleList(data.results)
            setLoading(false)
        }
        getArticleData().then()
    }, [params]);

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '文章列表'},
                    ]}/>
                }
                style={{marginBottom: 20}}
            >
                <Form form={form} initialValues={{status: ''}} onFinish={onSubmit}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{width: 120}}
                            options={channelList.map(item => ({value: item.id, label: item.name}))}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 40}}>
                            筛选
                        </Button>
                        <Button type='primary' danger style={{marginLeft: 20}} onClick={resetData}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`根据筛选条件共查询到 count 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={articlesList} loading={loading}/>
            </Card>
        </div>
    )
}
export default Article