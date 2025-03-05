import './monthStyle.scss'
import {DatePicker, NavBar} from "antd-mobile";
import {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from "lodash";
import DailyBill from './components/DayBill/DayBill'

function useSummary(list) {
    return useMemo(() => {
        const result = list.reduce((acc, {type, money}) => {
                if (type === 'pay') {
                    acc.pay += money;
                } else if (type === 'income') {
                    acc.income += money;
                }
                return acc;
            },
            {pay: 0, income: 0}
        );
        result.total = result.pay + result.income;
        return result;
    }, [list]);
}

const Month = () => {
    const [dateVisible, setDateVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM')
    })
    const [currentMonthList, setMonthList] = useState([]);
    const billList = useSelector(state => state.bill.billList)
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList]);

    const monthResult = useSummary(currentMonthList)

    const confirm = (date) => {
        setDateVisible(false)
        setCurrentDate(String(dayjs(date).format('YYYY-MM')))
        const formatDate = dayjs(date).format('YYYY-MM')
        setMonthList(monthGroup[formatDate] ?? [])
    }

    useEffect(() => {
        if (monthGroup[currentDate]) setMonthList(monthGroup[currentDate])
    }, []);

    const dayGroup = useMemo(() => {
        const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return {
            groupData,
            keys
        }
    }, [currentMonthList]);

    return (
        <div className='monthlyBill'>
            <NavBar className='nav' backIcon={false}>
                月度账单
            </NavBar>
            <div className='content'>
                <div className='header'>
                    <div className='date' onClick={() => setDateVisible(!dateVisible)}>
                        <span className='text'>
                         {currentDate} 月账单
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}>
                        </span>
                    </div>
                    <div className='twoLineOverview'>
                        <div className='item'>
                            <span className='money'>{monthResult.pay.toFixed(2)}</span>
                            <span className='type'>支出</span>
                        </div>
                        <div className='item'>
                            <span className='money'>{monthResult.income.toFixed(2)}</span>
                            <span className='type'>收入</span>
                        </div>
                        <div className='item'>
                            <span className='money'>{monthResult.total.toFixed(2)}</span>
                            <span className='type'>结余</span>
                        </div>
                    </div>
                    <DatePicker
                        title="记账日期"
                        precision="month" visible={dateVisible}
                        max={new Date()}
                        onClose={() => setDateVisible(false)}
                        onConfirm={confirm}
                    />
                </div>
                <div className='group'>
                    {dayGroup.keys.map(item => {
                        return (
                            <DailyBill
                                key={item + new Date().getTime()}
                                date={item}
                                billList={dayGroup.groupData[item]}
                                summary={useSummary}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Month