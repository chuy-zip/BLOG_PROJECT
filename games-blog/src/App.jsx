import { NavigationProvider } from '@hooks/useNavigate'
import { TokenProvider } from './hooks/useToken'
import Router from './router'

function App() {

  return (

    <TokenProvider>
      <NavigationProvider>
        <Router />
      </NavigationProvider>
    </TokenProvider>
    
  )
}

export default App
