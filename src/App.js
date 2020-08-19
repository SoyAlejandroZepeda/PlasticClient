import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import Components
import Header from './components/Layout/Header';
import Home from './components/Layout/Home';
import Departments from './components/Departments/Departments';
import CreateDepartment from './components/Departments/CreateDepartment';
import EditDepartment from './components/Departments/EditDepartment';
import Positions from './components/Positions/Positions';
import CreatePosition from './components/Positions/CreatePosition';
import EditPosition from './components/Positions/EditPosition';
import CreateEmployee from './components/Employees/CreateEmployee';
import Employees from './components/Employees/Employees';
import Profile from './components/Employees/Profile';
import DepartmentsMobility from './components/Squares/DepartmentsMobility';
import SquaresDepartment from './components/Squares/SquaresDepartment';
import CreateSquare from './components/Squares/CreateSquare';
import EditSquare from './components/Squares/EditSquare';
import CreateMachine from './components/Machines/CreateMachine';
import MachinesSquare from './components/Machines/MachinesSquare';
import EditMachine from './components/Machines/EditMachine';
import CreateProduct from './components/Products/CreateProduct';
import ProductsMachine from './components/Products/ProductsMachine';
import Operators from './components/Operators/Operators';
import EditOperator from './components/Operators/EditOperator';
import Report from './components/Mobility/Report';
import GetWeeks from './components/Mobility/GetWeeks';
import GetDays from './components/Mobility/GetDays';
import MobilityReport from './components/Mobility/MobilityReport';
import CreateMobility from './components/Mobility/CreateMobility';
import EditMobility from './components/Mobility/EditMobility';
import PanelDay from './components/Panel/PanelDay';
import WeekDepartments from './components/Panel/WeekDepartment';
import PanelWeek from './components/Panel/PanelWeek';
import MonthDepartments from './components/Panel/MonthDepartment';
import PanelMonth from './components/Panel/PanelMonth';
import CreateWeek from './components/Mobility/CreateWeek';
import CreateDay from './components/Mobility/CreateDay';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

function App() {
  return (
    <ApolloProvider client = { client }>
      <Router>
        <Fragment>
          <Header />
          <div  className="container">
            <Switch>
              <Route exact path = '/' component = { Home } />
              <Route exact path = '/departamentos' component = { Departments } />
              <Route exact path = '/departamentos/nuevo' component = { CreateDepartment } />
              <Route exact path = '/departamentos/editar/:id' component = { EditDepartment } />
              <Route exact path = '/puestos' component = { Positions } />
              <Route exact path = '/puestos/nuevo' component = { CreatePosition } />
              <Route exact path = '/puestos/editar/:id' component = { EditPosition } />
              <Route exact path = '/empleados/nuevo' component = { CreateEmployee } />
              <Route exact path = '/empleados/' component = { Employees } />
              <Route exact path = '/empleados/perfil/:id' component = { Profile } />
              <Route exact path = '/movilidad/departamentos'  component = { DepartmentsMobility } />
              <Route exact path = '/movilidad/departamentos/:id/bloques' component = { SquaresDepartment } />
              <Route exact path = '/bloques/nuevo' component = { CreateSquare } />
              <Route exact path = '/bloques/editar/:id' component = { EditSquare } />
              <Route exact path = '/maquinas/nuevo' component = { CreateMachine } />
              <Route exact path = '/movilidad/departamentos/:id/bloques/:id/maquinas' component = { MachinesSquare } />
              <Route exact path = '/maquinas/editar/:id' component = { EditMachine } />
              <Route exact path = '/productos/nuevo' component = { CreateProduct } />
              <Route exact path = '/movilidad/departamentos/:id/bloques/:id/maquinas/:id/productos' component = { ProductsMachine } />
              <Route exact path = '/movilidad/operadores' component = { Operators } />
              <Route exact path = '/movilidad/operadores/editar/:id' component = { EditOperator } />
              <Route exact path = '/movilidad' component = { Report } />
              <Route exact path = '/movilidad/mes/:id' component = { GetWeeks } />
              <Route exact path = '/movilidad/mes/:id/semana/:id' component = { GetDays } />
              <Route exact path = '/movilidad/semana/:id/dia/:id' component = { MobilityReport } /> 
              <Route exact path = '/movilidad/semana/:id/nuevo/dia/:id' component = { CreateMobility } /> 
              <Route exact path = '/movilidad/editar/semana/:id/id/:id' component = { EditMobility } />
              <Route exact path = '/movilidad/grafica/semana/:id/departamento/:id/dia/:id/id/:id' component = { PanelDay } />
              <Route exact path = '/movilidad/grafica/semana/:id' component = { WeekDepartments } />
              <Route exact path = '/movilidad/grafica/semana/:id/departamento/:id' component = { PanelWeek } />
              <Route exact path = '/movilidad/grafica/mensual/:id' component = { MonthDepartments } />
              <Route exact path = '/movilidad/grafica/mensual/:id/departamento/:id' component = { PanelMonth } /> 
              <Route exact path = '/movilidad/nueva/semana/:id' component = { CreateWeek } />
              <Route exact path = '/movilidad/mes/:id/nuevo/dia/:id' component = { CreateDay } />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
