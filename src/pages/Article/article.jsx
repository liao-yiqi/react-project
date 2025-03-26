import './article.scss'
import {Link, useNavigate} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import {useChannel} from "@/hooks/useChannel.js";
import {useEffect, useState} from "react";
import {delArticleAPI, getArticleListAPI} from "@/api/article.js";

const {RangePicker} = DatePicker

const Article = () => {
    const statusTag = {
        1: <Tag color='warning'>待审核</Tag>,
        2: <Tag color='success'>已审核</Tag>
    }
    const navigate = useNavigate()
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
            render: data => statusTag[data]
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
            render: (data) => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined/>}
                            onClick={() => navigate(`/publish?id=${data.id}`)}
                        />
                        <Popconfirm
                            title="删除文章"
                            description="确认要删除当前文章吗?"
                            onConfirm={() => deleteArticle(data.id)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined/>}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    const {channelList} = useChannel()
    const [params, setParams] = useState({
        page: 1,
        per_page: 2
    })
    const onSubmit = (value) => {
        const {date, ...oldValue} = value
        setParams({
            ...params,
            ...oldValue,
            begin_pubdate: date ? date[0].format('YYYY-MM-DD') : '',
            end_pubdate: date ? date[1].format('YYYY-MM-DD') : ''
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
    const [count, setCount] = useState(0)
    useEffect(() => {
        const getArticleData = async () => {
            setLoading(true)
            const {data} = await getArticleListAPI(params)
            setArticleList(data.results)
            setCount(data.total_count)
            setLoading(false)
        }
        getArticleData().then()
    }, [params]);
    const onPageChange = (page) => {
        setParams({
            ...params,
            page
        })
    }
    const deleteArticle = async (id) => {
        await delArticleAPI(id)
        setParams({...params})
    }

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
            <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={articlesList} loading={loading} pagination={{
                    total: count,
                    pageSize: params.per_page,
                    onChange: onPageChange
                }}/>
            </Card>
        </div>
    )
}
export default Article