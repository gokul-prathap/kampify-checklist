import { useState } from 'react'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'

import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const toast = useRef(null)

  const showToast = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: `Hello ${name || 'World'}!`,
      life: 3000
    })
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center gap-4">
        <h1>Checklist App</h1>
        
        <Card title="Welcome" className="w-full max-w-30rem">
          <div className="flex flex-column gap-3">
            <div className="flex flex-column gap-2">
              <label htmlFor="name">Your Name:</label>
              <InputText
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <Button
              label={`Count is ${count}`}
              icon="pi pi-plus"
              onClick={() => setCount((count) => count + 1)}
              className="p-button-raised"
            />
            
            <Button
              label="Say Hello"
              icon="pi pi-heart"
              onClick={showToast}
              className="p-button-success"
            />
          </div>
        </Card>
        
        <p className="text-500">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App