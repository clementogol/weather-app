import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import Weather from './Weather.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Weather />
    </StrictMode>
)
