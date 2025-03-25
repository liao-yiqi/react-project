import './publish.scss'
import {Breadcrumb, Button, Card, Form, Input, message, Select, Space, Radio, Upload} from "antd";
import {Link} from "react-router-dom";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useState} from "react";
import {createArticleAPI} from "@/api/publish.js";
import {PlusOutlined} from "@ant-design/icons";
import {useChannel} from "@/hooks/useChannel.js";

const Publish = () => {
    const {channelList} = useChannel()
    const imagesType = [
        {value: 1, name: '单图'},
        {value: 3, name: '三图'},
        {value: 0, name: '无图'}
    ]
    const [imageType, setImageType] = useState(1)
    const onTypeChange = ({target}) => {
        setImageType(target.value)
        setImagesList([])
    }
    const [imagesList, setImagesList] = useState([])
    const onUploadChange = (value) => {
        setImagesList(value.fileList)
    }

    const [form] = Form.useForm()
    const onsubmit = async (value) => {
        const params = {
            cover: {
                type: imageType,
                images: imagesList.map(item => item.response.data.url)
            },
            ...value
        }
        await createArticleAPI(params)
        message.success('发布成功')
        form.resetFields()
    }
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined/>
        </button>
    );
    return (
        <div className='publish'>
            <Card title={
                <Breadcrumb items={[
                    {title: <Link to={'/'}>首页</Link>},
                    {title: '发布文章'},
                ]}
                />
            }>
                <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 16}} initialValues={{type: 1}}
                      onFinish={onsubmit}>
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}}/>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{required: true, message: '请选择文章频道'}]}
                    >
                        <Select
                            placeholder="请选择文章频道"
                            style={{width: 400}}
                            options={channelList.map(item => ({value: item.id, label: item.name}))}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                {imagesType.map(item => {
                                    return (
                                        <Radio
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.name}
                                        </Radio>
                                    )
                                })}
                            </Radio.Group>
                        </Form.Item>
                        {imageType !== 0 && <Upload
                            name="image"
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            onChange={onUploadChange}
                            maxCount={imageType}
                            multiple={imageType > 1}
                            fileList={imagesList}
                        >
                            {imagesList.length === imageType ? null : uploadButton}
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{required: true, message: '请输入文章内容'}]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Publish