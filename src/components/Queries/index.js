import gql from 'graphql-tag';

//Departments Queries
export const GET_DEPARTMENTS = gql`

    query getDepartments ($limit: Int, $offset: Int){
        getDepartments(limit: $limit, offset: $offset){
            id
            departmentName
        }
        totalDepartments
    }

`;

export const GET_DEPARTMENT = gql`

    query getDepartment($id: ID){
        getDepartment(id: $id){
            id
            departmentName
        }
    }

`;

//Positions Queries
export const GET_POSITIONS = gql`

    query getPositions($limit: Int, $offset: Int){
        getPositions(limit: $limit, offset: $offset){
            id,
            positionName,
            typeWorker,
            costCenter
        }
        totalPositions
    }

`;

export const GET_POSITION = gql`

    query getPosition($id: ID){
        getPosition(id: $id){
            id
            positionName
            typeWorker
            costCenter
        }
    }

`;

//Employees Queries
export const GET_EMPLOYEES = gql`

    query getEmployees($limit: Int, $offset: Int){
        getEmployees(limit: $limit, offset: $offset){
            id
            payroll
            name
            surnameP
            surnameM
            position
        }
        totalEmployees
    }

`;

export const GET_EMPLOYEE = gql`

    query getEmployee($id: ID){
        getEmployee(id: $id){
            id
            payroll
            name
            surnameP
            surnameM
            department
            position
            email
            password
            machine
            birthday
        }
    }

`;

//Departments Square Queries
export const GET_DEPARTMENTS_SQUARE = gql`

    query getDepartmentsSquare{
        getDepartmentsSquare{
            id
            departmentName
        }
    }

`;

//Squares From Department
export const GET_SQUARES = gql`

    query getSquares($department: String){
        getSquares(department: $department){
            id
            squareNumber
            register
            updated
        }
    }

`;

export const GET_ALL_SQUARES = gql`

    query getAllSquares{
        getAllSquares{
            id
            squareNumber
            department
        }
    }

`;

export const GET_SQUARE = gql`

    query getSquare($id: ID){
        getSquare(id: $id){
            id
            squareNumber
            department
            register
            updated
        }
    }

`;

//Machines from Square
export const GET_MACHINES = gql `

    query getMachines($square: String){
        getMachines(square: $square){
            id
            machineNumber
            register
            updated
        }
    }

`;

export const GET_MACHINE = gql`

    query getMachine($id: ID){
        getMachine(id: $id){
            id
            machineNumber
            square
        }
    }

`;

export const GET_ALL_MACHINES = gql`

    query getAllMachines{
        getAllMachines{
            id
            machineNumber
            square
            register
            updated
        }
    }

`;

//Products from Machine
export const GET_PRODUCTS = gql`

    query getProducts($machine: String){
        getProducts(machine: $machine){
            id
            productName
            partNumber
            machine
            register
            updated
        }
    }

`;

export const GET_PRODUCT = gql`

    query getProduct($id: ID){
        getProduct(id: $id){
            id
            productName
            partNumber
            machine
            register
            updated
        }
    }

`;

export const GET_ALL_PRODUCTS = gql`

    query getAllProducts{
        getAllProducts{
            id
            productName
            partNumber
            register
            updated
        }
    }

`;

//Operators Quieries
export const GET_ALL_OPERATORS = gql`

    query getAllOperators{
        getAllOperators{
            id
            payroll
            name
            surnameP
            surnameM
            machine
        }
    }

`;

//Years Queries
export const GET_ALL_YEARS = gql`

    query getAllYears{
        getAllYears{
            id
            year
        }
    }

`;

//Moths Queries
export const GET_MONTHS = gql`

    query getMonths($year: String){
        getMonths(year: $year){
            id
            month
            year
        }
    }

`;

export const GET_MONTH = gql`

    query getMonth($id: ID){
        getMonth(id: $id){
            id
            month
        }
    }

`;

//Weeks Queries
export const GET_WEEKS = gql`

    query getWeeks($month: String){
        getWeeks(month: $month){
            id
            week
            month
        }
    }

`;

export const GET_WEEK = gql`

    query getWeek($id: ID){
        getWeek(id: $id){
            id
            week
        }
    }

`;

//Days Queries
export const GET_DAYS = gql`

    query getDays($week: String){
        getDays(week: $week){
            id
            dayNumber
            dayName
            week
        }
    }

`;

export const GET_DAY = gql`

    query getDay($id: ID){
        getDay(id: $id){
            id
            dayNumber
            dayName
            week
        }
    }

`;

//Get Operators from department
export const GET_OPERATORS = gql`

    query getOperators($department: String){
        getOperators(department: $department){
            id
            name
            surnameP
            department
            machine
        }
    }

`;

//Get Mobilities from Day
export const GET_MOBILITIES = gql`

    query getMobilities($day: String){
        getMobilities(day: $day){
            id
            week
            day
            department
            register
        }
    }

`;

export const GET_MOBILITY = gql`

    query getMobility($id: ID){
        getMobility(id: $id){
            id
            week
            day
            department
            squares{
                id
                squareNumber
            }
            machines{
                id
                machineNumber
            }
            operators{
                id
                name
            }
            products{
                id
                productName
            }
            indicators{
                indicator
            }
            observations{
                observation
            }
        }
    }

`;

//Mobilities From Week
export const GET_MOBILITIES_WEEK = gql`

    query getMobilitiesWeek($day: [String], $department: String){
        getMobilitiesWeek(day: $day, department: $department){
            id
            week
            day
            department,
            squares{
                id
                squareNumber
            }
            machines{
                id
                machineNumber
            }
            operators{
                id
                name
            }
            products{
                id
                productName
            }
            indicators{
                indicator
            }
            observations{
                observation
            }
        }
    }

`;

//Mobilities From Month
export const GET_MOBILITIES_MONTH = gql`

    query getMobilitiesMonth($week: [String], $department: String){
        getMobilitiesMonth(week: $week, department: $department){
            id
            week
            day
            department
            squares{
                id
                squareNumber
            }
            machines{
                id
                machineNumber
            }
            operators{
                id
                name
            }
            products{
                id
                productName
            }
            indicators{
                indicator
            }
            observations{
                observation
            }
        }
    }

`;