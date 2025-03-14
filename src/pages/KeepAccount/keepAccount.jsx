import './keepAccount.scss'
import {Button, DatePicker, Input, NavBar} from 'antd-mobile'
import classNames from 'classnames'
import {useNavigate} from 'react-router-dom'
import Icon from '@/component/Icon/icon'
import {billListData} from '@/contants/contants'
import {useState} from "react";
import dayjs from "dayjs";
import {useDate} from "@/hooks/useDate";
import {addBillList} from "@/store/modules/billStore";
import {useDispatch} from "react-redux";

const KeepAccount = () => {
    const navigate = useNavigate()
    const [billType, setBillType] = useState('pay')
    const [money, setMoney] = useState()
    const moneyChange = (value) => {
        setMoney(value)
    }
    const {dateText, visible, onShowDate, onHideDate, onDateChange} = useDate()
    const [useFor, setUseFor] = useState('')
    const dispatch = useDispatch()
    const saveBill = () => {
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : +money,
            date: dateText === '今天'
                ? dayjs()
                : dayjs(`${dateText} ${dayjs().format('HH:mm:ss')}`),
            useFor: useFor,
        }
        dispatch(addBillList(data)).then()
        navigate('/')
    }

    return (<div className="keepAccounts">
        <NavBar className="nav" onBack={() => navigate(-1)}>
            记一笔
        </NavBar>

        <div className="header">
            <div className="kaType">
                <Button
                    shape="rounded"
                    className={classNames(billType === 'pay' && 'selected')}
                    onClick={() => setBillType('pay')}
                >
                    支出
                </Button>
                <Button
                    className={classNames(billType === 'income' && 'selected')}
                    onClick={() => setBillType('income')}
                    shape="rounded"
                >
                    收入
                </Button>
            </div>

            <div className="kaFormWrapper">
                <div className="kaForm">
                    <div className="date" onClick={onShowDate}>
                        <Icon type="calendar" className="icon"/>
                        <span className="text">{dateText}</span>
                        <DatePicker
                            className="kaDate"
                            title="记账日期"
                            visible={visible}
                            onClose={onHideDate}
                            max={new Date()}
                            onConfirm={onDateChange}
                        />
                    </div>
                    <div className="kaInput">
                        <Input
                            className="input"
                            placeholder="0.00"
                            type="number"
                            value={money}
                            onChange={moneyChange}
                        />
                        <span className="iconYuan">¥</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="kaTypeList">
            {billListData[billType].map(item => {
                return (<div className="kaType" key={item.type}>
                    <div className="title">{item.name}</div>
                    <div className="list">
                        {item.list.map(item => {
                            return (
                                <div
                                    className={
                                        classNames('item', useFor === item.type && 'selected')
                                    }
                                    key={Math.random()}
                                    onClick={() => setUseFor(item.type)}
                                >
                                    <div className="icon">
                                        <Icon type={item.type}/>
                                    </div>
                                    <div className="text">{item.name}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>)
            })}
        </div>
        <div className="btns">
            <Button className="btn save" onClick={saveBill}>
                保 存
            </Button>
        </div>
    </div>)
}

export default KeepAccount