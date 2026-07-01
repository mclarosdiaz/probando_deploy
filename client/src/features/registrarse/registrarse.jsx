import { Link } from 'react-router-dom'
import { useState } from 'react'

const Registrarse = () => {

    const [formData, setFormData] = useState({
        usuario: '',
        nombre: '', 
        apellido: '',
        email: '',
        password: '',
        confirmarPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(formData)
        
        //TODO fetch al backend

    }

    return (
        <div className="registro-page">

            <div className="registro-card">

                <h1>Crear cuenta</h1>
                <p className="registro-subtitle">
                    Registrate para gestionar tus turnos
                </p>

                <form 
                    className="registro-form"
                    onSubmit={handleSubmit}
                >
                    <div className="input-group">
                        <label>Usuario</label>

                         <input
                            type="text"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            placeholder="Tu usuario"
                            required
                        />
                    </div>
                    //TODO
                    
                </form>

            </div>

        </div>
    )
}