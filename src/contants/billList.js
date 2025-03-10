import dayjs from "dayjs";

export const getOverview = (data = []) => {
    return data.reduce((prev, {date, type, money}) => {
        return {
            ...prev, data: date, [type]: prev[type] + +money
        }
    }, {pay: 0, income: 0, date: null})
}

export const getMonthOverview = (data, month) => {
    const bill = data.filter(item => {
        return month === dayjs(item.date).get('month')
    })
    return getOverview(bill)
}