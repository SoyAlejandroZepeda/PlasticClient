import gql from 'graphql-tag';

//Departments Mutations
export const CREATE_DEPARTMENT = gql`

    mutation createDepartment ($input: DepartmentInput){
        createDepartment(input: $input){
            departmentName
        }
    }

`;

export const UPDATE_DEPARTMENT = gql`

    mutation updateDepartment($input: DepartmentInput){
        updateDepartment(input: $input){
            departmentName
        }
    }

`;

export const DELETE_DEPARTMENT = gql`

    mutation deleteDepartment($id: ID!){
        deleteDepartment(id: $id)
    }
    
`;

//Positions Mutations
export const CREATE_POSITION = gql`

    mutation createPosition($input: PositionInput){
        createPosition(input: $input){
            positionName
            typeWorker
            costCenter
        }
    }

`;

export const UPDATE_POSITION = gql`

    mutation updatePosition($input: PositionInput){
        updatePosition(input: $input){
            positionName,
            typeWorker,
            costCenter
        }
    }

`;

export const DELETE_POSITION = gql`

    mutation deletePosition($id: ID!){
        deletePosition(id: $id)
    }

`;

//Employees Mutations
export const CREATE_EMPLOYEE = gql`

    mutation createEmployee($input: EmployeeInput){
        createEmployee(input: $input){
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
            register
        }
    }

`;

export const UPDATE_EMPLOYEE = gql`

    mutation updateEmployee($input: EmployeeInput){
        updateEmployee(input: $input){
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

export const DELETE_EMPLOYEE = gql`

    mutation deleteEmployee($id: ID!){
        deleteEmployee(id: $id)
    }

`;

//Squares Mutations
export const CREATE_SQUARE = gql`

    mutation createSquare($input: SquareInput){
        createSquare(input: $input){
            squareNumber
            department
            register
        }
    }

`;

export const UPDATE_SQUARE = gql`

    mutation updateSquare($input: SquareInput){
        updateSquare(input: $input){
            squareNumber
            department
        }
    }

`;

export const DELETE_SQUARE = gql`

    mutation deleteSquare($id: ID!){
        deleteSquare(id: $id)
    }

`;

//Machine Mutations
export const CREATE_MACHINE = gql`

    mutation createMachine($input: MachineInput){
        createMachine(input: $input){
            id
            machineNumber
            square
            register
            updated
        }
    }

`;

export const UPDATE_MACHINE = gql`

    mutation updateMachine($input: MachineInput){
        updateMachine(input: $input){
            id
            machineNumber
            square
            updated
        }
    }

`;

export const DELETE_MACHINE = gql`

    mutation deleteMachine($id: ID!){
        deleteMachine(id: $id)
    }

`;

//Product Mutation
export const CREATE_PRODUCT = gql`

    mutation createProduct($input: ProductInput){
        createProduct(input: $input){
            id
            productName
            partNumber
            machine
            register
            updated
        }
    }

`;

export const UPDATE_PRODUCT = gql`

    mutation updateProduct($input: ProductInput){
        updateProduct(input: $input){
            id
            productName
            partNumber
            machine,
            register
            updated
        }
    }

`;

export const DELETE_PRODUCT = gql`

    mutation deleteProduct($id: ID!){
        deleteProduct(id: $id)
    }

`;

//Mobility Mutations
export const CREATE_MOBILITY = gql`

    mutation createMobility($input: MobilityInput){
        createMobility(input: $input){
            id
            department
            week
            day
            squares{
                id
                squareNumber
            },
            machines{
                id
                machineNumber
            },
            operators{
                id
                name
                surnameP
                machine
            },
            products{
                id
                productName
            },
            indicators{
                indicator
            },
            observations{
                observation
            }
        }
    }

`;

export const UPDATE_MOBILITY = gql`

    mutation updateMobility($input: MobilityInput){
        updateMobility(input: $input){
            id
            department
            week
            day
            squares{
                id
            }
            machines{
                id
            }
            operators{
                id
            }
            products{
                id
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