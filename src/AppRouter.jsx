import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import TemporaryDrawer from "./AppLayout/Sidebar";

import ArcBuilder from "./Features/ArcBuilder";
import GraphBuilder from "./Features/GraphBuilder";

export default function AppRouter() {
    return (
        <Router>
            <TemporaryDrawer/>  

            <Switch>
                <Route exact path="/arc-builder">
                    <ArcBuilder />
                </Route>

                <Route exact path="/graph-builder">
                    <GraphBuilder />
                </Route>
            </Switch>
        </Router>
    );
}