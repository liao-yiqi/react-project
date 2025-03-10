import {useDispatch, useSelector} from "react-redux";
import {getBillList} from "@/store/modules/billStore";
import {useEffect, useMemo} from "react";
import dayjs from "dayjs";


export const useBillList = () => {
    const dispatch = useDispatch();
    const {billList} = useSelector(state => state.bill);
    useEffect(() => {
        dispatch(getBillList()).then()
    }, [dispatch]);
    return {billList}
}

export const useYearBillList = selectedYear => {
    const {billList} = useBillList()
    return useMemo(
        () =>
            billList.filter(item => selectedYear === dayjs(item.date).get('year')),
        [billList, selectedYear]
    )
}