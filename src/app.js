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
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render (jsx, document.getElementById('app'));