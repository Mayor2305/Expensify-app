import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

const addExpense = (
    { description = '', note = '', amount = 0, createdAt = 0 }
    ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = (
    { id }
    ) => ({
        type: 'REMOVE_EXPENSE',
        id
    })


const editExpense = (id, updates) => ({
        type: 'EDIT_EXPENSE',
        id,
        updates
})

const expensesReducerDefault = [];

const expensesReducer = (state = expensesReducerDefault, action) => {
     switch(action.type) {
        case 'ADD_EXPENSE':
             return [
                 ...state,
                 action.expense
             ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id != action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return { 
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            })
        default: 
            return state;
     }
}

//functions for filter reducer

const setTextFilter = (text = '') => {
    return {
        type: 'TEXT_FILTER',
        text
    }
}

const sortByAmount = () => {
    return {
        type: 'SORT_BY_AMOUNT'
    }
}

const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE'
    }
}

const filterReducerDefault = {
    text: '',
    sortBy: '',
    startDate: undefined,
    endDate: undefined
};

const setStartDate = ( date ) => {
    return {
        type: 'SET_START_DATE',
        date
    }
}

const setEndDate = ( date ) => {
    return {
        type: 'SET_END_DATE',
        date
    }
}

const filterReducer = (state = filterReducerDefault, action) => {
    switch(action.type) {
        case 'TEXT_FILTER':
            return {...state, text: action.text}
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE': 
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date 
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        default:
            return state;
    }
}

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;// if start date isn't provided, then it should remain true thats why the first argument
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;// if end date isn't provided, then it should remain true thats why the first argument
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


const store = createStore (
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
)

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
})

const ex1 = store.dispatch(addExpense({ description: 'Rent', amount: 10, createdAt: -1000 }));
const ex2 = store.dispatch(addExpense({ description: 'a', amount: 100, createdAt: 1000 }));

// store.dispatch(removeExpense({ id:ex1.expense.id }));
// store.dispatch(editExpense(ex2.expense.id, { amount: 500 }));
// store.dispatch(setTextFilter('A'));
// store.dispatch(setTextFilter());

 store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));


console.log(store.getState())

const demoState = {
    expenses: [{
        id: 'lskjfoslkd',
        description: 'Jan rent',
        note: 'final payment',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};