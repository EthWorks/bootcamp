import React, { useState } from 'react'
const employees = [
  { id: 1, firstName: 'Piotr', lastName: 'Szlachciak', censored: true },
  { id: 2, firstName: 'Piotr', lastName: 'Sadlik', censored: false },
  { id: 3, firstName: 'Oskar', lastName: 'Szelejewski', censored: true },
  { id: 4, firstName: 'Mikołaj', lastName: 'Jakubowski', censored: false },
]
export function Learning() {
  const [list, setList] = useState(employees)
  function reverse() {
    setList([...list].reverse())
  }
  return (
    <div>
      <h1>Employees</h1>
      <button onClick={reverse}>Reverse</button>
      <ul>
        {list.map((employee) =>
          employee.censored ? (
            <Redacted key={employee.id} />
          ) : (
            <Employee
              key={employee.id}
              firstName={employee.firstName}
              lastName={employee.lastName}
              censored={employee.censored}
            />
          )
        )}
      </ul>
    </div>
  )
}
interface EmployeeProps {
  firstName: string
  lastName: string
  censored: boolean
}
function Employee(props: EmployeeProps) {
  const [counter, setCounter] = useState(0)
  return (
    <li>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <p>{counter}</p>
      <p>{props.firstName}</p>
      <p>{props.lastName}</p>
    </li>
  )
}

function Redacted() {
  return <li>Redacted</li>
}
