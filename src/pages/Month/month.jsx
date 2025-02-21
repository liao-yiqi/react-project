import './monthStyle.scss'
import {DatePicker, NavBar} from "antd-mobile";
import {useState} from "react";
import classNames from "classnames";
import dayjs from "dayjs";

const Month = () => {
    const [dateVisible, setDateVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM')
    })
    const confirm = (date) => {
        setCurrentDate(String(dayjs(date).format('YYYY-MM')))
        setDateVisible(false);
    }
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
                            <span className='money'>{100}</span>
                            <span className='type'>支出</span>
                        </div>
                        <div className='item'>
                            <span className='money'>{200}</span>
                            <span className='type'>收入</span>
                        </div>
                        <div className='item'>
                            <span className='money'>{300}</span>
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
            </div>
        </div>
    )
}
export default Month