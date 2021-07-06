import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', createdAt: 2500, amount: 4500 }));
store.dispatch(addExpense({ description: 'Gass bill', createdAt: 10000, amount: 1  }));
store.dispatch(addExpense({ description: 'Rent',createdAt: 1500, amount: 109500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
console.log(visibleExpenses)

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render (jsx, document.getElementById('app'));