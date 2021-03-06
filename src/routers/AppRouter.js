import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ExpenseDashboardPage from './../components/ExpenseDashboardPage'
import ExpenseCreate from './../components/ExpenseCreate'
import EditExpensePage from './../components/EditExpensePage'
import HelpPage from './../components/HelpPage'
import NotFoundPage from './../components/NotFoundPage'
import Header from './../components/Header'


const AppRouter = () =>(
    <BrowserRouter>
        <div>
            <Header />
            
            <Switch> {/*stops when a page match is found*/}
                <Route path="/" component={ExpenseDashboardPage} exact={true}/>
                <Route path="/create" component={ExpenseCreate}/>
                <Route path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
