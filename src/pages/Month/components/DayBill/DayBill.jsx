import './dayBill.scss'
import {useState} from "react";
import classNames from "classnames";
import {billTypeToName} from "@/pages/contants/contants";
import Icon from "@/component/Icon/icon";

const DayBill = ({date, billList, summary}) => {
    const [visible, setVisible] = useState(false);
    const dayResult = summary(billList)
    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames('arrow', visible && 'expand')}
                          onClick={() => setVisible(!visible)}/>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{dayResult.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            <div className="billList" style={{display: visible ? 'block' : 'none'}}>
                {billList.map(({id, type, useFor, money}) => {
                    return (
                        <div className="bill" key={id}>
                            {/* 图标 */}
                            <Icon type={useFor}/>
                            <div className="detail">
                                <div className="billType">{billTypeToName[useFor]}</div>
                            </div>
                            <div className={classNames('money', type)}>
                                {money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DayBill