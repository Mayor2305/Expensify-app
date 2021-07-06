import moment from 'moment'
export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true// if start date isn't provided, then it should remain true thats why the first argument
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true// if end date isn't provided, then it should remain true thats why the first argument
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount')
        {
            return a.amount < b.amount ? 1 : -1
        }        
    })
}