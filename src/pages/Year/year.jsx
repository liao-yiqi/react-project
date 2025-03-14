import './year.scss'
import {DatePicker, NavBar} from "antd-mobile";
import classNames from "classnames";
import {useDate} from "@/hooks/useDate";
import {useYearBillList} from "@/hooks/useBillList";
import TwoLineOverview from '@/component/TwoLineOverview/towLineOverview'
import {getOverview, getMonthOverview} from "@/contants/billList";
import dayjs from "dayjs";
import OneLineOverview from "@/component/OneLineOverview/oneLineOverview";

const Year = () => {
    const {date, visible, onHideDate, onShowDate, onDateChange} = useDate()
    const selectedYear = date.get('year')
    const selectedYearBills = useYearBillList(selectedYear)
    const overview = getOverview(selectedYearBills)
    const maxMonth = dayjs().get('year') === selectedYear ? dayjs().get('month') + 1 : 12
    const monthBillList = new Array(maxMonth).fill('').map((_, month) => {
        return getMonthOverview(selectedYearBills, month)
    }).reverse()
    return (
        <div className='yearlyBill'>
            <DatePicker
                title="记账日期"
                precision="year"
                visible={visible}
                max={new Date()}
                onClose={onHideDate}
                onConfirm={onDateChange}
            />
            <NavBar className='nav' backIcon={false}>
                <div className="nav-title">
                    {selectedYear}年
                </div>
            </NavBar>
            <div className='content'>
                <div className='header'>
                    <div className='date' onClick={onShowDate}>
                        <span className='text'>
                            {selectedYear}年账单
                        </span>
                        <span className={classNames('arrow', visible && 'expand')}/>
                    </div>
                    <div className='overview'>
                        {<TwoLineOverview
                            pay={overview.pay}
                            income={overview.income}
                            className="overview"
                        />}
                    </div>
                </div>
                <div className='group'>
                    {monthBillList.map((item, index) => {
                        return (
                            <div
                                className="monthBill"
                                key={index}
                            >
                                <div className="date">{maxMonth - index}月</div>
                                <OneLineOverview pay={item.pay} income={item.income}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Year